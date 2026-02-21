import { Box, Typography, LinearProgress, Paper } from '@mui/material';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';

interface ProfileCompletenessProps {
  percentage: number;
}

export const ProfileCompleteness = ({ percentage }: ProfileCompletenessProps) => {
  const isComplete = percentage === 100;

  return (
    <Paper
      component={motion.div}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      sx={{ p: 3 }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="h6" fontWeight={600}>
          Profile Completeness
        </Typography>
        <Typography
          variant="h5"
          fontWeight={700}
          color={isComplete ? 'success.main' : 'primary.main'}
        >
          {percentage}%
        </Typography>
      </Box>

      <LinearProgress
        variant="determinate"
        value={percentage}
        sx={{
          height: 10,
          borderRadius: 5,
          mb: 2,
          backgroundColor: 'action.hover',
          '& .MuiLinearProgress-bar': {
            borderRadius: 5,
            background: isComplete
              ? 'linear-gradient(90deg, #00C853 0%, #69F0AE 100%)'
              : 'linear-gradient(90deg, #0052CC 0%, #2196F3 100%)',
          },
        }}
      />

      {isComplete ? (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: 'success.main' }}>
          <CheckCircle size={20} />
          <Typography variant="body2" fontWeight={500}>
            Your profile is complete!
          </Typography>
        </Box>
      ) : (
        <Typography variant="body2" color="text.secondary">
          Complete your profile to get better job recommendations
        </Typography>
      )}
    </Paper>
  );
};
