import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { UserEntity } from './entities/user.entity';
import { SetEntity } from './entities/set.entity';
import { TrackEntity } from './entities/track.entity';
import { GenreEntity } from './entities/genre.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

async function seed() {
  const app = await NestFactory.createApplicationContext(AppModule);

  const userRepository = app.get<Repository<UserEntity>>(getRepositoryToken(UserEntity));
  const setRepository = app.get<Repository<SetEntity>>(getRepositoryToken(SetEntity));
  const trackRepository = app.get<Repository<TrackEntity>>(getRepositoryToken(TrackEntity));
  const genreRepository = app.get<Repository<GenreEntity>>(getRepositoryToken(GenreEntity));

  console.log('🌱 Seeding database...');

  // Create genres
  const genres = [
    { name: 'Electronic' },
    { name: 'House' },
    { name: 'Techno' },
    { name: 'Trance' },
    { name: 'Drum & Bass' },
    { name: 'Ambient' },
    { name: 'Deep House' },
    { name: 'Progressive' }
  ];

  const savedGenres = [];
  for (const genre of genres) {
    const existingGenre = await genreRepository.findOne({ where: { name: genre.name } });
    if (!existingGenre) {
      const newGenre = genreRepository.create(genre);
      savedGenres.push(await genreRepository.save(newGenre));
    } else {
      savedGenres.push(existingGenre);
    }
  }

  // Create users
  const users = [
    {
      username: 'dj_cosmic',
      profilePicURL: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=150&h=150&fit=crop&crop=face',
      genres: [savedGenres[0], savedGenres[1], savedGenres[2]] // Electronic, House, Techno
    },
    {
      username: 'melodic_mike',
      profilePicURL: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      genres: [savedGenres[3], savedGenres[6], savedGenres[7]] // Trance, Deep House, Progressive
    },
    {
      username: 'bass_hunter',
      profilePicURL: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      genres: [savedGenres[4], savedGenres[2], savedGenres[0]] // Drum & Bass, Techno, Electronic
    }
  ];

  const savedUsers = [];
  for (const user of users) {
    const existingUser = await userRepository.findOne({ where: { username: user.username } });
    if (!existingUser) {
      const newUser = userRepository.create({
        username: user.username,
        profilePicURL: user.profilePicURL,
        genres: user.genres
      });
      savedUsers.push(await userRepository.save(newUser));
    } else {
      savedUsers.push(existingUser);
    }
  }

  // Create tracks
  const tracks = [
    {
      name: 'Midnight Drive',
      artist: 'Synthwave Collective',
      uri: 'spotify:track:example1',
      imgURL: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop',
      liked: true,
      likesCount: 42
    },
    {
      name: 'Ocean Waves',
      artist: 'Deep Motion',
      uri: 'spotify:track:example2',
      imgURL: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&h=300&fit=crop',
      liked: false,
      likesCount: 28
    },
    {
      name: 'Electric Dreams',
      artist: 'Neon Pulse',
      uri: 'spotify:track:example3',
      imgURL: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop',
      liked: true,
      likesCount: 67
    },
    {
      name: 'Bass Drop Symphony',
      artist: 'Heavy Beatz',
      uri: 'spotify:track:example4',
      imgURL: 'https://images.unsplash.com/photo-1485579149621-3123dd979885?w=300&h=300&fit=crop',
      liked: false,
      likesCount: 15
    },
    {
      name: 'Progressive Journey',
      artist: 'Melodic Mind',
      uri: 'spotify:track:example5',
      imgURL: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop',
      liked: true,
      likesCount: 89
    },
    {
      name: 'Ambient Sunrise',
      artist: 'Calm Collective',
      uri: 'spotify:track:example6',
      imgURL: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=300&fit=crop',
      liked: false,
      likesCount: 34
    }
  ];

  const savedTracks = [];
  for (const track of tracks) {
    const existingTrack = await trackRepository.findOne({ where: { name: track.name, artist: track.artist } });
    if (!existingTrack) {
      const newTrack = trackRepository.create(track);
      savedTracks.push(await trackRepository.save(newTrack));
    } else {
      savedTracks.push(existingTrack);
    }
  }

  // Create sets
  const sets = [
    {
      name: 'Weekend Vibes Mix',
      link: 'https://soundcloud.com/example/weekend-vibes',
      dummy: true,
      userId: savedUsers[0].id,
      tracks: [savedTracks[0], savedTracks[1], savedTracks[2]]
    },
    {
      name: 'Deep House Sessions',
      link: 'https://soundcloud.com/example/deep-house',
      dummy: true,
      userId: savedUsers[1].id,
      tracks: [savedTracks[3], savedTracks[4]]
    },
    {
      name: 'Electronic Odyssey',
      link: 'https://soundcloud.com/example/electronic-odyssey',
      dummy: true,
      userId: savedUsers[2].id,
      tracks: [savedTracks[2], savedTracks[4], savedTracks[5]]
    },
    {
      name: 'Morning Meditation',
      link: 'https://soundcloud.com/example/morning-meditation',
      dummy: true,
      userId: savedUsers[0].id,
      tracks: [savedTracks[5], savedTracks[1]]
    }
  ];

  for (const set of sets) {
    const existingSet = await setRepository.findOne({ where: { name: set.name } });
    if (!existingSet) {
      const newSet = setRepository.create({
        name: set.name,
        link: set.link,
        dummy: set.dummy,
        userId: set.userId,
        tracks: set.tracks
      });
      await setRepository.save(newSet);
      console.log(`✅ Created set: ${set.name}`);
    } else {
      console.log(`⏭️  Set already exists: ${set.name}`);
    }
  }

  console.log('🎉 Database seeding completed!');
  await app.close();
}

seed().catch((error) => {
  console.error('❌ Seeding failed:', error);
  process.exit(1);
});
