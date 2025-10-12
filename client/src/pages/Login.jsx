import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import {
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import { toast } from 'react-toastify';

export default function Login() {
  const { login } = useAuth();
  const [form, setForm] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await login(form);
    } catch (err) {
      toast.error(err.message, { position: 'top-center' });
    }
  };

  return (
    <Container maxWidth="xs">
      <Box sx={{ pt: '15%' }}>
        <Paper
          elevation={6}
          sx={{
            p: 4,
            textAlign: 'center',
          }}
        >
          <Typography variant="h5" fontWeight="bold" mb={2}>
            Login
          </Typography>
          <Paper component="form" onSubmit={handleSubmit}>
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
                backgroundColor: '#22c55e',
                '&:hover': {
                  backgroundColor: '#16a34a',
                },
                mt: 2,
              }}
            >
              Login
            </Button>
          </Paper>

          <Typography variant="body2" mt={3} color="text.secondary">
            Don’t have an account?{' '}
            <Link to="/register" style={{ color: '#22c55e' }}>
              Register here
            </Link>
          </Typography>
        </Paper>
      </Box>
    </Container>
  );
}
