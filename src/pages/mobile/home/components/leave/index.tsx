import * as React from "react";
import { Empty, Skeleton } from "antd";
import { useTranslation } from "react-i18next";
import { DayOffItem } from "../../../attendant/components/bangnghi";
import { OffDate, OffHour, OffInfo } from "../../../../../interface/attendance";

export interface ILeaveProps {
  leave: {
    Table: [OffInfo];
    Table1: [OffHour];
    Table2: OffDate[];
  };
}

export default function Leave({ leave }: ILeaveProps) {
  const { t } = useTranslation();

  const showItem = React.useMemo(() => {
    if (!leave) return undefined;
    let count = 0;
    const tempAttendance: OffDate[] = [];
    leave.Table2.map((item) => {
      if (item.DILIG_DT) {
        if (count < 5) {
          count++;
          tempAttendance.unshift(item);
        }
      }
    });

    return tempAttendance;
  }, [leave]);

  return (
    <div className="rounded-xl bg-white py-2">
      <div>
        {!showItem ? (
          <Skeleton active />
        ) : !showItem.length ? (
          <Empty description={t("common.noData")} />
        ) : (
          <table className="w-full">
            <tbody className="text-center">
              {showItem.map((item, index) => {
                return <DayOffItem item={item} key={index} />;
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
