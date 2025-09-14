import { useParams } from 'react-router-dom';
import TaskDetails from '../components/TaskDetails';
import { Box } from '@mui/material';

export default function TaskPage() {
  const { id } = useParams();
  return (
    <Box sx={{ bgcolor: '#f3f4f6', padding: 4 }}>
      <TaskDetails taskId={id} />
    </Box>
  );
}
