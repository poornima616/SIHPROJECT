import { Box, Grid, Card, CardContent, Typography, Stack, Chip, Button, Divider } from '@mui/material';
import { motion } from 'framer-motion';
import { PageLayout } from '../../components/layout/PageLayout';
import { ProfileCompleteness } from '../../components/common/ProfileCompleteness';
import { DashboardSkeleton } from '../../components/common/LoadingSkeleton';
import { MatchScoreBadge } from '../../components/ui/MatchScoreBadge';
import { useApi } from '../../hooks/useApi';
import { DashboardStats, Recommendation } from '../../types';
import { Briefcase, FileText, Star, CheckCircle, TrendingUp, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const Dashboard = () => {
  const navigate = useNavigate();

  const { data: stats, isLoading: statsLoading } = useApi<DashboardStats>(
    ['dashboard-stats'],
    '/api/profile/completeness'
  );

  const { data: recommendations, isLoading: recsLoading } = useApi<Recommendation[]>(
    ['recommendations-preview'],
    '/api/recommendations/simple'
  );

  if (statsLoading || recsLoading) {
    return (
      <PageLayout>
        <DashboardSkeleton />
      </PageLayout>
    );
  }

  const statsData = [
    {
      label: 'Profile Completeness',
      value: `${stats?.profileCompleteness || 0}%`,
      icon: CheckCircle,
      color: '#00C853',
    },
    {
      label: 'Total Applications',
      value: stats?.totalApplications || 0,
      icon: FileText,
      color: '#0052CC',
    },
    {
      label: 'Recommendations',
      value: stats?.recommendationsCount || 0,
      icon: Star,
      color: '#FF9933',
    },
    {
      label: 'Pending Reviews',
      value: stats?.pendingApplications || 0,
      icon: Briefcase,
      color: '#2196F3',
    },
  ];

  return (
    <PageLayout>
      {/* Header Section */}
      <Box sx={{ mb: 5 }}>
        <Typography 
          variant="h3" 
          fontWeight={800} 
          gutterBottom
          sx={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Dashboard
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ fontSize: '1.05rem' }}>
          Welcome back! Track your internship journey with real-time stats
        </Typography>
      </Box>

      {/* Stats Cards Row */}
      <Grid container spacing={2.5} sx={{ mb: 4 }}>
        {statsData.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Grid size={{ xs: 12, sm: 6, md: 3 }} key={index}>
              <Card
                component={motion.div}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 * index }}
                whileHover={{ y: -6, boxShadow: 3 }}
                sx={{
                  height: '100%',
                  border: '1px solid',
                  borderColor: 'divider',
                  background: (theme) =>
                    theme.palette.mode === 'light'
                      ? 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(250,250,250,0.9) 100%)'
                      : 'linear-gradient(135deg, rgba(30,30,30,0.9) 0%, rgba(20,20,20,0.9) 100%)',
                  backdropFilter: 'blur(10px)',
                  transition: 'all 0.3s ease',
                }}
              >
                <CardContent sx={{ height: '100%' }}>
                  <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, height: '100%' }}>
                    <Box
                      sx={{
                        p: 2,
                        borderRadius: 2.5,
                        bgcolor: `${stat.color}15`,
                        border: `2px solid ${stat.color}30`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        minWidth: 56,
                        minHeight: 56,
                        flexShrink: 0,
                      }}
                    >
                      <Icon size={28} color={stat.color} strokeWidth={1.5} />
                    </Box>
                    <Box sx={{ flex: 1 }}>
                      <Typography 
                        variant="h4" 
                        fontWeight={700}
                        sx={{
                          color: stat.color,
                          mb: 0.5,
                          fontSize: '2rem',
                        }}
                      >
                        {stat.value}
                      </Typography>
                      <Typography 
                        variant="body2" 
                        color="text.secondary"
                        sx={{
                          fontWeight: 500,
                          fontSize: '0.9rem',
                        }}
                      >
                        {stat.label}
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>

      {/* Main Content: Profile & Recommendations */}
      <Grid container spacing={3}>
        {/* Profile Completeness - Left Column */}
        <Grid size={{ xs: 12, md: 4 }}>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <ProfileCompleteness percentage={stats?.profileCompleteness || 0} />
          </motion.div>
        </Grid>

        {/* Top Recommendations - Middle & Right Column */}
        <Grid size={{ xs: 12, md: 8 }}>
          <Card
            component={motion.div}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            sx={{
              height: '100%',
              background: (theme) =>
                theme.palette.mode === 'light'
                  ? 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(250,250,250,0.9) 100%)'
                  : 'linear-gradient(135deg, rgba(30,30,30,0.9) 0%, rgba(20,20,20,0.9) 100%)',
              backdropFilter: 'blur(10px)',
              border: '1px solid',
              borderColor: 'divider',
              boxShadow: 'none',
            }}
          >
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                <Star size={24} color="#FF9933" fill="#FF9933" />
                <Typography 
                  variant="h6" 
                  fontWeight={700}
                  sx={{ fontSize: '1.1rem' }}
                >
                  Top Recommendations For You
                </Typography>
              </Box>

              {recommendations && recommendations.length > 0 ? (
                <Stack spacing={2}>
                  {recommendations.slice(0, 3).map((rec, idx) => (
                    <motion.div
                      key={rec.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 + idx * 0.1 }}
                    >
                      <Card
                        variant="outlined"
                        onClick={() => navigate(`/jobs/${rec.jobId}`)}
                        sx={{
                          cursor: 'pointer',
                          border: '1px solid',
                          borderColor: 'divider',
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            boxShadow: 2,
                            borderColor: 'primary.main',
                            transform: 'translateX(4px)',
                            bgcolor: (theme) =>
                              theme.palette.mode === 'light'
                                ? 'rgba(0, 82, 204, 0.02)'
                                : 'rgba(100, 200, 255, 0.05)',
                          },
                        }}
                      >
                        <CardContent sx={{ py: 2, '&:last-child': { pb: 2 } }}>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 2 }}>
                            {/* Job Info */}
                            <Box sx={{ flex: 1, minWidth: 0 }}>
                              <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1, mb: 0.5 }}>
                                <Typography 
                                  variant="subtitle1" 
                                  fontWeight={700}
                                  sx={{
                                    truncate: true,
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                  }}
                                >
                                  {rec.job.title}
                                </Typography>
                              </Box>

                              <Typography 
                                variant="body2" 
                                color="text.secondary"
                                sx={{ mb: 1.5, fontSize: '0.9rem' }}
                              >
                                <strong>{rec.job.company}</strong> • {rec.job.location}
                              </Typography>

                              {/* Chips */}
                              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                                <Chip 
                                  label={rec.job.workMode} 
                                  size="small"
                                  variant="outlined"
                                  sx={{ height: 24 }}
                                />
                                <Chip 
                                  label={rec.job.domain} 
                                  size="small"
                                  color="primary"
                                  variant="filled"
                                  sx={{ height: 24 }}
                                />
                                {rec.job.isPMScheme && (
                                  <Chip 
                                    label="PM Scheme" 
                                    size="small"
                                    color="success"
                                    variant="outlined"
                                    sx={{ height: 24 }}
                                  />
                                )}
                              </Box>
                            </Box>

                            {/* Match Score & Action */}
                            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 1 }}>
                              <MatchScoreBadge score={rec.matchScore} size="small" animate={false} />
                              <ArrowRight size={16} color="text.secondary" />
                            </Box>
                          </Box>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </Stack>
              ) : (
                <Box sx={{ textAlign: 'center', py: 4 }}>
                  <Typography color="text.secondary">
                    No recommendations yet. Complete your profile to get personalized job recommendations!
                  </Typography>
                  <Button 
                    variant="contained" 
                    sx={{ mt: 2 }}
                    onClick={() => navigate('/profile')}
                  >
                    Complete Profile
                  </Button>
                </Box>
              )}

              {recommendations && recommendations.length > 3 && (
                <>
                  <Divider sx={{ my: 2 }} />
                  <Box sx={{ textAlign: 'center' }}>
                    <Button 
                      endIcon={<ArrowRight size={16} />}
                      onClick={() => navigate('/recommendations')}
                      sx={{ textTransform: 'none', fontWeight: 600 }}
                    >
                      View All Recommendations
                    </Button>
                  </Box>
                </>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </PageLayout>
  );
};
