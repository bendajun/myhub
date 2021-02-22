export interface User {
  name: string,
  password: string,
  [propName: string]: any
}

export interface KoaMulterFileInfo {
  fieldname: string; // 字段名称
  originalname: string; // 文件原名称
  encoding: string;
  mimetype: string; // 文件类型
  destination: string;
  filename: string; // 文件保存后的名称
  path: string;
  size: number;
}