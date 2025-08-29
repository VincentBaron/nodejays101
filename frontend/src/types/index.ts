export interface User {
  id: string;
  username: string;
  profilePicURL?: string;
}

export interface Track {
  id: string;
  name: string;
  artist: string;
  uri: string;
  imgURL?: string;
  liked?: boolean;
  likesCount?: number;
}

export interface Set {
  id: string;
  name: string;
  link: string;
  dummy: boolean;
  user: User;
  tracks: Track[];
}
