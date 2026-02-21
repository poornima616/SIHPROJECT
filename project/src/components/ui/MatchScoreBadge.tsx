import { Box, Typography, CircularProgress } from '@mui/material';
import { motion } from 'framer-motion';
import { getMatchScoreColor } from '../../utils/helpers';
import { useState, useEffect } from 'react';

interface MatchScoreBadgeProps {
  score: number;
  size?: 'small' | 'medium' | 'large';
  animate?: boolean;
}

export const MatchScoreBadge = ({ score, size = 'medium', animate = true }: MatchScoreBadgeProps) => {
  const [displayScore, setDisplayScore] = useState(0);

  const sizeMap = {
    small: { container: 60, fontSize: '1rem', thickness: 4 },
    medium: { container: 80, fontSize: '1.5rem', thickness: 5 },
    large: { container: 120, fontSize: '2rem', thickness: 6 },
  };

  const config = sizeMap[size];
  const color = getMatchScoreColor(score);

  useEffect(() => {
    if (!animate) {
      setDisplayScore(score);
      return;
    }

    let start = 0;
    const duration = 1000;
    const increment = score / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= score) {
        setDisplayScore(score);
        clearInterval(timer);
      } else {
        setDisplayScore(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [score, animate]);

  return (
    <Box
      component={motion.div}
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: 'spring', stiffness: 200, damping: 15 }}
      sx={{
        position: 'relative',
        display: 'inline-flex',
        width: config.container,
        height: config.container,
      }}
    >
      <CircularProgress
        variant="determinate"
        value={displayScore}
        size={config.container}
        thickness={config.thickness}
        sx={{
          color: color,
          filter: `drop-shadow(0 0 8px ${color}40)`,
        }}
      />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography
          variant="h6"
          component="div"
          sx={{ fontSize: config.fontSize, fontWeight: 700, color }}
        >
          {displayScore}%
        </Typography>
      </Box>
    </Box>
  );
};
