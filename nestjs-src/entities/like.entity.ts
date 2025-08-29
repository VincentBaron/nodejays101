import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { ObjectType, Field, ID } from '@nestjs/graphql';
import { UserEntity } from './user.entity';
import { TrackEntity } from './track.entity';

@ObjectType()
@Entity('likes')
export class LikeEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @Column({ name: 'user_id' })
  userId: number;

  @Column({ name: 'track_id' })
  trackId: number;

  @Field(() => UserEntity)
  @ManyToOne(() => UserEntity, (user) => user.likes)
  user: UserEntity;

  @Field(() => TrackEntity)
  @ManyToOne(() => TrackEntity, (track) => track.likes)
  track: TrackEntity;
}
