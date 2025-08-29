import { Entity, PrimaryColumn, ManyToMany } from 'typeorm';
import { ObjectType, Field } from '@nestjs/graphql';
import { UserEntity } from './user.entity';

@ObjectType()
@Entity('genres')
export class GenreEntity {
  @Field()
  @PrimaryColumn({ name: 'name' })
  name: string;

  @ManyToMany(() => UserEntity, (user) => user.genres)
  users: UserEntity[];
}
