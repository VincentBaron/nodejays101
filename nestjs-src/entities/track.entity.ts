import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, OneToMany } from 'typeorm';
import { ObjectType, Field, ID, Int } from '@nestjs/graphql';
import { SetEntity } from './set.entity';
import { LikeEntity } from './like.entity';

@ObjectType()
@Entity('tracks')
export class TrackEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ name: 'name' })
  name: string;

  @Field()
  @Column({ name: 'artist' })
  artist: string;

  @Field()
  @Column({ name: 'uri' })
  uri: string;

  @Field({ nullable: true })
  @Column({ name: 'img_url', nullable: true })
  imgURL: string;

  @ManyToMany(() => SetEntity, (set) => set.tracks)
  sets: SetEntity[];

  @OneToMany(() => LikeEntity, (like) => like.track)
  likes: LikeEntity[];

  @Field({ nullable: true })
  liked?: boolean;

  @Field(() => Int, { defaultValue: 0 })
  likesCount?: number;
}
