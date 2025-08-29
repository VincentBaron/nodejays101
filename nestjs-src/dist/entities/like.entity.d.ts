import { UserEntity } from './user.entity';
import { TrackEntity } from './track.entity';
export declare class LikeEntity {
    id: number;
    createdAt: Date;
    userId: number;
    trackId: number;
    user: UserEntity;
    track: TrackEntity;
}
