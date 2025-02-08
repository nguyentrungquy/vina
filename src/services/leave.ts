import axios from "axios";
import { useMobileAppStore } from "../store/mobile.app";

export const getDayOff = async (year: string) => {
  const res = await axios.post("/api/MAnnualLeaveInformation", {
    YYYY: year,
    EmpCode: useMobileAppStore.getState().empCode,
  });
  return res.data;
};
