import { Box, Typography, Button, Container, Grid, Card, CardContent, Stack, Paper } from '@mui/material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Briefcase, Target, TrendingUp, Award, Users, Building2 } from 'lucide-react';
import { Navbar } from '../../components/layout/Navbar';
import { Footer } from '../../components/layout/Footer';
import { formatNumber } from '../../utils/formatters';

const stats = [
  { label: 'Active Internships', value: '1000000', icon: Briefcase },
  { label: 'Registered Students', value: '500000', icon: Users },
  { label: 'Partner Companies', value: '50000', icon: Building2 },
  { label: 'Success Rate', value: '85', suffix: '%', icon: TrendingUp },
];

const features = [
  {
    icon: Target,
    title: 'AI-Powered Matching',
    description: 'Get personalized job recommendations based on your skills and preferences using advanced AI algorithms.',
  },
  {
    icon: Award,
    title: 'PM Scheme Benefits',
    description: 'Access exclusive internships under the Pradhan Mantri Internship Scheme with guaranteed stipends.',
  },
  {
    icon: TrendingUp,
    title: 'Career Growth',
    description: 'Build your career with mentorship, skill development, and opportunities from top companies.',
  },
];

export const Landing = () => {
  const navigate = useNavigate();

  return (
    <Box>
      <Navbar />

      <Box
        component={motion.div}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        sx={{
          background: (theme) =>
            theme.palette.mode === 'light'
              ? 'linear-gradient(135deg, #F8FAFC 0%, #E2E8F0 100%)'
              : 'linear-gradient(135deg, #0A0F1C 0%, #1E293B 100%)',
          py: 10,
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6}>
              <motion.div
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <Typography
                  variant="h2"
                  gutterBottom
                  sx={{
                    fontWeight: 800,
                    background: 'linear-gradient(90deg, #0052CC 0%, #FF9933 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  Find Your Perfect Internship
                </Typography>
                <Typography variant="h5" color="text.secondary" paragraph>
                  Join India's largest internship platform under the Pradhan Mantri Internship Scheme
                </Typography>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mt: 4 }}>
                  <Button
                    variant="contained"
                    size="large"
                    onClick={() => navigate('/register')}
                    component={motion.button}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Get Started
                  </Button>
                  <Button
                    variant="outlined"
                    size="large"
                    onClick={() => navigate('/jobs')}
                    component={motion.button}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Browse Jobs
                  </Button>
                </Stack>
              </motion.div>
            </Grid>
            <Grid item xs={12} md={6}>
              <motion.div
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <Box
                  sx={{
                    width: '100%',
                    height: 400,
                    borderRadius: 4,
                    background: 'linear-gradient(135deg, #0052CC 0%, #2196F3 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Briefcase size={120} color="white" />
                </Box>
              </motion.div>
            </Grid>
          </Grid>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Grid container spacing={3}>
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Grid size={{ xs: 12, sm: 6, md: 3 }} key={index}>
                <Card
                  component={motion.div}
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.1 * index }}
                  whileHover={{ y: -8 }}
                >
                  <CardContent sx={{ textAlign: 'center', py: 4 }}>
                    <Icon size={40} style={{ marginBottom: 16, color: '#0052CC' }} />
                    <Typography variant="h4" fontWeight={700} color="primary">
                      {formatNumber(Number(stat.value))}{stat.suffix || ''}
                    </Typography>
                    <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
                      {stat.label}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>

        <Box sx={{ mt: 10 }}>
          <Typography
            variant="h3"
            textAlign="center"
            fontWeight={700}
            gutterBottom
            component={motion.div}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Why Choose Us?
          </Typography>
          <Typography
            variant="h6"
            textAlign="center"
            color="text.secondary"
            sx={{ mb: 6 }}
            component={motion.div}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Empowering students with the best internship opportunities
          </Typography>

          <Grid container spacing={4}>
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Grid size={{ xs: 12, md: 4 }} key={index}>
                  <Paper
                    component={motion.div}
                    initial={{ y: 50, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 * index }}
                    sx={{ p: 4, height: '100%', textAlign: 'center' }}
                  >
                    <Box
                      sx={{
                        width: 80,
                        height: 80,
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, #0052CC 0%, #2196F3 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 24px',
                      }}
                    >
                      <Icon size={40} color="white" />
                    </Box>
                    <Typography variant="h5" fontWeight={600} gutterBottom>
                      {feature.title}
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      {feature.description}
                    </Typography>
                  </Paper>
                </Grid>
              );
            })}
          </Grid>
        </Box>

        <Box
          component={motion.div}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          sx={{
            mt: 10,
            p: 6,
            borderRadius: 4,
            background: 'linear-gradient(135deg, #0052CC 0%, #2196F3 100%)',
            textAlign: 'center',
            color: 'white',
          }}
        >
          <Typography variant="h3" fontWeight={700} gutterBottom>
            Ready to Start Your Journey?
          </Typography>
          <Typography variant="h6" sx={{ mb: 4, opacity: 0.9 }}>
            Join thousands of students finding their dream internships
          </Typography>
          <Button
            variant="contained"
            size="large"
            onClick={() => navigate('/register')}
            sx={{
              bgcolor: 'white',
              color: 'primary.main',
              '&:hover': { bgcolor: 'grey.100' },
            }}
            component={motion.button}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Register Now
          </Button>
        </Box>
      </Container>

      <Footer />
    </Box>
  );
};
