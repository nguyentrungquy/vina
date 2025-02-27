export type AssetInfoType = {
  company: string;
  company_nm: string;
  asst_no: string;
  asst_nm: string;
  v_asst_nm: string;
  dept_cd: string;
  dept_nm: string;
  acq_loc_amt: number;
  res_amt: null | number;
  reg_dt: string;
  spec: string;
  acct_cd: string;
  acct_nm: string;
  maker: string;
  asset_state: string;
  setareacode: null | string | number;
  setarea: string;
  send_bp_nm: null | string;
  project_no: string;
  cust_bp_nm: string;
  asset_type: null | string;
  tax_flg: null | string;
  tax_end_date: null | string;
  manufacturing_date: string;
  serial_no: string;
  cpu: string;
  ram: string;
  hdd: string;
  cd: string;
  monitor: string;
  user_cd: string;
  user_nm: string;
  mac_add: string;
  locEntCode: null | string | number;
};

export type ScannedInfoType = AssetInfoType & {
  insertUserId: string;
  insertUserName: string;
  insertDate: string;
  updateUserId: string;
  updateUserName: string;
  updateDate: string;
  before_spec: string;
  before_maker: string;
  before_asset_state: string;
  before_setarea: string;
  before_serial_no: string;
  before_user_cd: string;
  before_user_nm: string;
  is_spec: boolean;
  is_maker: boolean;
  is_asset_state: boolean;
  is_setarea: boolean;
  is_serial_no: boolean;
  is_user_cd: boolean;
  masterId: string;
};

export type CheckMasterType = {
  id: number;
  company: string;
  subject: string;
  description: string;
  startDate: string;
  endDate: string;
  state: boolean;
  insertUserId: string;
  insertDate: string;
  insertUserName: string;
  updateUserId: string;
  updateUserName: string;
  updateDate: string;
  facility: boolean;
  subsidy: boolean;
};

export type AssetCheckType = {
  id: number;
  total_count: number;
  completed_count: number;
  masterId: number;
  master: CheckMasterType;
};

export type DepartmentAssetCheckType = {
  company: string;
  completed_count: number;
  dept_cd: string;
  dept_nm: string;
  id: number;
  masterId: number;
  total_count: number;
};

export type DepartmentAssetCheckItemType = {
  id: number;
  company: string;
  asst_no: string;
  asst_nm: string;
  v_asst_nm: string;
  dept_cd: string;
  dept_nm: string;
  acq_loc_amt: number;
  res_amt: number;
  reg_dt: string;
  spec: string;
  acct_cd: string;
  acct_nm: string;
  maker: string;
  asset_state: string;
  setarea: string;
  send_bp_nm?: string;
  project_no: string;
  cust_bp_nm: string;
  asset_type?: string;
  manufacturing_date: string;
  serial_no: string;
  cpu: string;
  ram: string;
  hdd: string;
  cd: string;
  monitor: string;
  user_cd: string;
  user_nm: string;
  mac_add: string;
  inspection_yn: string;
  updateUserId: string;
  updateUserName: string;
  updateDate: string;
};
