// export type WorkType = {
//   emp_no: string;
//   check_date: string;
//   check_time?: string;
//   dilig_cd?: string;
//   dilig_nm?: string;
//   dilig_hh?: string;
//   dilig_mm?: string;
// };
export type WorkShift = {
  chang_dt: string;
  wk_type: string;
};
export type WorkList = {
  work: WorkType[];
  shift: WorkShift[];
};

export type WorkMonth = {
  Table: {
    Code: string;
    Name: string;
  }[];
};

export type WorkType = {
  Table: {
    Code: string;
    Name: string;
  }[];
};

export type WorkData = {
  Table: {
    ALLOW: string;
    ALLOW_CD: string;
    ALLOW_NM: string;
    ALLOW_SEQ: number;
  }[];
  Table1: {
    DILIG_CD: string;
    DILIG_CNT: number;
    DILIG_HH: number;
    DILIG_MM: number;
    DILIG_NM: string;
  }[];
  Table2: {
    SUB_AMT: string;
    SUB_CD: string;
    SUB_NM: string;
  }[];
  Table3: {
    PROV_TOT_AMT: string;
    REAL_PROV_AMT: string;
    SUB_TOT_AMT: string;
  }[];
};
