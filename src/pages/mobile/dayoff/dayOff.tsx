import * as React from "react";
import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import { IoCalendarOutline } from "react-icons/io5";
import { LuCalendarMinus } from "react-icons/lu";
import { RiFileListLine } from "react-icons/ri";
import { MdCalendarMonth, MdSailing } from "react-icons/md";
import { Skeleton } from "antd";

import { OffDate, OffHour, OffInfo } from "../../../interface/attendance";
import { useMobileAppStore } from "../../../store/mobile.app";
import { getDayOff } from "../../../services/leave";
import BangNghi from "../attendant/components/bangnghi";
import LeaveDetail from "./components/leaveDetail";
import LeaveMonthUse from "./components/leaveMonthUse";
import { OFF_DATE_CODE } from "../../../lib/utlis";

export default function DayOffPage() {
  const { t } = useTranslation();
  const { setHeader } = useMobileAppStore();
  const [dayOffYear, setDayOffYear] = React.useState(
    new Date().getFullYear().toString(),
  );

  const currentYear = new Date().getFullYear();
  const years = Array.from(
    { length: currentYear - 2010 + 1 },
    (_, index) => currentYear - index,
  );

  const getDayOffs = useQuery<{
    Table: [OffInfo];
    Table1: [OffHour];
    Table2: OffDate[];
  }>({
    queryKey: ["dayOff", dayOffYear],
    queryFn: () => getDayOff(dayOffYear),
  });

  const dayOffList = React.useMemo(() => {
    return getDayOffs.data?.Table2?.length
      ? [...getDayOffs.data?.Table2] //Table2 never be undefined in here
          .filter((item) => OFF_DATE_CODE.includes(item.N_DILIG_CD))
          .reverse()
      : [];
  }, [getDayOffs.data?.Table2]);

  React.useEffect(() => {
    setHeader(t("dayOffPage.title2"));
  }, []);

  return (
    <div className="w-full px-3">
      <div className="rounded-md bg-white">
        <div className="flex items-center justify-between gap-2">
          <div className="flex w-full items-center justify-between rounded bg-white p-2 shadow-inner shadow-gray-800">
            <div className="flex h-10 items-center gap-3">
              {/* <p className="flex-1">{t("attendantPage.year")}:</p> */}
              <MdCalendarMonth size={32} className="text-gray-600" />
              <select
                className="h-8 w-24 border-none px-1 text-lg outline-none"
                value={dayOffYear}
                onChange={(event) =>
                  setDayOffYear(event.target.value.toString())
                }
              >
                {years?.map((item, viTri) => {
                  return (
                    <option
                      key={viTri}
                      value={item}
                      className="text-sm text-gray-700"
                    >
                      {item}
                    </option>
                  );
                })}
              </select>
            </div>

            <p className="flex items-center gap-2 text-lg font-medium text-gray-600">
              <MdSailing size={24} /> {dayOffList?.length} {t("common.day")}
            </p>
          </div>
        </div>

        <div className="mt-6">
          <div className="flex items-center gap-2 text-gray-700">
            <RiFileListLine size={24} />
            <p className="font-bold text-gray-900">
              {t("dayOffPage.leaveDetail")}
            </p>
          </div>
          <div className="px-6 pt-4">
            {<LeaveDetail leaveInfo={getDayOffs?.data?.Table[0]} />}
          </div>
        </div>

        <div className="mt-6">
          <div className="flex items-center gap-2 text-gray-700">
            <IoCalendarOutline size={22} />
            <p className="font-bold text-gray-900">
              {t("dayOffPage.leaveUseDetail")}
            </p>
          </div>
          {<LeaveMonthUse monthUsed={getDayOffs?.data?.Table1[0]} />}
        </div>

        <div className="mt-6 flex-1 bg-white">
          <div className="mb-2 flex items-center gap-2 text-gray-700">
            <LuCalendarMinus size={24} />
            <p className="font-bold text-gray-900">
              {t("dayOffPage.leaveTable")}
            </p>
          </div>
          {getDayOffs.isLoading ? (
            <>
              <Skeleton className="mt-4" active />
              <Skeleton className="mt-4" active />
            </>
          ) : (
            <div className="pl-6">
              <BangNghi list={dayOffList || []} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
