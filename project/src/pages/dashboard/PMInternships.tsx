import { Box, Typography, Grid, Card, CardContent, Chip, Stack, Button } from '@mui/material';
import { PageLayout } from '../../components/layout/PageLayout';
import { CardSkeleton } from '../../components/common/LoadingSkeleton';
import { useApi } from '../../hooks/useApi';
import { Job } from '../../types';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Award, MapPin } from 'lucide-react';
import { formatCurrency } from '../../utils/formatters';

export const PMInternships = () => {
  const navigate = useNavigate();

  const { data: jobs, isLoading } = useApi<Job[]>(
    ['pm-internships'],
    '/api/pm-internships'
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
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
        <Award size={40} color="#FF9933" />
        <Box>
          <Typography variant="h4" fontWeight={700}>
            PM Internship Scheme
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Exclusive internships under the Pradhan Mantri Internship Scheme
          </Typography>
        </Box>
      </Box>

      <Box
        sx={{
          p: 3,
          mb: 4,
          borderRadius: 2,
          background: 'linear-gradient(135deg, #FF9933 0%, #FFB366 100%)',
          color: 'white',
        }}
      >
        <Typography variant="h6" fontWeight={600} gutterBottom>
          About PM Internship Scheme
        </Typography>
        <Typography variant="body2">
          The Pradhan Mantri Internship Scheme is a flagship initiative by the Government of India to provide quality internship opportunities to students across the country. All internships under this scheme come with guaranteed stipends and mentorship from industry experts.
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {jobs?.map((job, index) => (
          <Grid size={{ xs: 12, md: 6 }} key={job.id}>
            <Card
              component={motion.div}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 * index }}
              whileHover={{ y: -4 }}
              sx={{ height: '100%', cursor: 'pointer' }}
              onClick={() => navigate(`/jobs/${job.id}`)}
            >
              <CardContent>
                <Chip
                  label="PM Scheme"
                  color="secondary"
                  size="small"
                  sx={{ mb: 2 }}
                />
                <Typography variant="h6" fontWeight={600} gutterBottom>
                  {job.title}
                </Typography>
                <Typography variant="body1" fontWeight={500} color="text.secondary" gutterBottom>
                  {job.company}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 2 }}>
                  <MapPin size={16} />
                  <Typography variant="body2" color="text.secondary">
                    {job.location}
                  </Typography>
                </Box>

                {job.stipend && (
                  <Typography variant="h6" color="primary" sx={{ mb: 2 }}>
                    {formatCurrency(job.stipend)}/month
                  </Typography>
                )}

                <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ mb: 3 }}>
                  <Chip label={job.workMode} size="small" color="primary" />
                  <Chip label={job.domain} size="small" />
                </Stack>

                <Button variant="contained" fullWidth>
                  View Details & Apply
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {jobs && jobs.length === 0 && (
        <Card>
          <CardContent sx={{ textAlign: 'center', py: 8 }}>
            <Typography variant="h6" color="text.secondary">
              No PM Scheme internships available
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Check back later for new opportunities
            </Typography>
          </CardContent>
        </Card>
      )}
    </PageLayout>
  );
};
