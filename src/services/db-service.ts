/* eslint-disable */

import { enablePromise, openDatabase, SQLiteDatabase } from 'react-native-sqlite-storage';

export interface IDM_SoGhiChiSo {
  ID: number;
  MaSo: string;
  Ten: string;
  DonViID: number;
  NgayBatDau: string;
  NgayKetThuc: string;
  NhanVienGhi: number;
  LoTrinhID: number;
  LoTrinh: string;
  KyCuocID: string;
  KyCuoc: number;
  ChuaGhi?: {
    ID: number;
    SoLuongBanGhi: number | undefined;
  };
  DaGhi?: {
    ID: number;
    SoLuongBanGhi: number | undefined;
  };
  ListChiSo?: ICSDH_SoGhiChiSo[] | undefined;
}

export interface ICSDH_SoGhiChiSo {
  ID: number;
  STT: string;
  KhachHangID: number;
  MaHopDong: string;
  MaKH: string;
  id_hopdong: number;
  HoTen: string;
  DiaChi: string;
  ChiSoKyTruoc: number;
  ChiSoGhiDuoc: number;
  SoGhiID: number;
  TenKyCuoc: string;
  IsUpdated: string;
  NgayGhiThucTe: string;
  TrangThai: string;
  KyCuoc?: string;
  LoTrinh?: string;
  MaDongHo: string;
  Longitude: string;
  Latitude: string;
}

export interface ICSDH_HoaDon {
  mahoadon?: string;
  id?: number;
  id_hopdong?: number;
  id_hoadon?: number;
  thang_cuoc?: string;
  id_kycuoc?: number;
  ma_ttoan?: string;
  sm_daidien?: string;
  ten_kh?: string;
  diachi_kh?: string;
  t_duong?: number;
  tong_ps?: number;
  thuong_gb?: number;
  vat_vn?: number;
  giam_tru?: number;
  no_vn?: number;
  tong_cong?: string;
  phat_sinh?: number;
  doi_tuong?: number;
  ma_ctv?: number;
  stt?: string;
  sm_lienhe?: string;
  email_lienhe?: string;
  thu_duoc?: number;
  ma_vach?: string;
  ghichu?: string;
  phieu_bao?: number;
  phieu_thu?: number;
  status?: boolean;
  ThuNganID?: number;
  ChiSoGhiDuoc?: number;
  NgayGhiThucTe?: string;
  ChiSoKyTruoc?: number;
  TrangThai?: number;
  SoGhiChiSoID?: number;
  NgayThanhToan?: string;
  LastUpdate?: string;
  SyncTime?: string;
}

const TABLE = {
  DM_SoGhiChiSo: 'DM_SoGhiChiSo',
  CSDH_SoGhiChiSo: 'CSDH_SoGhiChiSo',
  DM_BangGiaChiTiet: "DM_BangGiaChiTiet",
  DM_BangGiaDichVu: "DM_BangGiaDichVu"
};

enablePromise(true);

export const getDBConnection: any = () => {
  return openDatabase({ name: 'qb-waco-data.db', location: 'default' });
};

export const createTableDM_SoGhiChiSo = async (db: SQLiteDatabase) => {
  const query = `
  CREATE TABLE IF NOT EXISTS ${TABLE.DM_SoGhiChiSo}(
      ID integer PRIMARY KEY NOT NULL,
      MaSo varchar(255) NOT NULL,
      Ten nvarchar(255) NOT NULL,
      DonViID integer NOT NULL,
      NgayBatDau datetime DEFAULT CURRENT_DATE NOT NULL,
      NgayKetThuc datetime DEFAULT CURRENT_DATE NOT NULL,
      NhanVienGhi integer NOT NULL,
      LoTrinhID integer NOT NULL,
      LoTrinh nvarchar(255) NOT NULL,
      KyCuocID integer NOT NULL,
      KyCuoc datetime DEFAULT CURRENT_DATE NOT NULL
  );
  `;
  await db.executeSql(query);
};

