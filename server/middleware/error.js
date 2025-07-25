import { ZodError } from "zod";

const errorHandler = (err, req, res, next) => {
    if (err instanceof ZodError) {
        return res.status(400).json({
            message: "Validation failed",
            meta: {
                name: err.constructor.name,
                error: err.issues
            },
        });
    }

    if (err?.constructor?.name.startsWith("Prisma")){
        return res.status(400).json({
            message: "Database error occurred",
            meta: {
                name: err.constructor.name,
                code: err.code,
                error: err.message.replace(/\n/g, ""),
            },
        });
    }

    return res.status(500).json({
        message: "Something went wrong. Please try again later",
        meta: {
            error: err.message.replace(/\n/g, "") || "Unknown error",
            stack: err.stack.replace(/\n/g, ""),
        },
    });
};

export default errorHandler;