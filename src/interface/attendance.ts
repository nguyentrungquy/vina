export type Attendance = {
  DATE: string;
  END_TIME: string;
  HOLI_TYPE: string;
  REMARK: string;
  STRT_TIME: string;
  WEEK_DAY: string;
  WORK_SHIFT: string;
  WORK_TYPE: string;
};

export type OffDate = {
  N_DILIG_CD: string;
  DILIG_DT: string;
  N_DILIG_HH: number;
  N_DILIG_MM: number;
  DILIG_NM: string;
  REMARK: string;
};

export type OffHour = {
  MON1: number;
  MON2: number;
  MON3: number;
  MON4: number;
  MON5: number;
  MON6: number;
  MON7: number;
  MON8: number;
  MON9: number;
  MON10: number;
  MON11: number;
  MON12: number;
  TOTAL: number;
};

export type OffInfo = {
  EMP_NO: string;
  MAX_YEAR_CNT: number;
  USE_CNT: number;
  YEAR_PART: number;
  YEAR_SAVE: number;
  YEAR_SAVE_TOT: number;
  YEAR_XRAY: number;
};

export type DateDetail = {
  [key: string]: OffDate[];
};
export type DateDetailArray = [string, OffDate[]][];