export const createTableCSDH_SoGhiChiSo = async (db: SQLiteDatabase) => {
  const query = `
  CREATE TABLE IF NOT EXISTS ${TABLE.CSDH_SoGhiChiSo} (
      ID integer PRIMARY KEY NOT NULL,
      STT varchar(255) NOT NULL,
      KhachHangID integer NOT NULL,
      MaHopDong varchar(255) NOT NULL,
      MaKH varchar(255) NOT NULL,
      id_hopdong integer NOT NULL,
      HoTen nvarchar(255) NOT NULL,
      DiaChi nvarchar(255) NOT NULL,
      ChiSoKyTruoc integer NOT NULL,
      ChiSoGhiDuoc integer NOT NULL,
      SoGhiID integer NOT NULL,
      TenKyCuoc nvarchar(255) NOT NULL,
      IsUpdated varchar(1) DEFAULT '0' NOT NULL,
      NgayGhiThucTe datetime DEFAULT CURRENT_DATE NOT NULL,
      TrangThai varchar(1) DEFAULT '0' NOT NULL,
      MaDongHo varchar(255) NOT NULL,
      Longitude real NOT NULL,
      Latitude real NOT NULL,
      CONSTRAINT FK_CSDH_SoGhiChiSo_DM_SoGhiChiSo FOREIGN KEY (SoGhiID) REFERENCES DM_SoGhiChiSo(ID)
  );
  `;
  await db.executeSql(query);
};

export const createTableDM_BangGiaChiTiet = async (db: SQLiteDatabase) => {
  const query = `
  CREATE TABLE IF NOT EXISTS ${TABLE.DM_BangGiaChiTiet}(
      ID integer PRIMARY KEY NOT NULL,
      IDBangGia integer NULL,
      STT integer NULL,
      Ten nvarchar(50) NULL,
      MoTa nvarchar(100) NULL,
      TuSo integer NOT NULL,
      DenSo integer NOT NULL,
      GiaVAT real NULL,
      Gia real NULL
  );
  `;
  await db.executeSql(query);
};

export const createTableDM_BangGiaDichVu = async (db: SQLiteDatabase) => {
  const query = `
  CREATE TABLE IF NOT EXISTS ${TABLE.DM_BangGiaDichVu}(
      ID integer PRIMARY KEY NOT NULL,
      MaGia nvarchar(50) NOT NULL,
      Ten nvarchar(100) NULL,
      LoaiKhachHangID integer NOT NULL,
      PhuongThucTinhID integer NULL,
      DichVuID integer NOT NULL,
      DonViTinhID integer NOT NULL,
      Gia real NULL,
      TrangThai varchar(1) DEFAULT '0' NOT NULL,
      NgayHieuLuc datetime DEFAULT CURRENT_DATE NULL,
      NguoiCapNhat integer PRIMARY KEY NULL,
      NgayCapNhat datetime DEFAULT CURRENT_DATE NOT NULL,
      MoTa nvarchar(1000) NULL,
      TaoLuc datetime DEFAULT CURRENT_DATE NOT NULL,
      GiaSauThue real NULL
  );
  `;
  await db.executeSql(query);
};

export const createTable = async (db: SQLiteDatabase) => {
  createTableDM_SoGhiChiSo(db);
  createTableCSDH_SoGhiChiSo(db);
};

export const saveDM_SoGhiChiSoItems = async (
  db: SQLiteDatabase,
  DM_SoGhiChiSoItems: IDM_SoGhiChiSo[]
) => {
  const insertQuery =
    `REPLACE INTO ${TABLE.DM_SoGhiChiSo}(ID, MaSo, Ten, DonViID, NgayBatDau, NgayKetThuc, NhanVienGhi, LoTrinhID, LoTrinh, KyCuocID, KyCuoc) values` +
    DM_SoGhiChiSoItems.map((i) => {
      return `(
            ${i.ID},
            '${i.MaSo}', 
            '${i.Ten}', 
            ${i.DonViID}, 
            '${i.NgayBatDau}', 
            '${i.NgayKetThuc}', 
            ${i.NhanVienGhi}, 
            ${i.LoTrinhID}, 
            '${i.LoTrinh}', 
            ${i.KyCuocID}, 
            '${i.KyCuoc}'
        )`;
    }).join(',');

  return db.executeSql(insertQuery);
};

