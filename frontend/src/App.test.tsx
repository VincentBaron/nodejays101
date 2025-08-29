import { render, screen, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import App from '../App';
import { Set } from '../types';

// Mock data
const mockSets: Set[] = [
  {
    id: '1',
    name: 'Chill Vibes',
    link: 'https://spotify.com/set/1',
    dummy: false,
    user: {
      id: '1',
      username: 'john_doe',
      profilePicURL: 'https://example.com/profile.jpg',
    },
    tracks: [
      {
        id: '1',
        name: 'Song Title',
        artist: 'Artist Name',
        uri: 'spotify:track:abc123',
        imgURL: 'https://example.com/cover.jpg',
        liked: true,
        likesCount: 42,
      },
    ],
  },
];

// Setup MSW server
const server = setupServer(
  rest.get('/api/sets', (req, res, ctx) => {
    return res(ctx.json(mockSets));
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

const renderWithQueryClient = (ui: React.ReactElement) => {
  const queryClient = createTestQueryClient();
  return render(
    <QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>
  );
};

describe('App', () => {
  test('renders loading state initially', () => {
    renderWithQueryClient(<App />);
    expect(screen.getByText('NodeJays101')).toBeInTheDocument();
  });

  test('renders sets when data is loaded', async () => {
    renderWithQueryClient(<App />);

    await waitFor(() => {
      expect(screen.getByText('Your Music Sets (1)')).toBeInTheDocument();
    });

    expect(screen.getByText('Chill Vibes')).toBeInTheDocument();
    expect(screen.getByText('by john_doe')).toBeInTheDocument();
    expect(screen.getByText('Song Title')).toBeInTheDocument();
    expect(screen.getByText('Artist Name')).toBeInTheDocument();
  });

  test('handles error state', async () => {
    server.use(
      rest.get('/api/sets', (req, res, ctx) => {
        return res(ctx.status(500), ctx.json({ message: 'Server error' }));
      })
    );

    renderWithQueryClient(<App />);

    await waitFor(() => {
      expect(screen.getByText('Error')).toBeInTheDocument();
    });
  });

  test('shows empty state when no sets', async () => {
    server.use(
      rest.get('/api/sets', (req, res, ctx) => {
        return res(ctx.json([]));
      })
    );

    renderWithQueryClient(<App />);

    await waitFor(() => {
      expect(screen.getByText('No sets found. Make sure you\'re authenticated and try again.')).toBeInTheDocument();
    });
  });
});
