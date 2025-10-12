import { useNavigate } from 'react-router-dom';
import { FaTrash } from 'react-icons/fa';
import { Box, Checkbox, IconButton, Paper, Typography } from '@mui/material';

export default function TaskItem({ task, onToggle, onDelete }) {
  const navigate = useNavigate();

  return (
    <Paper
      elevation={2}
      onClick={() => navigate(`/task/${task.id}`)}
      sx={{
        cursor: 'pointer',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 0.5,
        mt: 2,
        '&:hover': {
          boxShadow: 4,
        },
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Checkbox
          checked={task.done}
          onClick={(e) => e.stopPropagation()}
          onChange={() => onToggle(task)}
          color="success"
        />
        <Box>
          <Typography
            variant="body1"
            sx={{
              textDecoration: task.done ? 'line-through' : 'none',
            }}
          >
            {task.title}
          </Typography>
        </Box>
      </Box>
      <IconButton
        size="small"
        onClick={(e) => {
          e.stopPropagation();
          onDelete(task);
        }}
        sx={{
          width: 40,
          height: 40,
          '&:hover': {
            color: '#c61818',
          },
        }}
      >
        <FaTrash />
      </IconButton>
    </Paper>
  );
}
