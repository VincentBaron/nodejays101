import { SetEntity } from './set.entity';
import { LikeEntity } from './like.entity';
import { GenreEntity } from './genre.entity';
export declare class UserEntity {
    id: number;
    username: string;
    profilePicURL: string;
    sets: SetEntity[];
    likes: LikeEntity[];
    genres: GenreEntity[];
}
