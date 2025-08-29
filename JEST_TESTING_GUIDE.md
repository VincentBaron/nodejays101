# Jest Testing Setup Guide

This guide covers the complete Jest testing setup for both NestJS backend and React frontend applications.

## 🎯 Overview

We've implemented comprehensive testing for:
- **Backend (NestJS)**: Unit tests, Integration tests, E2E tests
- **Frontend (React)**: Component tests, Hook tests, Integration tests

## 🔧 Backend Testing (NestJS)

### Setup

The Jest configuration is already included in `nestjs-package.json`:

```json
{
  "jest": {
    "moduleFileExtensions": ["js", "json", "ts"],
    "rootDir": "src",
    "testRegex": ".*\\.spec\\.ts$",
    "transform": {
      "^.+\\.(t|j)s$": "ts-jest"
    },
    "collectCoverageFrom": ["**/*.(t|j)s"],
    "coverageDirectory": "../coverage",
    "testEnvironment": "node"
  }
}
```

### Test Files Created

1. **`sets.service.spec.ts`** - Unit tests for SetsService
2. **`sets.controller.spec.ts`** - Unit tests for SetsController
3. **`sets.e2e-spec.ts`** - End-to-end tests

### Running Backend Tests

```bash
# In the NestJS project root
npm test                    # Run all tests
npm run test:watch         # Run tests in watch mode
npm run test:cov           # Run tests with coverage
npm run test:e2e           # Run end-to-end tests
```

### Backend Test Examples

#### Service Testing
```typescript
describe('SetsService', () => {
  it('should return sets for authenticated user', async () => {
    const result = await service.getSets(mockUser);
    expect(result).toBeInstanceOf(Array);
  });
});
```

#### Controller Testing
```typescript
describe('SetsController', () => {
  it('should return sets for authenticated user', async () => {
    const result = await controller.getSets(mockRequest);
    expect(result).toEqual(mockSets);
  });
});
```

#### E2E Testing
```typescript
describe('/api/sets (GET)', () => {
  it('should return sets for authenticated user', () => {
    return request(app.getHttpServer())
      .get('/api/sets')
      .set('Cookie', ['UserID=1; Authorization=test-auth'])
      .expect(200);
  });
});
```

## 🎨 Frontend Testing (React)

### Setup

Jest configuration in `frontend/jest.config.json`:

```json
{
  "preset": "ts-jest",
  "testEnvironment": "jsdom",
  "setupFilesAfterEnv": ["<rootDir>/src/setupTests.ts"],
  "moduleNameMapping": {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy"
  }
}
```

### Dependencies Added

```json
{
  "devDependencies": {
    "@testing-library/jest-dom": "^6.1.0",
    "@testing-library/react": "^13.4.0",
    "@testing-library/user-event": "^14.4.3",
    "jest": "^29.6.2",
    "jest-environment-jsdom": "^29.6.2",
    "msw": "^1.3.0",
    "ts-jest": "^29.1.1"
  }
}
```

### Test Files Created

1. **`App.test.tsx`** - Integration tests for main App component
2. **`Track.test.tsx`** - Component tests for Track component
3. **`hooks.test.tsx`** - Tests for custom React Query hooks

### Running Frontend Tests

```bash
# In the frontend directory
npm test                    # Run all tests
npm run test:watch         # Run tests in watch mode
npm run test:coverage      # Run tests with coverage
```

### Frontend Test Examples

#### Component Testing
```typescript
describe('Track', () => {
  test('renders track information correctly', () => {
    render(<Track track={mockTrack} />);
    expect(screen.getByText('Test Song')).toBeInTheDocument();
  });
});
```

#### Hook Testing
```typescript
describe('useSets', () => {
  test('should return sets data', async () => {
    const { result } = renderHook(() => useSets(), {
      wrapper: createWrapper(),
    });
    await waitFor(() => {
      expect(result.current.sets).toEqual(mockSets);
    });
  });
});
```

#### Integration Testing with MSW
```typescript
const server = setupServer(
  rest.get('/api/sets', (req, res, ctx) => {
    return res(ctx.json(mockSets));
  })
);

test('renders sets when data is loaded', async () => {
  renderWithQueryClient(<App />);
  await waitFor(() => {
    expect(screen.getByText('Chill Vibes')).toBeInTheDocument();
  });
});
```

