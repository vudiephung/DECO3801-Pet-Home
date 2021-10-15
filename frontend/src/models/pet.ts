export interface Pet {
  _id: string;
  name: string;
  type: string;
  breed: string;
  age: number;
  images: string[];
  description: string[];
  shelter?: {
    username: string;
    contactNumber: string;
    email: string;
    _id: string;
  };
}
