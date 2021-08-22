import { Pet } from './pet';
import { Post } from './post';

export interface User {
  id: number;
  email: string;
  password: string;
  isShelter: boolean;
  adress?: string;
  contactNumber?: string;
  ownedPets?: Pet[];
  browsedPets?: Pet[];
  favouritePets?: Pet[];
  posts?: Post[];
  likedPosts?: Post[];
}
