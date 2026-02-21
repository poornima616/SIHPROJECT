import { Box, Typography, Button, Paper } from '@mui/material';
import { AlertCircle } from 'lucide-react';

interface ErrorFallbackProps {
  error?: Error;
  resetError?: () => void;
}

export const ErrorFallback = ({ error, resetError }: ErrorFallbackProps) => {
  return (
    <Box
      sx={{
        minHeight: '400px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: 3,
      }}
    >
      <Paper
        sx={{
          p: 4,
          textAlign: 'center',
          maxWidth: 500,
        }}
      >
        <AlertCircle size={64} color="#F44336" style={{ marginBottom: 16 }} />
        <Typography variant="h5" gutterBottom fontWeight={600}>
          Oops! Something went wrong
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          {error?.message || 'An unexpected error occurred. Please try again.'}
        </Typography>
        {resetError && (
          <Button variant="contained" onClick={resetError}>
            Try Again
          </Button>
        )}
      </Paper>
    </Box>
  );
};
