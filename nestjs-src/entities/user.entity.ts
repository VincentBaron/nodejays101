import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { ObjectType, Field, ID } from '@nestjs/graphql';
import { SetEntity } from './set.entity';
import { LikeEntity } from './like.entity';
import { GenreEntity } from './genre.entity';

@ObjectType()
@Entity('users')
export class UserEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ name: 'username' })
  username: string;

  @Field({ nullable: true })
  @Column({ name: 'profile_pic_url', nullable: true })
  profilePicURL: string;

  @OneToMany(() => SetEntity, (set) => set.user)
  sets: SetEntity[];

  @OneToMany(() => LikeEntity, (like) => like.user)
  likes: LikeEntity[];

  @ManyToMany(() => GenreEntity, (genre) => genre.users)
  @JoinTable({
    name: 'user_genres',
    joinColumn: { name: 'user_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'genre_name', referencedColumnName: 'name' },
  })
  genres: GenreEntity[];
}
