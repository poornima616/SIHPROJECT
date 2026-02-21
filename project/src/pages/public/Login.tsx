import { Box, Paper, Typography, TextField, Button, Link, Grid } from '@mui/material';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema } from '../../lib/zodSchemas';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { LogIn } from 'lucide-react';
import { Navbar } from '../../components/layout/Navbar';
import toast from 'react-hot-toast';
import { z } from 'zod';

type LoginFormData = z.infer<typeof loginSchema>;

export const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      await login(data);
      navigate('/dashboard');
    } catch {
      toast.error('Login failed. Please check your credentials.');
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: (theme) =>
            theme.palette.mode === 'light'
              ? 'linear-gradient(135deg, #F8FAFC 0%, #E2E8F0 100%)'
              : 'linear-gradient(135deg, #0A0F1C 0%, #1E293B 100%)',
          py: 8,
          px: 2,
        }}
      >
        <Grid container maxWidth="lg" sx={{ mx: 'auto', gap: { xs: 4, md: 0 } }}>
          <Grid size={{ xs: 12, md: 6 }} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', p: { xs: 2, md: 4 } }}>
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              style={{ width: '100%' }}
            >
              <Box
                sx={{
                  width: '100%',
                  height: 450,
                  borderRadius: 6,
                  background: 'linear-gradient(135deg, #0052CC 0%, #2196F3 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 20px 60px rgba(0, 82, 204, 0.3)',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                <svg
                  viewBox="0 0 400 400"
                  width="100%"
                  height="100%"
                  xmlns="http://www.w3.org/2000/svg"
                  style={{ position: 'absolute' }}
                >
                  <circle cx="80" cy="80" r="60" fill="rgba(255,255,255,0.1)" />
                  <circle cx="320" cy="320" r="80" fill="rgba(255,255,255,0.05)" />
                  
                  <g transform="translate(200, 200)">
                    <circle cx="0" cy="-50" r="25" fill="white" />
                    <rect x="-20" y="-20" width="40" height="60" rx="8" fill="rgba(255,255,255,0.9)" />
                    <rect x="-60" y="-10" width="40" height="12" rx="6" fill="rgba(255,255,255,0.8)" />
                    <rect x="20" y="-10" width="40" height="12" rx="6" fill="rgba(255,255,255,0.8)" />
                    <rect x="-12" y="40" width="10" height="40" rx="5" fill="rgba(255,255,255,0.7)" />
                    <rect x="2" y="40" width="10" height="40" rx="5" fill="rgba(255,255,255,0.7)" />
                    <rect x="-10" y="0" width="20" height="25" rx="2" fill="#FF9933" />
                    <circle cx="0" cy="5" r="4" fill="rgba(255,255,255,0.9)" />
                  </g>

                  <g transform="translate(100, 100)">
                    <circle r="20" fill="rgba(255,255,255,0.1)" />
                    <path d="M -8 0 L 0 8 L 12 -8" stroke="#4CAF50" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                  </g>
                </svg>
              </Box>
            </motion.div>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', p: { xs: 2, md: 4 } }}>
            <Paper
              component={motion.div}
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              sx={{
                p: { xs: 3, sm: 4, md: 5 },
                width: '100%',
                maxWidth: 500,
                background: (theme) =>
                  theme.palette.mode === 'light'
                    ? 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(250,250,250,0.95) 100%)'
                    : 'linear-gradient(135deg, rgba(30,30,30,0.95) 0%, rgba(20,20,20,0.95) 100%)',
                backdropFilter: 'blur(10px)',
                border: '1px solid',
                borderColor: 'divider',
                boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1)',
              }}
            >
              <Typography variant="h4" fontWeight={700} gutterBottom sx={{ fontSize: '1.8rem' }}>
                Welcome Back
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 4, fontSize: '1rem' }}>
                Sign in to your account to continue
              </Typography>

              <form onSubmit={handleSubmit(onSubmit)}>
                <TextField
                  label="Email"
                  type="email"
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  size="medium"
                  sx={{ mb: 2.5 }}
                  {...register('email')}
                  error={!!errors.email}
                  helperText={errors.email?.message}
                />

                <TextField
                  label="Password"
                  type="password"
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  size="medium"
                  sx={{ mb: 2 }}
                  {...register('password')}
                  error={!!errors.password}
                  helperText={errors.password?.message}
                />

                <Box sx={{ textAlign: 'right', mt: 1, mb: 3 }}>
                  <Link href="/forgot-password" underline="hover" sx={{ fontSize: '0.875rem' }}>
                    Forgot Password?
                  </Link>
                </Box>

                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  size="large"
                  disabled={isSubmitting}
                  component={motion.button}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isSubmitting ? 'Signing In...' : 'Sign In'}
                </Button>

                <Typography variant="body2" textAlign="center" sx={{ mt: 3 }}>
                  Don't have an account?{' '}
                  <Link href="/register" underline="hover" fontWeight={600}>
                    Register here
                  </Link>
                </Typography>
              </form>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};
