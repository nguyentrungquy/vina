import { create } from "zustand";
import i18n from "../locales/i18n";
import { UserInfoType } from "../pages/mobile/profile/interface";

type UserType = {
  ADDR?: string;
  APP_CD?: string;
  APP_CD_NM?: string;
  BIRT?: string;
  BLOOD_TYPE1?: string;
  BLOOD_TYPE2?: string;
  CAREER_MM?: number;
  CURR_ADDR?: string;
  CURR_ZIP_CD?: string;
  DALT_TYPE?: string;
  DEPT_CD?: string;
  DEPT_NM?: string;
  DIR_INDIR?: string;
  EMAIL_ADDR?: string;
  EMP_NO?: string;
  EM_TEL_NO?: string;
  ENG_NAME?: string;
  ENTR_CD?: string;
  ENTR_CD_NM?: string;
  ENTR_DT?: string;
  EYESGT_LEFT?: number;
  EYESGT_RIGHT?: number;
  FUNC_CD_NM?: string;
  GROUP_ENTR_DT?: string;
  HAND_TEL_NO?: string;
  HANJA_NAME?: string;
  HGT?: number;
  INTERN_DT?: string;
  MARRY_CD?: string;
  MEMO_CD_NM?: string;
  MEMO_DT?: string;
  MIL_BRANCH?: string;
  MIL_BRANCH_NM?: string;
  MIL_END?: string;
  MIL_GRADE?: string;
  MIL_GRADE_NM?: string;
  MIL_KIND?: string;
  MIL_KIND_NM?: string;
  MIL_NO?: string;
  MIL_START?: string;
  MIL_TYPE?: string;
  MIL_TYPE_NM?: string;
  NAME?: string;
  OCPT_TYPE?: string;
  OCPT_TYPE_NM?: string;
  ORDER_CHANGE_DT?: string;
  PAY_GRD1_NM?: string;
  PAY_GRD2?: string;
  RESENT_PROMOTE_DT?: string;
  RETIRE_DT?: string;
  RETIRE_RESN?: string;
  ROLE_CD_NM?: string;
  ROLL_PSTN_NM?: string;
  SEX_CD?: string;
  SEX_NM?: string;
  SO_LU_CD?: string;
  TEL_NO?: string;
  WGT?: number;
  ZIP_CD?: string;
};

type Props = {
  emp_no: string;
  setEmp_no: (id: string) => void;
  isLogin: boolean;
  setIsLogin: (bol: boolean) => void;
  user?: UserType & { Photo?: string };
  setUser: (user: UserType & { Photo?: string }) => void;
};

function parseInfo(inputString: string) {
  // Split the string by the special character '♪'
  const parts = decodeURIComponent(inputString).split("♪");

  // Extract the relevant information
  const info = {
    company: parts[0],
    department: parts[1],
    name: parts[2],
    positionKorean: parts[3],
    positionVietnamese: parts[4],
    additionalInfo: parts[5],
  };

  return info;
}

export const useUserInfoStore = create<Props>((set) => ({
  emp_no: "",
  isLogin: false,
  user: parseInfo(getRawCookie("JHInfo") || ""),
  setEmp_no: (id) => set({ emp_no: id }),
  setIsLogin: (isLogin) => set({ isLogin }),
  setUser: (user: UserType & { Photo?: string }) => set({ user }),
}));

import { persist, createJSONStorage } from "zustand/middleware";
import CryptoJS from "crypto-js";
import { getRawCookie } from "../lib/utlis";

const encrypt = (data) =>
  CryptoJS.AES.encrypt(JSON.stringify(data), "secret-key").toString();
const decrypt = (data) =>
  JSON.parse(
    CryptoJS.AES.decrypt(data, "secret-key").toString(CryptoJS.enc.Utf8),
  );

export const useUserPersist = create(
  persist(
    (set, get) => ({
      bears: 0,
      addABear: () => set({ bears: get().bears + 1 }),
    }),
    {
      name: "emp_no_persist",
      storage: createJSONStorage(() => ({
        getItem: (name) => decrypt(localStorage.getItem(name)),
        setItem: (name, value) => localStorage.setItem(name, encrypt(value)),
        removeItem: (name) => localStorage.removeItem(name),
      })),
    },
  ),
);
