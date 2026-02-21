import { Box, Paper, Typography, TextField, Button, Link, Grid } from '@mui/material';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema } from '../../lib/zodSchemas';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { UserPlus } from 'lucide-react';
import { Navbar } from '../../components/layout/Navbar';
import toast from 'react-hot-toast';
import { z } from 'zod';

type RegisterFormData = z.infer<typeof registerSchema>;

export const Register = () => {
  const { register: registerUser } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      await registerUser({
        name: data.name,
        email: data.email,
        password: data.password,
        phone: data.phone,
      });
      navigate('/dashboard');
    } catch {
      toast.error('Registration failed. Please try again.');
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
            <Paper
              component={motion.div}
              initial={{ x: -50, opacity: 0 }}
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
                Create Account
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 4, fontSize: '1rem' }}>
                Join thousands of students finding their dream internships
              </Typography>

              <form onSubmit={handleSubmit(onSubmit)}>
                <TextField
                  label="Full Name"
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  size="medium"
                  sx={{ mb: 2.5 }}
                  {...register('name')}
                  error={!!errors.name}
                  helperText={errors.name?.message}
                />

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
                  label="Phone (Optional)"
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  size="medium"
                  sx={{ mb: 2.5 }}
                  {...register('phone')}
                  error={!!errors.phone}
                  helperText={errors.phone?.message}
                />

                <TextField
                  label="Password"
                  type="password"
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  size="medium"
                  sx={{ mb: 2.5 }}
                  {...register('password')}
                  error={!!errors.password}
                  helperText={errors.password?.message}
                />

                <TextField
                  label="Confirm Password"
                  type="password"
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  size="medium"
                  sx={{ mb: 2 }}
                  {...register('confirmPassword')}
                  error={!!errors.confirmPassword}
                  helperText={errors.confirmPassword?.message}
                />

                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  size="large"
                  disabled={isSubmitting}
                  sx={{ mt: 3, py: 1.5 }}
                  component={motion.button}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isSubmitting ? 'Creating Account...' : 'Create Account'}
                </Button>

                <Typography variant="body2" textAlign="center" sx={{ mt: 3 }}>
                  Already have an account?{' '}
                  <Link href="/login" underline="hover" fontWeight={600}>
                    Sign in here
                  </Link>
                </Typography>
              </form>
            </Paper>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', p: { xs: 2, md: 4 } }}>
            <motion.div
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              style={{ width: '100%' }}
            >
              <Box
                sx={{
                  width: '100%',
                  height: 450,
                  borderRadius: 6,
                  background: 'linear-gradient(135deg, #00C853 0%, #4CAF50 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 20px 60px rgba(76, 175, 80, 0.3)',
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
                  <circle cx="100" cy="100" r="60" fill="rgba(255,255,255,0.1)" />
                  <circle cx="300" cy="300" r="80" fill="rgba(255,255,255,0.05)" />

                  <g transform="translate(200, 150)">
                    <circle cx="0" cy="0" r="28" fill="white" />
                    <path d="M -12 5 Q 0 15 12 5" stroke="#FF9933" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                    <circle cx="-8" cy="-5" r="3" fill="#FF9933" />
                    <circle cx="8" cy="-5" r="3" fill="#FF9933" />
                  </g>

                  <g transform="translate(200, 200)">
                    <rect x="-18" y="0" width="36" height="50" rx="8" fill="rgba(255,255,255,0.9)" />
                  </g>

                  <g transform="translate(200, 195)">
                    <path d="M -40 20 Q -60 -20 -50 -40" stroke="rgba(255,255,255,0.85)" strokeWidth="12" fill="none" strokeLinecap="round" />
                    <path d="M 40 20 Q 60 -20 50 -40" stroke="rgba(255,255,255,0.85)" strokeWidth="12" fill="none" strokeLinecap="round" />
                  </g>

                  <g transform="translate(200, 250)">
                    <rect x="-12" y="0" width="10" height="45" rx="5" fill="rgba(255,255,255,0.8)" />
                    <rect x="2" y="0" width="10" height="45" rx="5" fill="rgba(255,255,255,0.8)" />
                  </g>

                  <g transform="translate(100, 80)">
                    <path d="M 0 -8 L 2.5 0 L 10 0 L 3.75 5 L 6.25 13 L 0 8 L -6.25 13 L -3.75 5 L -10 0 L -2.5 0 Z" fill="#FFD700" />
                  </g>
                  
                  <g transform="translate(300, 100)">
                    <path d="M 0 -8 L 2.5 0 L 10 0 L 3.75 5 L 6.25 13 L 0 8 L -6.25 13 L -3.75 5 L -10 0 L -2.5 0 Z" fill="#FFD700" />
                  </g>
                </svg>
              </Box>
            </motion.div>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};
