import { Pet } from './pet';

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
  likedPosts?: any[];
}
