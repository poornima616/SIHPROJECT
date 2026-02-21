import { Box, Grid, Card, CardContent, Typography, Stack, Chip } from '@mui/material';
import { motion } from 'framer-motion';
import { PageLayout } from '../../components/layout/PageLayout';
import { ProfileCompleteness } from '../../components/common/ProfileCompleteness';
import { DashboardSkeleton } from '../../components/common/LoadingSkeleton';
import { MatchScoreBadge } from '../../components/ui/MatchScoreBadge';
import { useApi } from '../../hooks/useApi';
import { DashboardStats, Recommendation } from '../../types';
import { Briefcase, FileText, Star, CheckCircle } from 'lucide-react';
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
      <Typography variant="h4" fontWeight={700} gutterBottom>
        Dashboard
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Welcome back! Here's your overview
      </Typography>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        {statsData.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card
                component={motion.div}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 * index }}
                whileHover={{ y: -4 }}
              >
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Box
                      sx={{
                        p: 1.5,
                        borderRadius: 2,
                        bgcolor: `${stat.color}20`,
                        display: 'flex',
                      }}
                    >
                      <Icon size={24} color={stat.color} />
                    </Box>
                    <Box>
                      <Typography variant="h4" fontWeight={700}>
                        {stat.value}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
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

      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <ProfileCompleteness percentage={stats?.profileCompleteness || 0} />
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <Card
            component={motion.div}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <CardContent>
              <Typography variant="h6" fontWeight={600} gutterBottom>
                Top Recommendations
              </Typography>
              <Stack spacing={2} sx={{ mt: 2 }}>
                {recommendations?.slice(0, 3).map((rec) => (
                  <Card
                    key={rec.id}
                    variant="outlined"
                    sx={{ cursor: 'pointer' }}
                    onClick={() => navigate(`/jobs/${rec.jobId}`)}
                  >
                    <CardContent>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <Box sx={{ flex: 1 }}>
                          <Typography variant="h6" fontWeight={600}>
                            {rec.job.title}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {rec.job.company} • {rec.job.location}
                          </Typography>
                          <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
                            <Chip label={rec.job.workMode} size="small" />
                            <Chip label={rec.job.domain} size="small" color="primary" />
                          </Stack>
                        </Box>
                        <MatchScoreBadge score={rec.matchScore} size="small" animate={false} />
                      </Box>
                    </CardContent>
                  </Card>
                ))}
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </PageLayout>
  );
};
