import { Box, Typography, Card, CardContent, Stack, Grid } from '@mui/material';
import { PageLayout } from '../../components/layout/PageLayout';
import { StatusChip } from '../../components/ui/StatusChip';
import { TableSkeleton } from '../../components/common/LoadingSkeleton';
import { useApi } from '../../hooks/useApi';
import { Application } from '../../types';
import { motion } from 'framer-motion';
import { formatRelativeTime } from '../../utils/formatters';

export const MyApplications = () => {
  const { data: applications, isLoading } = useApi<Application[]>(
    ['my-applications'],
    '/api/applications'
  );

  if (isLoading) {
    return (
      <PageLayout>
        <TableSkeleton />
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <Typography variant="h4" fontWeight={700} gutterBottom>
        My Applications
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Track all your internship applications
      </Typography>

      {!applications || applications.length === 0 ? (
        <Card>
          <CardContent sx={{ textAlign: 'center', py: 8 }}>
            <Typography variant="h6" color="text.secondary">
              No applications yet
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Start applying to internships to see them here
            </Typography>
          </CardContent>
        </Card>
      ) : (
        <Stack spacing={2}>
          {applications.map((app, index) => (
            <Card
              key={app.id}
              component={motion.div}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
            >
              <CardContent>
                <Grid container spacing={2} alignItems="center">
                  <Grid size={{ xs: 12, md: 5 }}>
                    <Typography variant="h6" fontWeight={600}>
                      {app.job?.title || 'Job Title'}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {app.job?.company || 'Company'} • {app.job?.location || 'Location'}
                    </Typography>
                  </Grid>
                  <Grid size={{ xs: 12, md: 3 }}>
                    <Typography variant="caption" color="text.secondary">
                      Applied
                    </Typography>
                    <Typography variant="body2">
                      {formatRelativeTime(app.appliedAt)}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={2}>
                    <StatusChip status={app.status} />
                  </Grid>
                  <Grid item xs={12} md={2}>
                    <Box sx={{ textAlign: 'right' }}>
                      <Typography variant="caption" color="text.secondary">
                        Last Updated
                      </Typography>
                      <Typography variant="body2">
                        {formatRelativeTime(app.updatedAt)}
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          ))}
        </Stack>
      )}
    </PageLayout>
  );
};
