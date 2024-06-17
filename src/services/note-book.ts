/* eslint-disable */

import { get, post } from '../utils/http';
import { IDM_SoGhiChiSo, ICSDH_SoGhiChiSo } from './db-service';

enum URL {
  dongBoSoGhi = '/DongBoSoGhi',
  syncSoGhiToServer = '/SyncSoGhiToServer',
}

interface IDongBoChiSoReq {
  idnhanvien: number;
}

interface IDongBoChiSoRes {
  data: IDM_SoGhiChiSo[];
}

interface ISyncSoGhiToServerReq {
  NguoiDungID: number;
  ListSoGhi: ICSDH_SoGhiChiSo[];
}

interface ISyncSoGhiToServerRes {
  tong: number;
}

class NoteBookService {
  static _instance = new NoteBookService();

  async DongBoSoGhi(idnhanvien: number) {
    return await get<IDongBoChiSoRes>({
      url: URL.dongBoSoGhi,
      params: {
        idnhanvien: idnhanvien,
      },
    });
  }

  async SyncSoGhiToServer(data: ISyncSoGhiToServerReq) {
    return await post<ISyncSoGhiToServerRes>({
      url: URL.syncSoGhiToServer,
      data: data,
    });
  }
}

export type { IDongBoChiSoReq, IDongBoChiSoRes, IDM_SoGhiChiSo, ICSDH_SoGhiChiSo };

export default NoteBookService._instance;
