import Header from '../components/Header';
import TaskList from '../components/TaskList';
import { Box } from '@mui/material';

export default function Dashboard() {
  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#f3f4f6' }}>
      <Header />
      <TaskList />
    </Box>
  );
}
