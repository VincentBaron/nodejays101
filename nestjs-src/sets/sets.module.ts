import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SetsService } from './sets.service';
import { SetsResolver } from './sets.resolver';
import { SetsController } from './sets.controller';
import { SetEntity } from '../entities/set.entity';
import { UserEntity } from '../entities/user.entity';
import { LikeEntity } from '../entities/like.entity';
import { TrackEntity } from '../entities/track.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      SetEntity,
      UserEntity,
      LikeEntity,
      TrackEntity,
    ]),
  ],
  controllers: [SetsController],
  providers: [SetsService, SetsResolver],
})
export class SetsModule {}
