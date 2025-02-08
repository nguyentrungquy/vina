import * as React from "react";
import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import dayjs, { Dayjs } from "dayjs";
import { FaRegCalendarCheck, FaRightLong } from "react-icons/fa6";
import { MdOutlineAccessTime } from "react-icons/md";
import { DatePicker, Skeleton } from "antd";

import {
  Attendance,
  DateDetail,
  DateDetailArray,
  OffDate,
  OffHour,
  OffInfo,
} from "../../../interface/attendance";
import { useMobileAppStore } from "../../../store/mobile.app";
import { getAttendanceRange } from "../../../services/attendance";
import BangCong from "./components/bangcong";
import { getDayOff } from "../../../services/leave";

export default function Attendant() {
  const { t } = useTranslation();
  const { setHeader } = useMobileAppStore();
  const [attendanceData, setAttendanceData] = React.useState<Attendance[]>([]);
  const [workCount, setWorkCount] = React.useState(0);

  const [start, setStart] = React.useState<Dayjs>(
    dayjs(`${new Date().getFullYear()}-${new Date().getMonth() + 1}`),
  );
  const [end, setEnd] = React.useState<Dayjs>(
    dayjs(`${new Date().getFullYear()}-${new Date().getMonth() + 1}`).endOf(
      "month",
    ),
  );

  const getAttendances = useQuery<{ Table: Attendance[] }>({
    queryKey: ["workData", start, end],
    queryFn: () =>
      getAttendanceRange({
        startDate: start.format("YYYY-MM-DD"),
        endDate: end.format("YYYY-MM-DD"),
      }),
  });

  const dateValues = useQuery({
    queryKey: [start, end],
    queryFn: async () => {
      const range = [];
      const tempOffDate = [];
      const startYear = start.year();
      const endYear = end.year();

      if (!endYear && startYear > endYear) return [];
      let i = startYear;
      while (i <= endYear) {
        range.push(i.toString());
        i++;
      }

      for (let i = 0; i < range.length; i++) {
        const res = (await getDayOff(range[i])) as {
          Table: [OffInfo];
          Table1: [OffHour];
          Table2: OffDate[];
        };
        if (res?.Table2?.length > 0) {
          tempOffDate.push(...res.Table2);
        }
      }
      return tempOffDate;
    },
  });

  const dateDetails = React.useMemo<DateDetail>(() => {
    const temp: DateDetailArray = [];
    dateValues.data?.map((date) => {
      const matchedDate = temp.find((item) => item[0] === date.DILIG_DT);
      if (matchedDate) {
        matchedDate[1].push(date);
      } else {
        temp.push([date.DILIG_DT, [date]]);
      }
    });
    return Object.fromEntries(temp);
  }, [dateValues.data]);

  React.useEffect(() => {
    setHeader(t("attendantPage.title1"));
  }, []);

  React.useEffect(() => {
    if (getAttendances.data?.Table?.length) {
      let count = 0;
      const dateValue = ({
        year,
        month,
        day,
      }: {
        year: number;
        month: number;
        day: number;
      }) => {
        return Number(
          `${year}${month < 10 ? `0${month}` : month}${day < 10 ? `0${day}` : day}`,
        );
      };
      const date = new Date();
      const todayValue = dateValue({
        year: date.getFullYear(),
        month: date.getMonth() + 1,
        day: date.getDate(),
      });

      setAttendanceData(
        getAttendances.data.Table.filter((item) => {
          if (item.END_TIME) count += 1;
          return (
            item.END_TIME ||
            todayValue >=
              dateValue({
                year: Number(item.DATE.slice(0, 4)),
                month: Number(item.DATE.slice(5, 7)),
                day: Number(item.DATE.slice(8, 10)),
              })
          );
        }),
      );

      setWorkCount(count);
    }
  }, [getAttendances.data]);

  return (
    <div className="w-full px-3">
      <div className="rounded-md bg-white">
        <div className="flex items-center justify-between gap-2">
          <div className="w-full rounded bg-white p-2 shadow-inner shadow-gray-800">
            <div className="flex h-10 items-center justify-center gap-3">
              <DatePicker
                inputReadOnly
                allowClear={false}
                value={start}
                onChange={(value) => setStart(value)}
              />
              {/* <PiArrowArcRightThin /> */}
              <FaRightLong color="gray" />

              <DatePicker
                inputReadOnly
                allowClear={false}
                value={end}
                onChange={(value) => setEnd(value)}
              />
            </div>
          </div>
        </div>
        <div className="mt-6 flex items-center justify-between font-medium text-gray-500">
          <div className="flex items-center gap-2">
            <MdOutlineAccessTime size={24} color="#666" />
            {t("navbar.attendance")}
          </div>
          <div className="flex gap-1 text-lg text-blue-600">
            <p>{workCount}</p>
            <FaRegCalendarCheck size={24} />
          </div>
        </div>
        <div className="flex-1 bg-white pb-3 pt-2">
          {getAttendances.isLoading ? (
            <>
              <Skeleton className="mt-4" active />
              <Skeleton className="mt-4" active />
            </>
          ) : (
            <BangCong list={attendanceData} dateDetail={dateDetails} />
          )}
        </div>
      </div>
    </div>
  );
}
