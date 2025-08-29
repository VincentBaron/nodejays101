import { Test, TestingModule } from '@nestjs/testing';
import { SetsController } from './sets.controller';
import { SetsService } from './sets.service';
import { SetEntity } from '../entities/set.entity';

describe('SetsController', () => {
  let controller: SetsController;
  let service: SetsService;

  const mockSetsService = {
    getSets: jest.fn(),
  };

  const mockRequest = {
    user: {
      userId: '1',
      authorization: 'mock-auth',
      spotifyAuthorization: 'mock-spotify-auth',
    },
  };

  const mockSets: SetEntity[] = [
    {
      id: 1,
      name: 'Test Set 1',
      link: 'https://example.com/set1',
      dummy: false,
      createdAt: new Date(),
      userId: 1,
      user: {
        id: 1,
        username: 'testuser',
        profilePicURL: 'https://example.com/pic.jpg',
        sets: [],
        likes: [],
        genres: [],
      },
      tracks: [
        {
          id: 1,
          name: 'Test Track',
          artist: 'Test Artist',
          uri: 'spotify:track:test',
          imgURL: 'https://example.com/track.jpg',
          sets: [],
          likes: [],
          liked: true,
          likesCount: 5,
        },
      ],
    },
  ];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SetsController],
      providers: [
        {
          provide: SetsService,
          useValue: mockSetsService,
        },
      ],
    }).compile();

    controller = module.get<SetsController>(SetsController);
    service = module.get<SetsService>(SetsService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getSets', () => {
    it('should return sets for authenticated user', async () => {
      mockSetsService.getSets.mockResolvedValue(mockSets);

      const result = await controller.getSets(mockRequest as any);

      expect(service.getSets).toHaveBeenCalledWith(mockRequest.user);
      expect(result).toEqual(mockSets);
    });

    it('should throw error if user is not authenticated', async () => {
      const unauthenticatedRequest = { user: null };

      await expect(
        controller.getSets(unauthenticatedRequest as any)
      ).rejects.toThrow('Unauthorized');
    });

    it('should handle service errors', async () => {
      const errorMessage = 'Database connection failed';
      mockSetsService.getSets.mockRejectedValue(new Error(errorMessage));

      await expect(controller.getSets(mockRequest as any)).rejects.toThrow(
        errorMessage
      );
    });
  });
});
