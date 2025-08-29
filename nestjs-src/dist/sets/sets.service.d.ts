import { Repository } from 'typeorm';
import { SetEntity } from '../entities/set.entity';
import { UserEntity } from '../entities/user.entity';
import { LikeEntity } from '../entities/like.entity';
import { TrackEntity } from '../entities/track.entity';
export declare class SetsService {
    private readonly setRepository;
    private readonly userRepository;
    private readonly likeRepository;
    private readonly trackRepository;
    constructor(setRepository: Repository<SetEntity>, userRepository: Repository<UserEntity>, likeRepository: Repository<LikeEntity>, trackRepository: Repository<TrackEntity>);
    getSets(user: any): Promise<SetEntity[]>;
}
