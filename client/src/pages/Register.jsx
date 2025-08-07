import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import {
    Button,
    TextField,
    Container,
    Box,
    Typography,
    Paper
} from "@mui/material";

export default function Register() {
    const { register } = useAuth();
    const [form, setForm] = useState({ email: "", password: "", name: "" });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        register(form);
    };

    return (
        <Container maxWidth="xs">
            <Box sx={{ pt: "15%" }}>
                <Paper
                    elevation={6}
                    sx={{
                        p: 4,
                        textAlign: "center",
                    }}
                >
                    <Typography
                        variant="h5"
                        fontWeight="bold"
                        mb={2}
                    >
                        Sign up
                    </Typography>
                    <Paper component="form" onSubmit={handleSubmit}>
                        <TextField
                            label="Name (optional)"
                            name="name"
                            type="text"
                            value={form.name}
                            onChange={handleChange}
                            fullWidth
                            margin="dense"
                        />
                        <TextField
                            label="Email"
                            name="email"
                            type="email"
                            value={form.email}
                            onChange={handleChange}
                            fullWidth
                            margin="dense"
                            required
                        />
                        <TextField
                            label="Password"
                            name="password"
                            type="password"
                            value={form.password}
                            onChange={handleChange}
                            fullWidth
                            margin="dense"
                            required
                        />
                        <Button
                            variant="contained"
                            type="submit"
                            fullWidth
                            sx={{
                                backgroundColor: "#22c55e",
                                "&:hover": {
                                    backgroundColor: "#16a34a"
                                },
                                mt: 2,
                                height: "38px"
                            }}
                        >
                            Sign up
                        </Button>
                    </Paper>

                    <Typography
                        variant="body2"
                        mt={3}
                        color="text.secondary"
                    >
                        Already have an account?{" "}
                        <Link to="/login" style={{ color: "#22c55e" }}>
                            Log in
                        </Link>
                    </Typography>
                </Paper>
            </Box>
        </Container>
    );
}
