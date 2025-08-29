import React from 'react';
import { Box, CircularProgress } from '@mui/material';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ size = 'md' }) => {
  const sizeMap = {
    sm: 20,
    md: 40,
    lg: 60,
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      p={4}
    >
      <CircularProgress size={sizeMap[size]} />
    </Box>
  );
};
