import * as React from "react";
import { useTranslation } from "react-i18next";
import VietnameseDate from "vietnamese-date";
import { WorkTime } from "../interface";
import { HeaderNew } from "../../../../components/mobile/header";

export interface IHomeHeaderProps {
  workTime: WorkTime;
  dayWorkCount: {
    day: number;
    night: number;
    sun: number;
    dayOff: number;
    fes: number;
  };
  overTime: {
    day: number;
    night: number;
    sun: number;
  };
}

export default function HomeHeader({
  dayWorkCount,
  overTime,
  workTime,
}: IHomeHeaderProps) {
  const { t } = useTranslation();
  const lunarDate = React.useMemo(() => {
    return new VietnameseDate(new Date());
  }, []);

  return (
    <div>
      <div className="header h-[140px] rounded-b-xl bg-gradient-to-r from-indigo-600 via-indigo-700 to-indigo-900 px-3 py-2 shadow-md shadow-indigo-700">
        <HeaderNew title={t("common.monthReport")} />
      </div>
      <div className="content -mt-20 flex-1 px-4">
        <div
          className="panel h-[180px] rounded-3xl bg-white px-[18px] py-[12px] shadow-sm shadow-blue-800"
          style={{
            animation:
              "0.3s cubic-bezier(0.22, 0.61, 0.36, 1) 0s 1 normal none running topFloatIn",
          }}
        >
          <div className="main-panel flex h-2/3 items-center justify-center gap-6">
            <div className="flex w-32 flex-col gap-1 text-center shadow shadow-black">
              <div className="bg-indigo-600 py-0.5 text-xs text-white">
                {new Date().getDay() === 0 ? (
                  "Chủ nhật"
                ) : (
                  <div>{t("common.day" + new Date().getDay())}</div>
                )}
              </div>
              <div
                className={`text-4xl font-medium ${new Date().getDay() === 0 ? "text-white" : new Date().getDay() === 6 ? "text-[#e0793d]" : "text-gray-800"}`}
              >
                {new Date().getDate()}
              </div>
              <div className="py-0.5 text-xs font-light">
                {t("common.month")} {new Date().getMonth() + 1}
              </div>
            </div>
            <div className="">
              <p className="calendar text-base font-medium text-gray-700">
                <span className="text-xs font-normal">
                  {t("common.lunarDate")}:
                </span>{" "}
                {lunarDate.day} - {lunarDate.month}
                <span className="pl-1 text-gray-500">
                  {" "}
                  {lunarDate.celestialStemOfYear}{" "}
                  {lunarDate.terrestrialBranchOfYear}
                </span>
              </p>
              <p className="pt-2 text-xs font-light">
                <span className="text-sm font-medium text-blue-600">
                  {t("common.Hour")} hoàng đạo:{" "}
                </span>{" "}
                {lunarDate.propitiousHours}
              </p>
            </div>
          </div>
          <div className="pt-2">
            <div className="panel-content flex items-center justify-between text-indigo-300">
              <div className="item">
                <p className="pb-1 font-mono text-xs">{t("common.dayCount")}</p>
                <p className="text-center text-lg text-black">
                  {Number(dayWorkCount.day + dayWorkCount.night)}
                </p>
              </div>
              <div className="item">
                <p className="pb-1 font-mono text-xs">
                  {t("common.hourCount")}
                </p>
                <p className="text-center text-lg text-black">
                  {Number(workTime.wk_time)}
                </p>
              </div>
              <div className="item">
                <p className="pb-1 font-mono text-xs">
                  {t("common.overTimeCount")}
                </p>
                <p className="text-center text-lg text-black">
                  {Math.round(((overTime.day + overTime.night) * 10) / 60) /
                    10 +
                    " " +
                    t("common.Hour")}
                </p>
              </div>
              <div className="item">
                <p className="pb-1 font-mono text-xs">
                  {t("common.offDayLeft")}
                </p>
                <p className="text-center text-lg text-black">0</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
