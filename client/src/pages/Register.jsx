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

export default function Register() {
  const { register } = useAuth();
  const [form, setForm] = useState({ email: '', password: '', name: '' });
  const [fieldErrors, setFieldErrors] = useState({
    email: '',
    password: '',
    name: '',
  });
  const [generalError, setGeneralError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });

    if (fieldErrors[e.target.name]) {
      setFieldErrors((prev) => ({ ...prev, [e.target.name]: '' }));
    }
    if (generalError) {
      setGeneralError('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFieldErrors({ email: '', password: '', name: '' });
    setGeneralError('');

    try {
      await register(form);
    } catch (err) {
      if (err.meta && err.meta.error) {
        if (Array.isArray(err.meta.error)) {
          err.meta.error.forEach((error) => {
            if (
              error.path &&
              error.path[0] &&
              Object.prototype.hasOwnProperty.call(fieldErrors, error.path[0])
            ) {
              setFieldErrors((prev) => ({
                ...prev,
                [error.path[0]]: error.message,
              }));
            } else {
              setGeneralError(error.message);
            }
          });
        } else if (typeof err.meta.error === 'object') {
          Object.keys(err.meta.error).forEach((key) => {
            if (Object.prototype.hasOwnProperty.call(fieldErrors, key)) {
              setFieldErrors((prev) => ({
                ...prev,
                [key]: err.meta.error[key],
              }));
            } else {
              setGeneralError(err.meta.error[key]);
            }
          });
        }
      } else {
        setGeneralError(err.message || 'Registration failed');
      }
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
            Sign up
          </Typography>
          <Paper component="form" onSubmit={handleSubmit}>
            <TextField
              label="Name (optional)"
              name="name"
              type="text"
              value={form.name}
              onChange={handleChange}
              fullWidth
              margin="dense"
              error={fieldErrors.name}
              helperText={fieldErrors.name}
            />
            <TextField
              label="Email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              fullWidth
              margin="dense"
              required
              error={fieldErrors.email}
              helperText={fieldErrors.email}
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
              error={fieldErrors.password}
              helperText={fieldErrors.password}
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
                height: '38px',
              }}
            >
              Sign up
            </Button>
          </Paper>

          <Typography variant="body2" mt={3} color="text.secondary">
            Already have an account?{' '}
            <Link to="/login" style={{ color: '#22c55e' }}>
              Log in
            </Link>
          </Typography>
        </Paper>
      </Box>
    </Container>
  );
}
