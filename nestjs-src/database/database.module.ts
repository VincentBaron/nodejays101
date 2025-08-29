import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../entities/user.entity';
import { SetEntity } from '../entities/set.entity';
import { TrackEntity } from '../entities/track.entity';
import { LikeEntity } from '../entities/like.entity';
import { GenreEntity } from '../entities/genre.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserEntity,
      SetEntity,
      TrackEntity,
      LikeEntity,
      GenreEntity,
    ]),
  ],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}
