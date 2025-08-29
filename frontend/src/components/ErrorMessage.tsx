import React from 'react';
import { Alert, AlertTitle, Button } from '@mui/material';
import { ErrorOutline, Refresh } from '@mui/icons-material';

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, onRetry }) => {
  return (
    <Alert
      severity="error"
      icon={<ErrorOutline />}
      action={
        onRetry && (
          <Button
            color="inherit"
            size="small"
            onClick={onRetry}
            startIcon={<Refresh />}
          >
            Try again
          </Button>
        )
      }
      sx={{ mb: 2 }}
    >
      <AlertTitle>Error</AlertTitle>
      {message}
    </Alert>
  );
};
