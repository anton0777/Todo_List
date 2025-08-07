import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { updateUser } from "../api/user";
import { toast } from "react-toastify";
import {
    Button,
    ButtonGroup,
    TextField,
    Box,
    Typography,
    Modal,
    Stack,
} from '@mui/material';

export default function SettingsModal({ onClose }) {
    const { logout, user, setUser } = useAuth();
    const [form, setForm] = useState({ name: '', password: '' });
    const [saving, setSaving] = useState(false);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleDisable = () => {
        return saving || (form.name === '' && form.password === '');
    };

    const handleSave = async () => {
        try {
            if (form.name === '') form.name = undefined;
            if (form.password === '') form.password = undefined;
            setSaving(true);
            const updated = await updateUser(user.id, form);
            setUser({ ...user, ...updated });
            onClose();
            toast.success("User was updated", {
                position: "top-center"
            });
        } catch (err) {
            toast.error(err.message, {
                position: "top-center"
            });
            console.error("Error:", err.message, err?.meta);
        } finally {
            setSaving(false);
        }
    };

    return (
        <Modal open={true} onClose={onClose}>
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    bgcolor: 'background.paper',
                    boxShadow: 24,
                    borderRadius: 2,
                    p: 4,
                    minWidth: 360,
                }}
            >
                <Typography
                    variant="h5"
                    fontWeight="bold"
                    mb={2}
                    textAlign="center"
                >
                    Settings
                </Typography>

                <Stack
                    spacing={2}
                >
                    <TextField
                        label="New name"
                        name="name"
                        type="text"
                        value={form.name}
                        onChange={handleChange}
                        fullWidth
                    />
                    <TextField
                        label="New password"
                        name="password"
                        type="password"
                        value={form.password}
                        onChange={handleChange}
                        fullWidth
                    />
                    <ButtonGroup
                        fullWidth
                        variant="contained"
                    >
                        <Button
                            disabled={handleDisable()}
                            sx={{
                                backgroundColor: '#22c55e',
                                '&:hover': {
                                    backgroundColor: '#16a34a',
                                },
                            }}
                            onClick={handleSave}
                        >
                            Save
                        </Button>
                        <Button
                            color="error"
                            onClick={logout}
                        >
                            Logout
                        </Button>
                        <Button
                            sx={{
                                backgroundColor: '#6a6a6a',
                                '&:hover': {
                                    backgroundColor: '#3f3f3f',
                                },
                            }}
                            onClick={onClose}
                        >
                            Close
                        </Button>
                    </ButtonGroup>
                </Stack>
            </Box>
        </Modal>
    );
}
