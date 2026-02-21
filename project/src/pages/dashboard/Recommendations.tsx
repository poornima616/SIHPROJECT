import { Box, Typography, Grid, Card, CardContent, Chip, Stack, Button } from '@mui/material';
import { PageLayout } from '../../components/layout/PageLayout';
import { MatchScoreBadge } from '../../components/ui/MatchScoreBadge';
import { CardSkeleton } from '../../components/common/LoadingSkeleton';
import { useApi } from '../../hooks/useApi';
import { Recommendation } from '../../types';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { formatCurrency } from '../../utils/formatters';

export const Recommendations = () => {
  const navigate = useNavigate();

  const { data: recommendations, isLoading } = useApi<Recommendation[]>(
    ['recommendations'],
    '/api/recommendations'
  );

  if (isLoading) {
    return (
      <PageLayout>
        <Grid container spacing={3}>
          {[1, 2, 3, 4].map((i) => (
            <Grid size={{ xs: 12, md: 6 }} key={i}>
              <CardSkeleton />
            </Grid>
          ))}
        </Grid>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <Typography variant="h4" fontWeight={700} gutterBottom>
        AI Recommendations
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Personalized job recommendations based on your profile
      </Typography>

      {!recommendations || recommendations.length === 0 ? (
        <Card>
          <CardContent sx={{ textAlign: 'center', py: 8 }}>
            <Typography variant="h6" color="text.secondary">
              No recommendations yet
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Complete your profile to get personalized recommendations
            </Typography>
          </CardContent>
        </Card>
      ) : (
        <Grid container spacing={3}>
          {recommendations.map((rec, index) => (
            <Grid size={{ xs: 12, md: 6 }} key={rec.id}>
              <Card
                component={motion.div}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                whileHover={{ y: -4 }}
                sx={{ height: '100%', cursor: 'pointer' }}
                onClick={() => navigate(`/jobs/${rec.jobId}`)}
              >
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="h6" fontWeight={600} gutterBottom>
                        {rec.job.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {rec.job.company}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {rec.job.location} • {rec.job.workMode}
                      </Typography>
                    </Box>
                    <MatchScoreBadge score={rec.matchScore} size="medium" />
                  </Box>

                  {rec.job.stipend && (
                    <Typography variant="h6" color="primary" sx={{ mb: 2 }}>
                      {formatCurrency(rec.job.stipend)}/month
                    </Typography>
                  )}

                  <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ mb: 2 }}>
                    {rec.job.requiredSkills.slice(0, 3).map((skill) => (
                      <Chip key={skill} label={skill} size="small" />
                    ))}
                    {rec.job.requiredSkills.length > 3 && (
                      <Chip label={`+${rec.job.requiredSkills.length - 3} more`} size="small" />
                    )}
                  </Stack>

                  {rec.strengths.length > 0 && (
                    <Box sx={{ mb: 2 }}>
                      <Typography variant="caption" color="success.main" fontWeight={600}>
                        Strengths:
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {rec.strengths[0]}
                      </Typography>
                    </Box>
                  )}

                  <Button variant="contained" fullWidth>
                    View Details
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </PageLayout>
  );
};