## 🧪 Testing Strategies

### Backend Testing Strategy

1. **Unit Tests**
   - Test individual services and controllers
   - Mock external dependencies (database, APIs)
   - Test business logic and edge cases

2. **Integration Tests**
   - Test module interactions
   - Test with real database (test database)
   - Test authentication and authorization

3. **E2E Tests**
   - Test complete user workflows
   - Test API endpoints with real HTTP requests
   - Test error handling and edge cases

### Frontend Testing Strategy

1. **Component Tests**
   - Test component rendering
   - Test user interactions
   - Test prop handling and state changes

2. **Hook Tests**
   - Test custom hooks in isolation
   - Test React Query functionality
   - Test error handling and loading states

3. **Integration Tests**
   - Test component interactions
   - Test API integration with MSW
   - Test complete user workflows

## 🎯 Test Coverage Goals

### Backend Coverage
- **Services**: 90%+ coverage
- **Controllers**: 80%+ coverage
- **Entities**: 70%+ coverage
- **Overall**: 85%+ coverage

### Frontend Coverage
- **Components**: 80%+ coverage
- **Hooks**: 90%+ coverage
- **Utils**: 90%+ coverage
- **Overall**: 80%+ coverage

## 📊 Testing Tools

### Backend Tools
- **Jest**: Test runner and assertion library
- **Supertest**: HTTP assertion library for E2E tests
- **@nestjs/testing**: NestJS testing utilities
- **TypeORM Test Utils**: Database testing utilities

### Frontend Tools
- **Jest**: Test runner and assertion library
- **React Testing Library**: Component testing utilities
- **MSW (Mock Service Worker)**: API mocking
- **Jest DOM**: Additional DOM matchers

## 🚀 Best Practices

### General Testing Practices

1. **Write Descriptive Test Names**
   ```typescript
   test('should return 401 when user is not authenticated', () => {
     // test implementation
   });
   ```

2. **Use AAA Pattern** (Arrange, Act, Assert)
   ```typescript
   test('should calculate user matching percentage', async () => {
     // Arrange
     const mockUser = { userId: '1', genres: ['Electronic'] };
     
     // Act
     const result = await service.getSets(mockUser);
     
     // Assert
     expect(result).toBeInstanceOf(Array);
   });
   ```

3. **Mock External Dependencies**
   ```typescript
   const mockRepository = {
     find: jest.fn().mockResolvedValue(mockData),
   };
   ```

### Backend Testing Practices

1. **Use TestingModule for Dependency Injection**
2. **Mock Database Repositories**
3. **Test Error Scenarios**
4. **Use Supertest for E2E Tests**

### Frontend Testing Practices

1. **Test User Interactions, Not Implementation**
2. **Use MSW for API Mocking**
3. **Test Accessibility**
4. **Test Error Boundaries**

## 🔍 Running Tests

### Complete Test Suite

```bash
# Backend tests
cd nestjs-src
npm test

# Frontend tests
cd frontend
npm test

# Both with coverage
npm run test:coverage
```

### Continuous Integration

Add to your CI/CD pipeline:

```yaml
# .github/workflows/test.yml
name: Tests
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
      - run: npm ci
      - run: npm test -- --coverage
```

## 📈 Coverage Reports

### Viewing Coverage
- **Backend**: Open `coverage/lcov-report/index.html`
- **Frontend**: Open `coverage/lcov-report/index.html`

### Coverage Thresholds

Add to Jest config:
```json
{
  "coverageThreshold": {
    "global": {
      "branches": 80,
      "functions": 80,
      "lines": 80,
      "statements": 80
    }
  }
}
```

## 🎭 Mocking Strategies

### Backend Mocking
- Mock TypeORM repositories
- Mock external APIs
- Mock authentication middleware

### Frontend Mocking
- Mock React Query with MSW
- Mock browser APIs (localStorage, etc.)
- Mock React Router

This comprehensive testing setup ensures high code quality, reliability, and maintainability for both your NestJS backend and React frontend applications!
