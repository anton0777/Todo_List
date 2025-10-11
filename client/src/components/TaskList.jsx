import { useEffect, useState } from 'react';
import TaskItem from './TaskItem';
import { fetchTasks, updateTask, deleteTask } from '../api/todo';
import NewTaskForm from './NewTaskForm';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
import { Box, Collapse, Container, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

export default function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    fetchTasks()
      .then(setTasks)
      .catch((err) => {
        toast.error(err.message, { position: 'top-center' });
      });
  }, []);

  const handleToggle = async (task) => {
    try {
      task.done = !task.done;
      const updated = await updateTask(task.id, task);
      setTasks((prev) => prev.map((t) => (t.id === task.id ? updated : t)));
    } catch (err) {
      toast.error(err.message, { position: 'top-center' });
    }
  };

  const handleDelete = async (task) => {
    try {
      await deleteTask(task.id);
      setTasks((prev) => prev.filter((t) => t.id !== task.id));
      toast.success('Task deleted', { position: 'top-center' });
    } catch (err) {
      toast.error(err.message, { position: 'top-center' });
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Box display="flex" justifyContent="right" alignItems="center" mb={2}>
        <IconButton
          variant="contained"
          onClick={() => setShowForm(!showForm)}
          sx={{
            borderRadius: 1,
            color: '#fff',
            backgroundColor: '#22c55e',
            '&:hover': {
              backgroundColor: '#16a34a',
            },
          }}
        >
          <AddIcon />
        </IconButton>
      </Box>

      <Collapse in={showForm} timeout="auto">
        <NewTaskForm
          userId={user.id}
          parentId={user.parentId}
          onCreated={(newTask) => setTasks((prev) => [...prev, newTask])}
        />
      </Collapse>
      <Box>
        {tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onToggle={handleToggle}
            onDelete={handleDelete}
          />
        ))}
      </Box>
    </Container>
  );
}
