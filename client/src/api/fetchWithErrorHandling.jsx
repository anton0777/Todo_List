export async function fetchWithErrorHandling(url, options = {}) {
    const headers = {
        "Content-Type": "application/json",
        ...options.headers,
    };

    const token = localStorage.getItem("token");
    if (token && !headers.Authorization) {
        headers.Authorization = `Bearer ${token}`;
    }

    const res = await fetch(url, {
        ...options,
        headers,
    });

    if (!res.ok) {
        let message = "Request failed";
        let meta = {};

        try {
            const errJson = await res.json();
            message = errJson.message || message;
            meta = errJson.meta || {};
        } catch {
            const raw = await res.text();
            meta = { raw };
        }

        const err = new Error(message);
        err.meta = meta;
        err.status = res.status;
        throw err;
    }

    try {
        return await res.json();
    } catch {
        return null;
    }
}
