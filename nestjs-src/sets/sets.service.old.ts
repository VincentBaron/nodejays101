import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, MoreThanOrEqual, In } from 'typeorm';
import { SetEntity } from '../entities/set.entity';
import { UserEntity } from '../entities/user.entity';
import { LikeEntity } from '../entities/like.entity';
import { TrackEntity } from '../entities/track.entity';
import { GenreEntity } from '../entities/genre.entity';

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
    // If no user is authenticated, return all sets for now
    if (!user || !user.userId) {
      console.log('No authenticated user, returning all sets');
      const sets = await this.setRepository.find({
        relations: ['tracks', 'user'],
      });
      return sets;
    }

    // For authenticated users, return all sets (simplified logic)
    const sets = await this.setRepository.find({
      relations: ['tracks', 'user'],
    });

    return sets;
  }

    console.log(
      'currentUsergenres: ',
      currentUser?.genres?.map((genre) => genre.name) || []
    );

    if (!currentUser) {
      throw new Error('User not found');
    }

    // Create a Set of genre names for the current user
    const currentUserGenres = currentUser.genres?.map((genre) => genre.name) || [];

    // Fetch all users with their genres
    const users = await this.userRepository.find({
      relations: ['genres'],
    });

    // Calculate matching percentages for each user
    const userMatches = users.map((u) => {
      const matchingGenres = u.genres
        ?.map((genre) => genre.name)
        .filter((genre) => currentUserGenres.includes(genre)).length || 0;
      const totalGenres = currentUserGenres.length;
      const matchingPercent = totalGenres > 0 ? matchingGenres / totalGenres : 0;

      return { user: u, matchingPercent };
    });

    // Sort users by matching percentage
    userMatches.sort((a, b) => b.matchingPercent - a.matchingPercent);

    // Get the IDs of the filtered users
    const filteredUserIds = userMatches.map((match) => match.user.id);

    // Fetch sets for the filtered users
    const sets = await this.setRepository.find({
      where: { userId: In(filteredUserIds) },
      relations: ['tracks', 'user'],
    });

    // Filter sets based on creation date and dummy flag
    const filteredSets = sets.filter(
      (set) => set.createdAt >= lastMonday && !set.dummy
    );
    const dummySets = sets.filter((set) => set.dummy);

    // Ensure at least two sets are returned
    if (filteredSets.length < 2) {
      filteredSets.push(...dummySets);
    }

    // Fetch likes for the current user
    const likes = await this.likeRepository.find({ 
      where: { userId: user.userId } 
    });
    const tracksUserLikesMap = new Set(likes.map((like) => like.trackId));

    // Fetch track likes count
    const trackLikes = await this.likeRepository
      .createQueryBuilder('like')
      .select('like.trackId', 'trackId')
      .addSelect('COUNT(like.trackId)', 'count')
      .where('like.createdAt >= :lastMonday', { lastMonday })
      .groupBy('like.trackId')
      .getRawMany();

    const trackLikesCountMap = trackLikes.reduce((map, like) => {
      map[like.trackId] = parseInt(like.count);
      return map;
    }, {});

    // Map sets and tracks with like information
    return filteredSets.map((set) => ({
      ...set,
      tracks: set.tracks?.map((track) => ({
        ...track,
        liked: tracksUserLikesMap.has(track.id),
        likesCount: trackLikesCountMap[track.id] || 0,
      })),
    }));
  }
}
