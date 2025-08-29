import { UserEntity } from './user.entity';
import { TrackEntity } from './track.entity';
export declare class SetEntity {
    id: number;
    name: string;
    link: string;
    dummy: boolean;
    createdAt: Date;
    userId: number;
    user: UserEntity;
    tracks: TrackEntity[];
}
