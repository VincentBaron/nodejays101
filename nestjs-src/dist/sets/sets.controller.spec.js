"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const sets_controller_1 = require("./sets.controller");
const sets_service_1 = require("./sets.service");
describe('SetsController', () => {
    let controller;
    let service;
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
    const mockSets = [
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
        const module = await testing_1.Test.createTestingModule({
            controllers: [sets_controller_1.SetsController],
            providers: [
                {
                    provide: sets_service_1.SetsService,
                    useValue: mockSetsService,
                },
            ],
        }).compile();
        controller = module.get(sets_controller_1.SetsController);
        service = module.get(sets_service_1.SetsService);
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
            const result = await controller.getSets(mockRequest);
            expect(service.getSets).toHaveBeenCalledWith(mockRequest.user);
            expect(result).toEqual(mockSets);
        });
        it('should throw error if user is not authenticated', async () => {
            const unauthenticatedRequest = { user: null };
            await expect(controller.getSets(unauthenticatedRequest)).rejects.toThrow('Unauthorized');
        });
        it('should handle service errors', async () => {
            const errorMessage = 'Database connection failed';
            mockSetsService.getSets.mockRejectedValue(new Error(errorMessage));
            await expect(controller.getSets(mockRequest)).rejects.toThrow(errorMessage);
        });
    });
});
//# sourceMappingURL=sets.controller.spec.js.map