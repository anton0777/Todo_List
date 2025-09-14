import { useState } from 'react';
import { createTask } from '../api/todo';
import { toast } from 'react-toastify';
import { Button, CircularProgress, TextField, Paper } from '@mui/material';

export default function NewTaskForm({
  userId,
  parentId = undefined,
  onCreated,
}) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const newTask = await createTask({
        title,
        description,
        userId,
        parentId,
      });
      onCreated(newTask);
      setTitle('');
      setDescription('');
      toast.success('Task created', { position: 'top-center' });
    } catch (err) {
      console.error('Error:', err.message, err.meta);
      toast.error(err.message, { position: 'top-center' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper
      component="form"
      onSubmit={handleSubmit}
      sx={{
        p: 2,
        mb: 2,
      }}
    >
      <TextField
        label="Task title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        fullWidth
        size="small"
        required
        autoComplete="off"
        sx={{ mb: 2 }}
      />
      <TextField
        label="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        multiline
        rows={2}
        fullWidth
        size="small"
        sx={{ mb: 2 }}
      />
      <Button
        type="submit"
        fullWidth
        variant="contained"
        disabled={loading || !title.trim()}
        sx={{
          backgroundColor: '#22c55e',
          '&:hover': { backgroundColor: '#16a34a' },
        }}
      >
        {loading ? <CircularProgress size={20} color="inherit" /> : 'Save'}
      </Button>
    </Paper>
  );
}
