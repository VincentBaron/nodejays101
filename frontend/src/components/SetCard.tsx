import React from 'react';
import {
  Card,
  CardHeader,
  CardContent,
  Avatar,
  Typography,
  Button,
  Chip,
  Box,
  Divider,
  List,
} from '@mui/material';
import { OpenInNew } from '@mui/icons-material';
import { Set as SetType } from '../types';
import { Track } from './Track';

interface SetCardProps {
  set: SetType;
}

export const SetCard: React.FC<SetCardProps> = ({ set }) => {
  const handleSetClick = () => {
    if (set.link) {
      window.open(set.link, '_blank');
    }
  };

  return (
    <Card elevation={3} sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardHeader
        avatar={
          set.user.profilePicURL ? (
            <Avatar src={set.user.profilePicURL} alt={`${set.user.username}'s profile`} />
          ) : (
            <Avatar>{set.user.username[0].toUpperCase()}</Avatar>
          )
        }
        title={
          <Typography variant="h6" component="h3">
            {set.name}
          </Typography>
        }
        subheader={`by ${set.user.username}`}
        action={
          <Box display="flex" alignItems="center" gap={1}>
            {set.dummy && (
              <Chip
                label="Demo"
                size="small"
                color="warning"
                variant="outlined"
              />
            )}
            <Button
              variant="contained"
              size="small"
              onClick={handleSetClick}
              endIcon={<OpenInNew />}
              disabled={!set.link}
            >
              View Set
            </Button>
          </Box>
        }
      />
      
      <Divider />
      
      <CardContent sx={{ flexGrow: 1, pt: 2 }}>
        <Typography variant="h6" gutterBottom>
          Tracks ({set.tracks.length})
        </Typography>
        
        <List disablePadding>
          {set.tracks.map((track, index) => (
            <Box key={track.id} mb={index < set.tracks.length - 1 ? 1 : 0}>
              <Track track={track} />
            </Box>
          ))}
        </List>
      </CardContent>
    </Card>
  );
};
