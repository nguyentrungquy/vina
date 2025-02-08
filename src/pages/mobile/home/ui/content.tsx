import { Empty } from "antd";
import { useTranslation } from "react-i18next";
import { GoSun } from "react-icons/go";
import { IoMoonOutline } from "react-icons/io5";
import { LuArrowBigUp } from "react-icons/lu";
import SumaryStatistic from "../../../../components/common/Statistic";
import WorkRecord from "../components/workRecord";

export interface IHomeContentProps {
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
  eatBonus: {
    day: number;
    night: number;
    sun: number;
  };
  sunday: {
    day: number;
    night: number;
  };
}

export default function HomeContent({
  dayWorkCount,
  overTime,
  eatBonus,
  sunday,
}: IHomeContentProps) {
  const { t } = useTranslation();
  return (
    <div>
      {dayWorkCount.night + dayWorkCount.day > 0 ? (
        <>
          <div className="content-main grid grid-cols-3 gap-4 py-2">
            <SumaryStatistic title={t("common.day")} value={dayWorkCount.day} />

            <SumaryStatistic
              title={t("common.Night")}
              value={dayWorkCount.night}
              type="primary"
            />
            {dayWorkCount.sun ? (
              <SumaryStatistic
                title={t("common.sun")}
                value={dayWorkCount.sun}
                type="bold"
              />
            ) : null}
            {dayWorkCount.fes ? (
              <SumaryStatistic
                title={t("common.fes")}
                value={dayWorkCount.fes}
                type="danger"
              />
            ) : null}
          </div>
          <div
            className="mt-3 flex flex-col gap-2"
            style={{
              animation:
                "0.5s cubic-bezier(0.22, 0.61, 0.36, 1) 0s 1 normal none running bottomFloatIn",
            }}
          >
            {overTime.night + overTime.day > 0 ? (
              <WorkRecord
                title={t("common.overtime")}
                items={[
                  {
                    label: <GoSun size={16} />,
                    value: Math.round(overTime.day / 6) / 10,
                  },
                  {
                    label: <IoMoonOutline size={16} />,
                    value: Math.round(overTime.night / 6) / 10,
                  },
                  {
                    label: (
                      <p className="mb-0.5 rounded-full border border-solid border-indigo-500 px-1 text-xs text-blue-600">
                        CN
                      </p>
                    ),
                    value: Math.round(overTime.sun / 6) / 10,
                  },
                ]}
              />
            ) : null}

            {eatBonus.night + eatBonus.day > 0 ? (
              <WorkRecord
                title={t("common.eatBonus")}
                items={[
                  {
                    label: <GoSun size={16} />,
                    value: Math.round(eatBonus.day / 6) / 10,
                  },
                  {
                    label: <IoMoonOutline size={16} />,
                    value: Math.round(eatBonus.night / 6) / 10,
                  },
                  {
                    label: (
                      <p className="mb-0.5 rounded-full border border-solid border-indigo-500 px-1 text-xs text-blue-600">
                        CN
                      </p>
                    ),
                    value: Math.round(eatBonus.sun / 6) / 10,
                  },
                ]}
              />
            ) : null}
            {sunday.night + sunday.day + overTime.sun > 0 ? (
              <WorkRecord
                type="bold"
                title={t("common.weekendWork")}
                items={[
                  {
                    label: <GoSun size={16} />,
                    value: sunday.day,
                    prefix: t("common.day"),
                  },
                  {
                    label: <IoMoonOutline size={16} />,
                    value: sunday.night,
                    prefix: t("common.day"),
                  },
                  {
                    label: <LuArrowBigUp size={18} />,
                    value: Math.round(overTime.sun / 6) / 10,
                  },
                ]}
              />
            ) : null}
            {/* Thiếu của ngày lễ làm tương tự như chủ nhật */}
          </div>
        </>
      ) : (
        <Empty description={t("common.noData")} />
      )}
      <div className="content-sub flex"></div>
      <div className="button"></div>
      <div className="h-1"></div>
    </div>
  );
}
