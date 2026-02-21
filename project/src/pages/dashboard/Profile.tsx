import { useState } from 'react';
import { Box, Typography, Tabs, Tab, Paper } from '@mui/material';
import { PageLayout } from '../../components/layout/PageLayout';
import { motion } from 'framer-motion';

export const Profile = () => {
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <PageLayout>
      <Typography variant="h4" fontWeight={700} gutterBottom>
        Profile
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Manage your personal information and preferences
      </Typography>

      <Paper
        component={motion.div}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Tabs value={tabValue} onChange={handleTabChange} sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tab label="Personal Info" />
          <Tab label="Education" />
          <Tab label="Experience" />
          <Tab label="Skills" />
          <Tab label="Preferences" />
          <Tab label="Resume" />
        </Tabs>

        <Box sx={{ p: 3 }}>
          {tabValue === 0 && (
            <Typography>Personal Information section - Coming soon</Typography>
          )}
          {tabValue === 1 && (
            <Typography>Education section - Coming soon</Typography>
          )}
          {tabValue === 2 && (
            <Typography>Experience section - Coming soon</Typography>
          )}
          {tabValue === 3 && (
            <Typography>Skills section - Coming soon</Typography>
          )}
          {tabValue === 4 && (
            <Typography>Preferences section - Coming soon</Typography>
          )}
          {tabValue === 5 && (
            <Typography>Resume section - Coming soon</Typography>
          )}
        </Box>
      </Paper>
    </PageLayout>
  );
};
