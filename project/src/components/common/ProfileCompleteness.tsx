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
      transition={{ delay: 0.3 }}
      sx={{
        p: 3,
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
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
        <Box>
          <Typography 
            variant="h6" 
            fontWeight={700}
            sx={{ fontSize: '1.1rem' }}
          >
            Profile Completeness
          </Typography>
          <Typography 
            variant="caption" 
            color="text.secondary"
            sx={{ display: 'block', mt: 0.5 }}
          >
            {isComplete ? 'All set!' : `${100 - percentage} steps remaining`}
          </Typography>
        </Box>
        <Typography
          variant="h4"
          fontWeight={700}
          sx={{
            color: isComplete ? 'success.main' : 'primary.main',
            fontSize: '2rem',
          }}
        >
          {percentage}%
        </Typography>
      </Box>

      <LinearProgress
        variant="determinate"
        value={percentage}
        sx={{
          height: 12,
          borderRadius: 6,
          mb: 2.5,
          backgroundColor: (theme) =>
            theme.palette.mode === 'light' ? '#e0e0e0' : '#424242',
          '& .MuiLinearProgress-bar': {
            borderRadius: 6,
            background: isComplete
              ? 'linear-gradient(90deg, #00C853 0%, #69F0AE 100%)'
              : 'linear-gradient(90deg, #0052CC 0%, #2196F3 100%)',
            boxShadow: isComplete
              ? '0 0 12px rgba(0, 200, 83, 0.3)'
              : '0 0 12px rgba(0, 82, 204, 0.3)',
          },
        }}
      />

      {isComplete ? (
        <Box 
          sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: 1.5, 
            color: 'success.main',
            p: 2,
            borderRadius: 2,
            bgcolor: 'rgba(0, 200, 83, 0.08)',
            border: '1px solid rgba(0, 200, 83, 0.2)',
          }}
        >
          <CheckCircle size={22} strokeWidth={1.5} />
          <Typography variant="body2" fontWeight={600}>
            Profile is complete!
          </Typography>
        </Box>
      ) : (
        <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
          Complete your profile details to unlock personalized job recommendations and improve your chances of success.
        </Typography>
      )}
    </Paper>
  );
};