export const getDM_SoGhiChiSoList = async (
  db: SQLiteDatabase,
  searchText?: string
): Promise<IDM_SoGhiChiSo[]> => {
  try {
    let query = `SELECT dm_sg.* FROM ${TABLE.DM_SoGhiChiSo} dm_sg`;

    if (searchText) {
      query = `${query} WHERE LOWER(dm_sg.Ten) LIKE LOWER('%${searchText}%')`;
    }

    const dm_SoGhiChiSoList: IDM_SoGhiChiSo[] = [];
    const results = await db.executeSql(query);
    results.forEach((result) => {
      for (let index = 0; index < result.rows.length; index++) {
        dm_SoGhiChiSoList.push(result.rows.item(index));
      }
    });
    return dm_SoGhiChiSoList;
  } catch (error) {
    throw Error('A system error has occurred. Please contact your administrator for help!');
  }
};

export const saveCSDH_SoGhiChiSoItems = async (
  db: SQLiteDatabase,
  CSDH_SoGhiChiSo: ICSDH_SoGhiChiSo[]
) => {
  const insertQuery =
    `REPLACE INTO ${TABLE.CSDH_SoGhiChiSo}(ID, STT, KhachHangID, MaHopDong, MaKH, id_hopdong, HoTen, DiaChi, ChiSoKyTruoc, ChiSoGhiDuoc, SoGhiID, TenKyCuoc,IsUpdated, NgayGhiThucTe, TrangThai, MaDongHo, Longitude, Latitude) values` +
    CSDH_SoGhiChiSo.map(
      (i) =>
        `(
            ${i.ID},
            '${i.STT}', 
            ${i.KhachHangID}, 
            '${i.MaHopDong}', 
            '${i.MaKH}', 
            ${i.id_hopdong}, 
            '${i.HoTen}', 
            '${i.DiaChi}', 
            ${i.ChiSoKyTruoc}, 
            ${i.ChiSoGhiDuoc}, 
            ${i.SoGhiID}, 
            '${i.TenKyCuoc}', 
            '${i.IsUpdated}',
            '${i.NgayGhiThucTe}',
            '${i.TrangThai}',
            '${i.MaDongHo}',
            '${i.Longitude}',
            '${i.Latitude}'
          )`
    ).join(',');

  return db.executeSql(insertQuery);
};

export const getCSDH_SoGhiChiSoList = async (
  db: SQLiteDatabase,
  data: {
    id: number;
    searchText: string;
  }
): Promise<ICSDH_SoGhiChiSo[]> => {
  try {
    let query =
      'SELECT dm_sg.KyCuoc, dm_sg.LoTrinh, csdh_sg.* FROM DM_SoGhiChiSo dm_sg LEFT JOIN CSDH_SoGhiChiSo csdh_sg ON csdh_sg.SoGhiID = dm_sg.ID';

    if (data?.searchText) {
      query = `${query} WHERE dm_sg.ID = ${data?.id} 
      AND LOWER(csdh_sg.HoTen) LIKE LOWER('%${data?.searchText}%') 
      OR LOWER(csdh_sg.DiaChi) LIKE LOWER('%${data?.searchText}%')
      OR LOWER(csdh_sg.MaHopDong) LIKE LOWER('%${data?.searchText}%')
      OR LOWER(csdh_sg.MaKH) LIKE LOWER('%${data?.searchText}%')`;
    } else {
      query = `${query} WHERE dm_sg.ID = ${data?.id}`;
    }
    const csdh_SoGhiChiSoList: ICSDH_SoGhiChiSo[] = [];
    const results = await db.executeSql(query);
    // var startTime = performance.now();

    results.forEach((result) => {
      for (let index = 0; index < result.rows.length; index++) {
        csdh_SoGhiChiSoList.push(result.rows.item(index));
      }
    });
    // var endTime = performance.now();
    // console.log(`abc ${endTime - startTime} milliseconds`);
    return csdh_SoGhiChiSoList;
  } catch (error) {
    throw Error('A system error has occurred. Please contact your administrator for help!');
  }
};

