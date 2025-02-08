import axios from "axios";
import { useMobileAppStore as userInfo } from "../../../store/mobile.app";
import dayjs from "dayjs";

//Vì sao lại tách riêng api của home hoặc đơn giản hơn là dùng api của các trang khác ư? Lười sửa lại đó :V

export const getNews = async () => {
  // const res = await httpPost("/api/news/get-news");
  return [
    { title: "New 1", content: "Content 1" },
    { title: "New 1", content: "Content 1" },
    { title: "New 1", content: "Content 1" },
    { title: "New 1", content: "Content 1" },
    { title: "New 1", content: "Content 1" },
    { title: "New 1", content: "Content 1" },
  ];
};

export const companies = {
  VN532: "JAHWA VINA",
  JV532: "JH VINA",
  VN538: "NANO VINA",
  default: "JAHWA",
};

export const getWageTime = async () => {
  const res = await axios.post("/api/MSelectList", {
    DIV: "PAY_YYMM",
    // Data: thang,
    EntCode: userInfo.getState().entCode,
    EmpCode: userInfo.getState().empCode,
  });
  return res.data;
};

export const getWage = async (thangLuong: string, loaiLuong: string) => {
  const dulieuApi = await axios.post("/api/MSalaryInformation", {
    PayYYMM: thangLuong,
    ProvType: loaiLuong,
    EntCode: userInfo.getState().entCode,
    EmpCode: userInfo.getState().empCode,
  });
  return dulieuApi.data;
};

export const getAttendance = async (month: string) => {
  const { firstDay, lastDay } = getFirstAndLastDayOfMonth(
    month.slice(0, 4),
    month.slice(4, 6),
  );
  const res = await axios.post("api/MAttendanceInformation", {
    FrDate: firstDay,
    ToDate: lastDay,
    EntCode: userInfo.getState().entCode,
    EmpCode: userInfo.getState().empCode,
  });
  return res.data;
};

export const getDayOff = async (year: string) => {
  const res = await axios.post("/api/MAnnualLeaveInformation", {
    YYYY: year,
    EmpCode: userInfo.getState().empCode,
  });
  return res.data;
};

export const getFirstAndLastDayOfMonth = (year: string, month: string) => {
  const firstDay = dayjs(`${year}-${month}`).format("YYYY-MM-DD");
  const lastDay = dayjs(`${year}-${month}`).endOf("month").format("YYYY-MM-DD");
  return { firstDay, lastDay };
};
