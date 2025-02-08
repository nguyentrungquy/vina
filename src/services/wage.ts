import axios from "axios";
import { useMobileAppStore } from "../store/mobile.app";

export const getWageTime = async () => {
  const res = await axios.post("/api/MSelectList", {
    DIV: "PAY_YYMM",
    EntCode: useMobileAppStore.getState().entCode,
    EmpCode: useMobileAppStore.getState().empCode,
  });
  return res.data;
};

export type GetWageType = {
  wageMonth: string;
  wageType: string;
};
export const getWageDetail = async ({ wageMonth, wageType }: GetWageType) => {
  const res = await axios.post("/api/MSalaryInformation", {
    PayYYMM: wageMonth,
    ProvType: wageType,
    EntCode: useMobileAppStore.getState().entCode,
    EmpCode: useMobileAppStore.getState().empCode,
  });
  return res.data;
};

export const getWageType = async ({ thang }: { thang: string }) => {
  const res = await axios.post("/api/MSelectList", {
    DIV: "PROV_TYPE",
    Data: thang,
    EntCode: useMobileAppStore.getState().entCode,
    EmpCode: useMobileAppStore.getState().empCode,
  });
  return res.data;
};
