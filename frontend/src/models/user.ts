import { Pet } from './pet';
// import { Post } from './post';

export interface User {
  userId: string;
  email?: string;
  password?: string;
  token: string;
  username: string;
  isShelter: boolean;
  address?: string;
  contactNumber?: string;
  favouritePets?: Pet['_id'][];
  // posts?: Post[];
  // likedPosts?: Post[];
}
