import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SetEntity } from '../entities/set.entity';
import { UserEntity } from '../entities/user.entity';
import { LikeEntity } from '../entities/like.entity';
import { TrackEntity } from '../entities/track.entity';

@Injectable()
export class SetsService {
  constructor(
    @InjectRepository(SetEntity)
    private readonly setRepository: Repository<SetEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(LikeEntity)
    private readonly likeRepository: Repository<LikeEntity>,
    @InjectRepository(TrackEntity)
    private readonly trackRepository: Repository<TrackEntity>,
  ) {}

  async getSets(user: any): Promise<SetEntity[]> {
    try {
      // For now, just return all sets with their relations
      console.log('Fetching sets for user:', user);
      
      const sets = await this.setRepository.find({
        relations: ['tracks', 'user'],
        order: {
          createdAt: 'DESC'
        }
      });

      console.log(`Found ${sets.length} sets`);
      return sets;
    } catch (error) {
      console.error('Error fetching sets:', error);
      throw error;
    }
  }
}
