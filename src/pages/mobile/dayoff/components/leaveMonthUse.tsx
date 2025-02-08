import { useTranslation } from "react-i18next";
import { Skeleton } from "antd";

import { OffHour } from "../../../../interface/attendance";

export interface ILeaveMonthUseProps {
  monthUsed?: OffHour;
}

export default function LeaveMonthUse({ monthUsed }: ILeaveMonthUseProps) {
  const { t } = useTranslation();
  return (
    <div>
      {!monthUsed ? (
        <div>
          <Skeleton active />
        </div>
      ) : (
        <div className="mt-2 grid grid-cols-4">
          {Object.entries(monthUsed).map(([key, value], index: number) => {
            if (key !== "TOTAL")
              return (
                <div
                  key={key}
                  className={`${value === 0 ? "opacity-100" : ""} mt-5 text-center`}
                >
                  <p className="text-xs text-gray-500 dark:text-gray-300">
                    {t(`dayOffPage.month`) + " " + (index + 1)}
                  </p>
                  <p
                    className={`mt-1 ${value ? "font-bold" : "text-gray-700"}`}
                  >
                    {value}
                  </p>
                </div>
              );
          })}
        </div>
      )}
    </div>
  );
}
