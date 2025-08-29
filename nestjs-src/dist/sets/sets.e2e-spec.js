"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const request = require("supertest");
const app_module_1 = require("../app.module");
const set_entity_1 = require("../entities/set.entity");
const user_entity_1 = require("../entities/user.entity");
const typeorm_1 = require("@nestjs/typeorm");
describe('SetsController (e2e)', () => {
    let app;
    let setRepository;
    let userRepository;
    const mockUser = {
        id: 1,
        username: 'testuser',
        profilePicURL: 'https://example.com/pic.jpg',
        genres: [],
    };
    const mockSet = {
        id: 1,
        name: 'Test Set',
        link: 'https://example.com/set',
        dummy: false,
        createdAt: new Date(),
        userId: 1,
        user: mockUser,
        tracks: [],
    };
    beforeEach(async () => {
        const moduleFixture = await testing_1.Test.createTestingModule({
            imports: [app_module_1.AppModule],
        })
            .overrideProvider((0, typeorm_1.getRepositoryToken)(set_entity_1.SetEntity))
            .useValue({
            find: jest.fn().mockResolvedValue([mockSet]),
            findOne: jest.fn().mockResolvedValue(mockSet),
        })
            .overrideProvider((0, typeorm_1.getRepositoryToken)(user_entity_1.UserEntity))
            .useValue({
            find: jest.fn().mockResolvedValue([mockUser]),
            findOne: jest.fn().mockResolvedValue(mockUser),
        })
            .compile();
        app = moduleFixture.createNestApplication();
        await app.init();
        setRepository = moduleFixture.get((0, typeorm_1.getRepositoryToken)(set_entity_1.SetEntity));
        userRepository = moduleFixture.get((0, typeorm_1.getRepositoryToken)(user_entity_1.UserEntity));
    });
    afterEach(async () => {
        await app.close();
    });
    describe('/api/sets (GET)', () => {
        it('should return 401 if user is not authenticated', () => {
            return request(app.getHttpServer())
                .get('/api/sets')
                .expect(401);
        });
        it('should return sets for authenticated user', () => {
            return request(app.getHttpServer())
                .get('/api/sets')
                .set('Cookie', ['UserID=1; Authorization=test-auth'])
                .expect(200)
                .expect((res) => {
                expect(res.body).toBeInstanceOf(Array);
            });
        });
        it('should handle database errors gracefully', () => {
            jest.spyOn(userRepository, 'findOne').mockRejectedValue(new Error('Database error'));
            return request(app.getHttpServer())
                .get('/api/sets')
                .set('Cookie', ['UserID=1; Authorization=test-auth'])
                .expect(500);
        });
    });
});
//# sourceMappingURL=sets.e2e-spec.js.map