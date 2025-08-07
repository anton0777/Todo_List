import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import SettingsModal from "./SettingsModal";
import { FaGear } from "react-icons/fa6";
import {
    AppBar,
    Box,
    Toolbar,
    Typography,
    IconButton,
} from "@mui/material";

export default function Header() {
    const { user } = useAuth();
    const [open, setOpen] = useState(false);

    return (
        <>
            <AppBar
                position="static"
                color="default"
                elevation={1}
            >
                <Toolbar className="justify-between">
                    <Typography variant="h6" fontWeight="bold">
                        Todo List
                    </Typography>

                    <Box
                        display="flex"
                        alignItems="center"
                        gap={1}
                    >
                        <Typography variant="body1" color="textSecondary">
                            {user?.name}
                        </Typography>
                        <IconButton
                            size="small"
                            onClick={() => setOpen(true)}
                            sx={{
                                width: 40,
                                height: 40,
                                backgroundColor: "#f3f4f6",
                                "&:hover": {
                                    backgroundColor: "#e5e7eb",
                                },
                            }}
                        >
                            <FaGear />
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>

            {open && <SettingsModal onClose={() => setOpen(false)} />}
        </>
    );
}