export const getCSDH_SoGhiChiSoListByStaffId = async (
  db: SQLiteDatabase,
  id: number
): Promise<ICSDH_SoGhiChiSo[]> => {
  try {
    const query = `SELECT csdh_sg.*
                   FROM ${TABLE.DM_SoGhiChiSo} dm_sg
                   JOIN ${TABLE.CSDH_SoGhiChiSo} csdh_sg ON dm_sg.ID = csdh_sg.SoGhiID
                   WHERE dm_sg.NhanVienGhi = ${id}
                   `;
    const csdh_SoGhiChiSoList: ICSDH_SoGhiChiSo[] = [];
    const results = await db.executeSql(query);
    results.forEach((result) => {
      for (let index = 0; index < result.rows.length; index++) {
        csdh_SoGhiChiSoList.push(result.rows.item(index));
      }
    });
    return csdh_SoGhiChiSoList;
  } catch (error) {
    throw Error('A system error has occurred. Please contact your administrator for help!');
  }
};

export const getCSDH_SoGhiChiSoBySoGhiId = async (
  db: SQLiteDatabase,
  id: number
): Promise<ICSDH_SoGhiChiSo> => {
  try {
    const query = `SELECT dm_sg.KyCuoc, dm_sg.LoTrinh, csdh_sg.*
                   FROM ${TABLE.DM_SoGhiChiSo} dm_sg
                   JOIN ${TABLE.CSDH_SoGhiChiSo} csdh_sg ON dm_sg.ID = csdh_sg.SoGhiId
                   WHERE csdh_sg.ID = ${id}
                   `;
    const results = await db.executeSql(query);
    return results[0].rows.item(0);
  } catch (error) {
    throw Error('A system error has occurred. Please contact your administrator for help!');
  }
};

export interface ICountCSDH_SoGhiChiSo {
  ID: number;
  SoLuongBanGhi: number;
}

export const countCSDH_SoGhiChiSo = async (
  db: SQLiteDatabase,
  trangThai: boolean
): Promise<ICountCSDH_SoGhiChiSo[]> => {
  try {
    let query = `SELECT dm_sg.ID, COUNT(*) AS SoLuongBanGhi
                   FROM ${TABLE.DM_SoGhiChiSo} dm_sg
                   LEFT JOIN ${TABLE.CSDH_SoGhiChiSo} csdh_sg ON dm_sg.ID = csdh_sg.SoGhiId
                   `;

    if (trangThai) {
      query = ` ${query} WHERE csdh_sg.ChiSoGhiDuoc != 0`;
    } else {
      query = ` ${query} WHERE csdh_sg.ChiSoGhiDuoc = 0`;
    }

    query = ` ${query} GROUP BY dm_sg.ID`;
    const data: ICountCSDH_SoGhiChiSo[] = [];
    const results = await db.executeSql(query);
    results.forEach((result) => {
      for (let index = 0; index < result.rows.length; index++) {
        data.push(result.rows.item(index));
      }
    });
    return data;
  } catch (error) {
    throw Error('A system error has occurred. Please contact your administrator for help!');
  }
};

export const updateCSDH_SoGhiChiSo = async (
  db: SQLiteDatabase,
  data: {
    id: number | undefined;
    ChiSoGhiDuoc: number;
    ChiSoKyTruoc: number;
    NgayGhiThucTe: string;
  }
) => {
  try {
    const query = `
    UPDATE ${TABLE.CSDH_SoGhiChiSo}
    SET ChiSoGhiDuoc = ${data.ChiSoGhiDuoc},
        TrangThai = '1',
        NgayGhiThucTe = '${data.NgayGhiThucTe}'
    WHERE ID = ${data.id}
    `;
    await db.executeSql(query);
  } catch (error) {
    throw Error('A system error has occurred. Please contact your administrator for help!');
  }
};
