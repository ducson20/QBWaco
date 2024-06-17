/* eslint-disable */

import { post } from '../utils/http';

enum URL {
  getAllChuKy = '/GetAllChuKy',
}

interface IGetAllChuKyReq {
  username: string;
  password: string;
}

interface IGetAllChuKyRes {
  id: number;
  kycuoc: string;
  ngaybatdau: string;
  ngayketthuc: string;
  ngaybatdaughi: string;
  ngayketthucghi: string;
  mota: string;
  trangthai: boolean;
}

class PeriodService {
  static _instance = new PeriodService();

  async GetAllChuKy(data: IGetAllChuKyReq) {
    return await post<IGetAllChuKyRes[]>({
      baseURL: 'http://113.161.12.175:8081/Ghichiso',
      url: URL.getAllChuKy,
      data: data,
    });
  }
}

export type { IGetAllChuKyReq, IGetAllChuKyRes };

export default PeriodService._instance;
