import { useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Chip,
  Stack,
  Button,
  TextField,
  InputAdornment,
} from '@mui/material';
import { PageLayout } from '../../components/layout/PageLayout';
import { CardSkeleton } from '../../components/common/LoadingSkeleton';
import { useApi } from '../../hooks/useApi';
import { Job } from '../../types';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin } from 'lucide-react';
import { formatCurrency } from '../../utils/formatters';
import { debounce } from '../../utils/helpers';

export const JobsList = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const { data: jobs, isLoading } = useApi<Job[]>(
    ['jobs', searchQuery],
    `/api/jobs?search=${searchQuery}`
  );

  const handleSearch = debounce((value: string) => {
    setSearchQuery(value);
  }, 500);

  if (isLoading) {
    return (
      <PageLayout>
        <Grid container spacing={3}>
          {[1, 2, 3, 4, 5, 6].map((i) => (
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
        Browse Jobs
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Discover internship opportunities from top companies
      </Typography>

      <Box sx={{ mb: 4 }}>
        <TextField
          fullWidth
          placeholder="Search by job title, company, or skills..."
          onChange={(e) => handleSearch(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search size={20} />
              </InputAdornment>
            ),
          }}
        />
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
                <Box sx={{ mb: 2 }}>
                  <Typography variant="h6" fontWeight={600} gutterBottom>
                    {job.title}
                  </Typography>
                  <Typography variant="body1" fontWeight={500} color="text.secondary">
                    {job.company}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mt: 1 }}>
                    <MapPin size={16} />
                    <Typography variant="body2" color="text.secondary">
                      {job.location}
                    </Typography>
                  </Box>
                </Box>

                {job.stipend && (
                  <Typography variant="h6" color="primary" sx={{ mb: 2 }}>
                    {formatCurrency(job.stipend)}/month
                  </Typography>
                )}

                <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ mb: 2 }}>
                  <Chip label={job.workMode} size="small" color="primary" />
                  <Chip label={job.domain} size="small" />
                  {job.isPMScheme && (
                    <Chip label="PM Scheme" size="small" color="secondary" />
                  )}
                </Stack>

                <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ mb: 3 }}>
                  {job.requiredSkills.slice(0, 3).map((skill) => (
                    <Chip key={skill} label={skill} size="small" variant="outlined" />
                  ))}
                  {job.requiredSkills.length > 3 && (
                    <Chip
                      label={`+${job.requiredSkills.length - 3} more`}
                      size="small"
                      variant="outlined"
                    />
                  )}
                </Stack>

                <Button variant="outlined" fullWidth>
                  View Details
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
              No jobs found
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Try adjusting your search criteria
            </Typography>
          </CardContent>
        </Card>
      )}
    </PageLayout>
  );
};
