import * as React from "react";
import { useTranslation } from "react-i18next";
import { Empty, Skeleton } from "antd";

import { Attendance } from "../../../../../interface/attendance";
import { AttendanceItem } from "../../../attendant/components/bangcong";

export interface IAttendancesProps {
  attendance?: { Table: Attendance[] };
}

export default function Attendances({ attendance }: IAttendancesProps) {
  const { t } = useTranslation();
  const showItem = React.useMemo(() => {
    if (!attendance?.Table) return undefined;
    let count = 0;
    const tempAttendance: Attendance[] = [];
    [...attendance.Table].map((item) => {
      if (item.END_TIME) {
        if (count < 5) {
          count++;
          tempAttendance.push(item);
        }
      }
    });

    return tempAttendance;
  }, [attendance]);
  return (
    <div className="rounded-xl bg-white py-2">
      <div></div>

      <div className="">
        {!showItem ? (
          <Skeleton active />
        ) : !showItem.length ? (
          <Empty description={t("common.noData")} />
        ) : (
          <table className="w-full">
            <tbody className="text-center">
              {showItem.map((item, index) => {
                return <AttendanceItem item={item} key={index} />;
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
