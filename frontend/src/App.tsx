import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Box,
  Paper,
  Button,
  Grid,
} from '@mui/material';
import { MusicNote, Refresh } from '@mui/icons-material';
import { useSets } from './lib/hooks';
import { SetCard } from './components/SetCard';
import { LoadingSpinner } from './components/LoadingSpinner';
import { ErrorMessage } from './components/ErrorMessage';

function App() {
  const { sets, loading, error, refetch } = useSets();

  const handleRetry = () => {
    refetch();
  };

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: 'background.default' }}>
      <AppBar position="static" elevation={1}>
        <Toolbar>
          <MusicNote sx={{ mr: 2 }} />
          <Typography variant="h6" component="h1" sx={{ flexGrow: 1 }}>
            NodeJays101
          </Typography>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Paper elevation={0} sx={{ p: 4, mb: 4, textAlign: 'center', backgroundColor: 'transparent' }}>
          <Typography variant="h3" component="h1" gutterBottom>
            NodeJays101
          </Typography>
          <Typography variant="h6" color="text.secondary">
            Discover and explore music sets from your favorite artists
          </Typography>
        </Paper>

        {loading && (
          <Box display="flex" justifyContent="center" my={4}>
            <LoadingSpinner size="lg" />
          </Box>
        )}

        {error && (
          <ErrorMessage
            message={(error as Error)?.message || 'Failed to load sets'}
            onRetry={handleRetry}
          />
        )}

        {!loading && !error && sets.length === 0 && (
          <Paper sx={{ p: 6, textAlign: 'center', my: 4 }}>
            <Typography variant="h6" color="text.secondary" gutterBottom>
              No sets found. Make sure you're authenticated and try again.
            </Typography>
            <Button
              variant="contained"
              onClick={handleRetry}
              startIcon={<Refresh />}
              sx={{ mt: 2 }}
            >
              Refresh
            </Button>
          </Paper>
        )}

        {!loading && !error && sets.length > 0 && (
          <Box>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
              <Typography variant="h4" component="h2">
                Your Music Sets ({sets.length})
              </Typography>
              <Button
                variant="outlined"
                onClick={handleRetry}
                startIcon={<Refresh />}
                size="small"
              >
                Refresh
              </Button>
            </Box>
            
            <Grid container spacing={3}>
              {sets.map((set) => (
                <Grid item xs={12} key={set.id}>
                  <SetCard set={set} />
                </Grid>
              ))}
            </Grid>
          </Box>
        )}
      </Container>
    </Box>
  );
}

export default App;
