export interface Login {
  email: string;
  password: string;
}

export interface User {
  _id: string;
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}

export interface LogedIn {
  user: User;
  token: string;
}
