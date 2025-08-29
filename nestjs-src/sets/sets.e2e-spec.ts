import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../app.module';
import { Repository } from 'typeorm';
import { SetEntity } from '../entities/set.entity';
import { UserEntity } from '../entities/user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('SetsController (e2e)', () => {
  let app: INestApplication;
  let setRepository: Repository<SetEntity>;
  let userRepository: Repository<UserEntity>;

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
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(getRepositoryToken(SetEntity))
      .useValue({
        find: jest.fn().mockResolvedValue([mockSet]),
        findOne: jest.fn().mockResolvedValue(mockSet),
      })
      .overrideProvider(getRepositoryToken(UserEntity))
      .useValue({
        find: jest.fn().mockResolvedValue([mockUser]),
        findOne: jest.fn().mockResolvedValue(mockUser),
      })
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    setRepository = moduleFixture.get<Repository<SetEntity>>(
      getRepositoryToken(SetEntity)
    );
    userRepository = moduleFixture.get<Repository<UserEntity>>(
      getRepositoryToken(UserEntity)
    );
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
      jest.spyOn(userRepository, 'findOne').mockRejectedValue(
        new Error('Database error')
      );

      return request(app.getHttpServer())
        .get('/api/sets')
        .set('Cookie', ['UserID=1; Authorization=test-auth'])
        .expect(500);
    });
  });
});
