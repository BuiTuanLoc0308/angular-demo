import { UserModel } from '../users/user.model';

export interface LoginResponse {
  accessToken: string;
  user: UserModel;
}
