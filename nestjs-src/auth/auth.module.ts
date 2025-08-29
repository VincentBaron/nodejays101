import { Module, MiddlewareConsumer } from '@nestjs/common';
import { AuthMiddleware } from './auth.middleware';

@Module({})
export class AuthModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('*');
  }
}
