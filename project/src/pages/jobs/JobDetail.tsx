import { Box, Typography, Paper, Chip, Stack, Button, Grid, Divider } from '@mui/material';
import { PageLayout } from '../../components/layout/PageLayout';
import { useParams } from 'react-router-dom';
import { useApi } from '../../hooks/useApi';
import { Job } from '../../types';
import { motion } from 'framer-motion';
import { MapPin, Building2, Clock, Calendar, Users } from 'lucide-react';
import { formatCurrency, formatShortDate } from '../../utils/formatters';
import toast from 'react-hot-toast';

export const JobDetail = () => {
  const { id } = useParams<{ id: string }>();

  const { data: job, isLoading } = useApi<Job>(['job', id], `/api/jobs/${id}`);

  const handleApply = () => {
    toast.success('Application submitted successfully!');
  };

  if (isLoading) {
    return (
      <PageLayout>
        <Typography>Loading...</Typography>
      </PageLayout>
    );
  }

  if (!job) {
    return (
      <PageLayout>
        <Typography>Job not found</Typography>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <Paper
        component={motion.div}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        sx={{ p: 4 }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}>
          <Box>
            <Typography variant="h4" fontWeight={700} gutterBottom>
              {job.title}
            </Typography>
            <Typography variant="h6" color="text.secondary" gutterBottom>
              {job.company}
            </Typography>
            <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
              <Chip label={job.workMode} color="primary" />
              <Chip label={job.domain} />
              {job.isPMScheme && <Chip label="PM Scheme" color="secondary" />}
            </Stack>
          </Box>
          <Box sx={{ textAlign: 'right' }}>
            {job.stipend && (
              <Typography variant="h4" color="primary" fontWeight={700}>
                {formatCurrency(job.stipend)}
              </Typography>
            )}
            <Typography variant="body2" color="text.secondary">
              per month
            </Typography>
          </Box>
        </Box>

        <Divider sx={{ my: 3 }} />

        <Grid container spacing={3} sx={{ mb: 3 }}>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <MapPin size={20} color="#0052CC" />
              <Box>
                <Typography variant="caption" color="text.secondary">
                  Location
                </Typography>
                <Typography variant="body2" fontWeight={500}>
                  {job.location}
                </Typography>
              </Box>
            </Box>
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Building2 size={20} color="#0052CC" />
              <Box>
                <Typography variant="caption" color="text.secondary">
                  Work Mode
                </Typography>
                <Typography variant="body2" fontWeight={500}>
                  {job.workMode}
                </Typography>
              </Box>
            </Box>
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Clock size={20} color="#0052CC" />
              <Box>
                <Typography variant="caption" color="text.secondary">
                  Duration
                </Typography>
                <Typography variant="body2" fontWeight={500}>
                  {job.duration || 'Not specified'}
                </Typography>
              </Box>
            </Box>
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Calendar size={20} color="#0052CC" />
              <Box>
                <Typography variant="caption" color="text.secondary">
                  Start Date
                </Typography>
                <Typography variant="body2" fontWeight={500}>
                  {job.startDate ? formatShortDate(job.startDate) : 'Flexible'}
                </Typography>
              </Box>
            </Box>
          </Grid>
          {job.openings && (
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Users size={20} color="#0052CC" />
                <Box>
                  <Typography variant="caption" color="text.secondary">
                    Openings
                  </Typography>
                  <Typography variant="body2" fontWeight={500}>
                    {job.openings}
                  </Typography>
                </Box>
              </Box>
            </Grid>
          )}
        </Grid>

        <Divider sx={{ my: 3 }} />

        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" fontWeight={600} gutterBottom>
            Description
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {job.description}
          </Typography>
        </Box>

        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" fontWeight={600} gutterBottom>
            Required Skills
          </Typography>
          <Stack direction="row" spacing={1} flexWrap="wrap">
            {job.requiredSkills.map((skill) => (
              <Chip key={skill} label={skill} />
            ))}
          </Stack>
        </Box>

        {job.preferredSkills && job.preferredSkills.length > 0 && (
          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" fontWeight={600} gutterBottom>
              Preferred Skills
            </Typography>
            <Stack direction="row" spacing={1} flexWrap="wrap">
              {job.preferredSkills.map((skill) => (
                <Chip key={skill} label={skill} variant="outlined" />
              ))}
            </Stack>
          </Box>
        )}

        <Divider sx={{ my: 3 }} />

        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            variant="contained"
            size="large"
            fullWidth
            onClick={handleApply}
            component={motion.button}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Apply Now
          </Button>
          <Button variant="outlined" size="large">
            Save
          </Button>
        </Box>
      </Paper>
    </PageLayout>
  );
};
