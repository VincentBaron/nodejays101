import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  Chip,
  Avatar,
} from '@mui/material';
import { FavoriteOutlined, FavoriteBorderOutlined, OpenInNew } from '@mui/icons-material';
import { Track as TrackType } from '../types';

interface TrackProps {
  track: TrackType;
}

export const Track: React.FC<TrackProps> = ({ track }) => {
  const handleSpotifyClick = () => {
    if (track.uri) {
      window.open(track.uri, '_blank');
    }
  };

  return (
    <Card variant="outlined" sx={{ transition: 'all 0.2s', '&:hover': { boxShadow: 2 } }}>
      <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
        <Box display="flex" alignItems="center" gap={2}>
          {track.imgURL && (
            <Avatar
              src={track.imgURL}
              alt={`${track.name} cover`}
              variant="rounded"
              sx={{ width: 64, height: 64 }}
            />
          )}
          
          <Box flex={1} minWidth={0}>
            <Typography variant="h6" noWrap gutterBottom>
              {track.name}
            </Typography>
            <Typography variant="body2" color="text.secondary" noWrap>
              {track.artist}
            </Typography>
            
            <Box display="flex" alignItems="center" gap={1} mt={1}>
              <Chip
                icon={track.liked ? <FavoriteOutlined /> : <FavoriteBorderOutlined />}
                label={track.liked ? 'Liked' : ''}
                size="small"
                color={track.liked ? 'error' : 'default'}
                variant={track.liked ? 'filled' : 'outlined'}
              />
              <Typography variant="caption" color="text.secondary">
                {track.likesCount || 0} likes
              </Typography>
            </Box>
          </Box>
          
          <Button
            variant="contained"
            size="small"
            onClick={handleSpotifyClick}
            endIcon={<OpenInNew />}
            disabled={!track.uri}
            sx={{
              backgroundColor: 'spotify.main',
              '&:hover': {
                backgroundColor: 'spotify.dark',
              },
            }}
          >
            Spotify
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};
