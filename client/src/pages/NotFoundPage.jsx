import { Link } from 'react-router-dom';
import { Box, Button, Typography } from '@mui/material';

const NotFoundPage = () => {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(to right, #8dc26f, #76b852, #8dc26f)',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography variant="h2" sx={{ fontWeight: 'bold', mb: 2 }}>
          404 Not Found
        </Typography>
        <Typography variant="h6" sx={{ mb: 3 }}>
          This page does not exist
        </Typography>
        <Button
          component={Link}
          to="/"
          variant="contained"
          sx={{
            backgroundColor: '#2f855a',
            '&:hover': { backgroundColor: '#22543d' },
            px: 3,
            py: 1.5,
          }}
        >
          Go Back
        </Button>
      </Box>
    </Box>
  );
};

export default NotFoundPage;
