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
                    fontSize: { xs: '2.5rem', md: '3.5rem' },
                    background: 'linear-gradient(90deg, #0052CC 0%, #FF9933 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    mb: 2,
                  }}
                >
                  Find Your Perfect Internship
                </Typography>
                <Typography variant="h5" color="text.secondary" paragraph sx={{ fontSize: '1.2rem', lineHeight: 1.8, mb: 3 }}>
                  Join India's largest internship platform under the Pradhan Mantri Internship Scheme and kickstart your career with top companies
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
                    height: 500,
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
                    {/* Background circles */}
                    <circle cx="100" cy="100" r="80" fill="rgba(255,255,255,0.1)" />
                    <circle cx="300" cy="300" r="100" fill="rgba(255,255,255,0.05)" />

                    {/* Briefcase */}
                    <g transform="translate(200, 180)">
                      <rect x="-60" y="-20" width="120" height="90" rx="8" fill="white" />
                      <rect x="-70" y="-30" width="140" height="15" rx="5" fill="rgba(255,255,255,0.8)" />
                      <circle cx="-30" cy="-30" r="6" fill="#FF9933" />
                      <circle cx="30" cy="-30" r="6" fill="#FF9933" />
                      {/* Handle */}
                      <path
                        d="M -40 -30 Q -40 -60 0 -70 Q 40 -60 40 -30"
                        stroke="white"
                        strokeWidth="8"
                        fill="none"
                        strokeLinecap="round"
                      />
                    </g>

                    {/* Documents/Papers */}
                    <g transform="translate(120, 250)">
                      <rect x="0" y="0" width="40" height="50" rx="2" fill="rgba(255,255,255,0.6)" />
                      <line x1="5" y1="10" x2="35" y2="10" stroke="#FF9933" strokeWidth="2" />
                      <line x1="5" y1="18" x2="35" y2="18" stroke="#FF9933" strokeWidth="2" />
                      <line x1="5" y1="26" x2="30" y2="26" stroke="#FF9933" strokeWidth="2" />
                    </g>

                    {/* Cheque/Certificate */}
                    <g transform="translate(280, 260)">
                      <rect x="0" y="0" width="50" height="35" rx="3" fill="rgba(255,255,255,0.7)" />
                      <circle cx="10" cy="10" r="5" fill="#FF9933" />
                      <line x1="15" y1="10" x2="45" y2="10" stroke="#FF9933" strokeWidth="1.5" />
                      <line x1="15" y1="16" x2="45" y2="16" stroke="#FF9933" strokeWidth="1.5" />
                      <line x1="15" y1="25" x2="45" y2="25" stroke="#FF9933" strokeWidth="1.5" />
                    </g>

                    {/* Trending arrow */}
                    <g transform="translate(200, 100)">
                      <line x1="0" y1="20" x2="0" y2="0" stroke="rgba(255,255,255,0.8)" strokeWidth="3" strokeLinecap="round" />
                      <path
                        d="M -8 8 L 0 0 L 8 8"
                        stroke="rgba(255,255,255,0.8)"
                        strokeWidth="3"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </g>
                  </svg>
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
