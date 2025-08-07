import { useEffect, useState } from "react";
import {
    Box,
    Typography,
    IconButton,
    TextField,
    Collapse,
    Paper,
    Divider,
    TextareaAutosize,
} from "@mui/material";
import { FaArrowLeft, FaSave } from "react-icons/fa";
import { deleteTask, getTaskByUserId, updateTask } from "../api/todo";
import NewTaskForm from "./NewTaskForm";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import AddIcon from "@mui/icons-material/Add";
import TaskItem from "./TaskItem.jsx";

export default function TaskDetails({ taskId }) {
    const [task, setTask] = useState(null);
    const [unsavedTask, setUnsavedTask] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        async function load() {
            try {
                const data = await getTaskByUserId(taskId);
                setTask(data);
                setUnsavedTask(data);
            } catch (err) {
                toast.error(err.message, { position: "top-center" });
            }
        }
        load();
    }, [taskId]);

    const handleToggle = async (sub) => {
        sub.done = !sub.done;
        const updated = await updateTask(sub.id, sub);
        setUnsavedTask((prev) => ({
            ...prev,
            subtasks: prev.subtasks.map((s) => (s.id === sub.id ? updated : s)),
        }));
    };

    const handleDelete = async (sub) => {
        await deleteTask(sub.id);
        setUnsavedTask((prev) => ({
            ...prev,
            subtasks: prev.subtasks.filter((s) => s.id !== sub.id),
        }));
        toast.success("Task deleted", { position: "top-center" });
    };

    const handleFieldChange = (field, value) => {
        setUnsavedTask((prev) => ({ ...prev, [field]: value }));
    };

    const handleSave = async () => {
        setTask(unsavedTask);
        await updateTask(unsavedTask.id, unsavedTask);
        toast.success("Task saved", { position: "top-center" });
    };

    const hasChanges = () => JSON.stringify(unsavedTask.title) !== JSON.stringify(task.title) || JSON.stringify(unsavedTask.description) !== JSON.stringify(task.description);

    if (!unsavedTask) return <Typography align="center">Loading...</Typography>;

    return (
        <Box sx={{ minHeight: "100vh", }}>
            <Paper sx={{ p: 3, maxWidth: "700px", mx: "auto"}}>
                <Box display="flex" alignItems="center" gap={1} mb={2}>
                    <IconButton
                        sx={{ color: "#000000" }}
                        onClick={() => navigate(-1)}
                    >
                        <FaArrowLeft />
                    </IconButton>
                    <IconButton
                        sx={{ color: "#000000" }}
                        onClick={handleSave}
                        disabled={!hasChanges()}
                    >
                        <FaSave />
                    </IconButton>
                </Box>
                <Divider sx={{ mb: 2 }} />
                <TextField
                    label="Title"
                    value={unsavedTask.title}
                    onChange={(e) => handleFieldChange("title", e.target.value)}
                    fullWidth
                    variant="standard"
                    sx={{ mb: 2 }}
                />
                <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
                    Created at:{" "}
                    {new Date(unsavedTask.createdAt).toLocaleString()}
                </Typography>
                <Typography variant="body2" sx={{ mb: 2 }}>
                    Status:{" "}
                    <span style={{ color: unsavedTask.done ? "green" : "red" }}>
                    {unsavedTask.done ? "Done" : "Not done"}
                </span>
                </Typography>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Typography variant="h6" fontWeight="bold">Subtasks</Typography>
                    <IconButton
                        variant="contained"
                        onClick={() => setShowForm(!showForm)}
                        size="small"
                        sx={{
                            mb: 1,
                            borderRadius: 1,
                            color: "#fff",
                            backgroundColor: "#22c55e",
                            "&:hover": {
                                backgroundColor: "#16a34a",
                            },
                        }}
                    >
                        <AddIcon/>
                    </IconButton>
                </Box>
                <Collapse in={showForm} timeout="auto">
                    <NewTaskForm
                        userId={unsavedTask.userId}
                        parentId={unsavedTask.id}
                        onCreated={(subtask) =>
                            setUnsavedTask((prev) => ({
                                ...prev,
                                subtasks: [...prev.subtasks, subtask],
                            }))
                        }
                    />
                </Collapse>
                <Box mb={3}>
                    {unsavedTask.subtasks?.length > 0 ? (
                        unsavedTask.subtasks.map((sub) => (
                            <TaskItem
                                key={sub.id}
                                task={sub}
                                onToggle={handleToggle}
                                onDelete={handleDelete}
                            />
                        ))
                    ) : (
                        <Typography color="textSecondary">No subtasks</Typography>
                    )}
                </Box>
                <TextareaAutosize
                    minRows={3}
                    placeholder="Description"
                    value={unsavedTask.description}
                    onChange={(e) => handleFieldChange("description", e.target.value)}
                    style={{
                        width: '100%',
                        resize: 'none',
                        padding: '10px',
                        fontSize: '14px',
                        borderRadius: '4px',
                        border: '1px solid #ccc',
                        backgroundColor: '#f9f9f9',
                    }}
                />
            </Paper>
        </Box>

    );
}
