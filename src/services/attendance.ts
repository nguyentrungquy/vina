import axios from "axios";
import dayjs from "dayjs";
import { useMobileAppStore } from "../store/mobile.app";

export const getFirstAndLastDayOfMonth = (year: string, month: string) => {
  const firstDay = dayjs(`${year}-${month}`).format("YYYY-MM-DD");
  const lastDay = dayjs(`${year}-${month}`).endOf("month").format("YYYY-MM-DD");
  return { firstDay, lastDay };
};

export const getAttendanceMonth = async ({ month }: { month: string }) => {
  const { firstDay, lastDay } = getFirstAndLastDayOfMonth(
    month.slice(0, 4),
    month.slice(4, 6),
  );
  const res = await axios.post("api/MAttendanceInformation", {
    FrDate: firstDay,
    ToDate: lastDay,
    EntCode: useMobileAppStore.getState().entCode,
    EmpCode: useMobileAppStore.getState().empCode,
  });
  return res.data;
};

export const getAttendanceRange = async ({
  startDate,
  endDate,
}: {
  startDate: string;
  endDate: string;
}) => {
  const res = await axios.post("api/MAttendanceInformation", {
    FrDate: startDate,
    ToDate: endDate,
    EntCode: useMobileAppStore.getState().entCode,
    EmpCode: useMobileAppStore.getState().empCode,
  });
  return res.data;
};
