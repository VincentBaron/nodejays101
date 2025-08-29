import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, ManyToMany, JoinTable, JoinColumn, CreateDateColumn } from 'typeorm';
import { ObjectType, Field, ID } from '@nestjs/graphql';
import { UserEntity } from './user.entity';
import { TrackEntity } from './track.entity';

@ObjectType()
@Entity('sets')
export class SetEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ name: 'name' })
  name: string;

  @Field({ nullable: true })
  @Column({ name: 'link', nullable: true })
  link: string;

  @Field()
  @Column({ name: 'dummy', default: false })
  dummy: boolean;

  @Field()
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @Column({ name: 'user_id' })
  userId: number;

  @Field(() => UserEntity)
  @ManyToOne(() => UserEntity, (user) => user.sets)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @Field(() => [TrackEntity])
  @ManyToMany(() => TrackEntity, (track) => track.sets)
  @JoinTable({
    name: 'set_tracks',
    joinColumn: { name: 'set_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'track_id', referencedColumnName: 'id' },
  })
  tracks: TrackEntity[];
}
