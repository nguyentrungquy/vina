import { useQuery } from "@tanstack/react-query";
import {
  getAttendance,
  getDayOff,
  getNews,
  getWage,
  getWageTime,
} from "./utils";

export const useGetNews = () => {
  return useQuery({
    queryKey: ["news"],
    queryFn: () => getNews(),
  });
};

export const useGetWageTime = () => {
  return useQuery({
    queryKey: ["wageTime"],
    queryFn: () => getWageTime(),
  });
};
export const useGetWage = (thangLuong: string, loaiLuong: string) => {
  return useQuery({
    queryKey: ["wage", thangLuong, loaiLuong],
    queryFn: () => getWage(thangLuong, loaiLuong),
  });
};

export const useGetAttendance = (month: string) => {
  return useQuery({
    queryKey: ["attendance", month],
    queryFn: () => getAttendance(month),
  });
};

export const useGetDayOff = (year: string) => {
  return useQuery({
    queryKey: ["dayOff", year],
    queryFn: () => getDayOff(year),
  });
};
