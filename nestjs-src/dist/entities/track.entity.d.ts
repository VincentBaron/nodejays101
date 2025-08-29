import { SetEntity } from './set.entity';
import { LikeEntity } from './like.entity';
export declare class TrackEntity {
    id: number;
    name: string;
    artist: string;
    uri: string;
    imgURL: string;
    sets: SetEntity[];
    likes: LikeEntity[];
    liked?: boolean;
    likesCount?: number;
}
