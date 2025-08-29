"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const sets_service_1 = require("./sets.service");
const typeorm_1 = require("@nestjs/typeorm");
const set_entity_1 = require("../entities/set.entity");
const user_entity_1 = require("../entities/user.entity");
const like_entity_1 = require("../entities/like.entity");
const track_entity_1 = require("../entities/track.entity");
describe('SetsService', () => {
    let service;
    let setRepository;
    let userRepository;
    let likeRepository;
    let trackRepository;
    const mockSetRepository = {
        find: jest.fn(),
        findOne: jest.fn(),
        save: jest.fn(),
        delete: jest.fn(),
        createQueryBuilder: jest.fn(),
    };
    const mockUserRepository = {
        find: jest.fn(),
        findOne: jest.fn(),
        save: jest.fn(),
    };
    const mockLikeRepository = {
        find: jest.fn(),
        createQueryBuilder: jest.fn().mockReturnValue({
            select: jest.fn().mockReturnThis(),
            addSelect: jest.fn().mockReturnThis(),
            where: jest.fn().mockReturnThis(),
            groupBy: jest.fn().mockReturnThis(),
            getRawMany: jest.fn(),
        }),
    };
    const mockTrackRepository = {
        find: jest.fn(),
        findOne: jest.fn(),
        save: jest.fn(),
    };
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [
                sets_service_1.SetsService,
                {
                    provide: (0, typeorm_1.getRepositoryToken)(set_entity_1.SetEntity),
                    useValue: mockSetRepository,
                },
                {
                    provide: (0, typeorm_1.getRepositoryToken)(user_entity_1.UserEntity),
                    useValue: mockUserRepository,
                },
                {
                    provide: (0, typeorm_1.getRepositoryToken)(like_entity_1.LikeEntity),
                    useValue: mockLikeRepository,
                },
                {
                    provide: (0, typeorm_1.getRepositoryToken)(track_entity_1.TrackEntity),
                    useValue: mockTrackRepository,
                },
            ],
        }).compile();
        service = module.get(sets_service_1.SetsService);
        setRepository = module.get((0, typeorm_1.getRepositoryToken)(set_entity_1.SetEntity));
        userRepository = module.get((0, typeorm_1.getRepositoryToken)(user_entity_1.UserEntity));
        likeRepository = module.get((0, typeorm_1.getRepositoryToken)(like_entity_1.LikeEntity));
        trackRepository = module.get((0, typeorm_1.getRepositoryToken)(track_entity_1.TrackEntity));
    });
    afterEach(() => {
        jest.clearAllMocks();
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
    describe('getSets', () => {
        const mockUser = {
            userId: '1',
            authorization: 'mock-auth',
            spotifyAuthorization: 'mock-spotify-auth',
        };
        const mockCurrentUser = {
            id: 1,
            username: 'testuser',
            profilePicURL: 'https://example.com/pic.jpg',
            genres: [
                { name: 'Electronic' },
                { name: 'House' },
            ],
        };
        const mockUsers = [
            {
                id: 1,
                username: 'testuser',
                genres: [{ name: 'Electronic' }, { name: 'House' }],
            },
            {
                id: 2,
                username: 'otheruser',
                genres: [{ name: 'Electronic' }],
            },
        ];
        const mockTracks = [
            {
                id: 1,
                name: 'Test Track 1',
                artist: 'Test Artist 1',
                uri: 'spotify:track:test1',
                imgURL: 'https://example.com/track1.jpg',
            },
            {
                id: 2,
                name: 'Test Track 2',
                artist: 'Test Artist 2',
                uri: 'spotify:track:test2',
                imgURL: 'https://example.com/track2.jpg',
            },
        ];
        const mockSets = [
            {
                id: 1,
                name: 'Test Set 1',
                link: 'https://example.com/set1',
                dummy: false,
                createdAt: new Date(),
                userId: 1,
                user: mockUsers[0],
                tracks: [mockTracks[0]],
            },
            {
                id: 2,
                name: 'Test Set 2',
                link: 'https://example.com/set2',
                dummy: false,
                createdAt: new Date(),
                userId: 2,
                user: mockUsers[1],
                tracks: [mockTracks[1]],
            },
        ];
        const mockLikes = [
            { trackId: 1, userId: 1 },
        ];
        const mockTrackLikes = [
            { trackId: 1, count: '5' },
            { trackId: 2, count: '3' },
        ];
        beforeEach(() => {
            mockUserRepository.findOne.mockResolvedValue(mockCurrentUser);
            mockUserRepository.find.mockResolvedValue(mockUsers);
            mockSetRepository.find.mockResolvedValue(mockSets);
            mockLikeRepository.find.mockResolvedValue(mockLikes);
            mockLikeRepository.createQueryBuilder().getRawMany.mockResolvedValue(mockTrackLikes);
        });
        it('should return sets for authenticated user', async () => {
            const result = await service.getSets(mockUser);
            expect(userRepository.findOne).toHaveBeenCalledWith({
                where: { id: mockUser.userId },
                relations: ['genres'],
            });
            expect(userRepository.find).toHaveBeenCalledWith({
                relations: ['genres'],
            });
            expect(setRepository.find).toHaveBeenCalledWith({
                where: { userId: expect.any(Object) },
                relations: ['tracks', 'user'],
            });
            expect(likeRepository.find).toHaveBeenCalledWith({
                where: { userId: mockUser.userId },
            });
            expect(result).toBeInstanceOf(Array);
            expect(result.length).toBeGreaterThan(0);
        });
        it('should throw error if user not found', async () => {
            mockUserRepository.findOne.mockResolvedValue(null);
            await expect(service.getSets(mockUser)).rejects.toThrow('User not found');
        });
        it('should handle user with no genres', async () => {
            const userWithNoGenres = { ...mockCurrentUser, genres: [] };
            mockUserRepository.findOne.mockResolvedValue(userWithNoGenres);
            const result = await service.getSets(mockUser);
            expect(result).toBeInstanceOf(Array);
        });
        it('should include like information in tracks', async () => {
            const result = await service.getSets(mockUser);
            const firstSet = result[0];
            if (firstSet && firstSet.tracks && firstSet.tracks.length > 0) {
                const firstTrack = firstSet.tracks[0];
                expect(firstTrack).toHaveProperty('liked');
                expect(firstTrack).toHaveProperty('likesCount');
            }
        });
    });
});
//# sourceMappingURL=sets.service.spec.js.map