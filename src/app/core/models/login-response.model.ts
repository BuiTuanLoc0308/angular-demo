import { UserModel } from './user.model';

export interface LoginResponse {
  accessToken: string;
  user: UserModel;
}
