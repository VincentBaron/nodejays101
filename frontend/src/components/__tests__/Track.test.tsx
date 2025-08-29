import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Track } from '../Track';
import { Track as TrackType } from '../../types';

const mockTrack: TrackType = {
  id: '1',
  name: 'Test Song',
  artist: 'Test Artist',
  uri: 'spotify:track:test123',
  imgURL: 'https://example.com/cover.jpg',
  liked: true,
  likesCount: 10,
};

// Mock window.open
const mockOpen = jest.fn();
Object.defineProperty(window, 'open', {
  writable: true,
  value: mockOpen,
});

describe('Track', () => {
  beforeEach(() => {
    mockOpen.mockClear();
  });

  test('renders track information correctly', () => {
    render(<Track track={mockTrack} />);

    expect(screen.getByText('Test Song')).toBeInTheDocument();
    expect(screen.getByText('Test Artist')).toBeInTheDocument();
    expect(screen.getByText('10 likes')).toBeInTheDocument();
    expect(screen.getByText('♥️ Liked')).toBeInTheDocument();
  });

  test('shows cover image when provided', () => {
    render(<Track track={mockTrack} />);

    const image = screen.getByAltText('Test Song cover');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', 'https://example.com/cover.jpg');
  });

  test('shows unliked state correctly', () => {
    const unlikedTrack = { ...mockTrack, liked: false };
    render(<Track track={unlikedTrack} />);

    expect(screen.getByText('🤍')).toBeInTheDocument();
    expect(screen.queryByText('♥️ Liked')).not.toBeInTheDocument();
  });

  test('handles missing cover image', () => {
    const trackWithoutImage = { ...mockTrack, imgURL: undefined };
    render(<Track track={trackWithoutImage} />);

    expect(screen.queryByAltText('Test Song cover')).not.toBeInTheDocument();
  });

  test('opens Spotify when button is clicked', async () => {
    const user = userEvent.setup();
    render(<Track track={mockTrack} />);

    const spotifyButton = screen.getByText('Open in Spotify');
    await user.click(spotifyButton);

    expect(mockOpen).toHaveBeenCalledWith('spotify:track:test123', '_blank');
  });

  test('shows zero likes when likesCount is undefined', () => {
    const trackWithoutLikes = { ...mockTrack, likesCount: undefined };
    render(<Track track={trackWithoutLikes} />);

    expect(screen.getByText('0 likes')).toBeInTheDocument();
  });

  test('applies correct styling for liked track', () => {
    render(<Track track={mockTrack} />);

    const likedBadge = screen.getByText('♥️ Liked');
    expect(likedBadge).toHaveClass('bg-red-100', 'text-red-800');
  });

  test('applies correct styling for unliked track', () => {
    const unlikedTrack = { ...mockTrack, liked: false };
    render(<Track track={unlikedTrack} />);

    const unlikedBadge = screen.getByText('🤍');
    expect(unlikedBadge).toHaveClass('bg-gray-100', 'text-gray-800');
  });
});
