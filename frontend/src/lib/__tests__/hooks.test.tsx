import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactNode } from 'react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { useSets } from '../hooks';
import { Set } from '../../types';

const mockSets: Set[] = [
  {
    id: '1',
    name: 'Test Set',
    link: 'https://example.com/set',
    dummy: false,
    user: {
      id: '1',
      username: 'testuser',
      profilePicURL: 'https://example.com/pic.jpg',
    },
    tracks: [],
  },
];

const server = setupServer(
  rest.get('/api/sets', (req, res, ctx) => {
    return res(ctx.json(mockSets));
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  return ({ children }: { children: ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe('useSets', () => {
  test('should return sets data', async () => {
    const { result } = renderHook(() => useSets(), {
      wrapper: createWrapper(),
    });

    expect(result.current.loading).toBe(true);
    expect(result.current.sets).toEqual([]);

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.sets).toEqual(mockSets);
    expect(result.current.error).toBe(null);
  });

  test('should handle errors', async () => {
    server.use(
      rest.get('/api/sets', (req, res, ctx) => {
        return res(ctx.status(500), ctx.json({ message: 'Server error' }));
      })
    );

    const { result } = renderHook(() => useSets(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.error).toBeTruthy();
    expect(result.current.sets).toEqual([]);
  });

  test('should allow refetching', async () => {
    const { result } = renderHook(() => useSets(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(typeof result.current.refetch).toBe('function');
  });
});
