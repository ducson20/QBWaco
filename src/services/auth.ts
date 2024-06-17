/* eslint-disable */

import { post } from '../utils/http';

enum URL {
  Login = '/Login',
}

interface ILoginReq {
  username: string;
  password: string;
}

interface ILoginRes {
  Id: number;
  FullName: string;
  Username: string;
  ListLoTrinh: string;
  Status: number;
}

class AuthService {
  static _instance = new AuthService();

  async login(data: ILoginReq) {
    return await post<ILoginRes>({
      baseURL: 'http://113.161.12.175:8081/NguoiDung',
      url: URL.Login,
      data: data,
    });
  }
}

export type { ILoginReq, ILoginRes };

export default AuthService._instance;
