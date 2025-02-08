import * as React from "react";
import { useTranslation } from "react-i18next";
import { FaArrowAltCircleRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import { AssetCheckType } from "../../../../../interface/asset";

export interface IAssetCheckItemProps {
  data: AssetCheckType;
}
const Progress = ({
  completed,
  total,
}: {
  completed: number;
  total: number;
}) => {
  const percent = React.useMemo(
    () => Math.floor((completed / total) * 100),
    [completed, total],
  );

  return (
    <p
      className={`text-shadow text-center text-lg font-medium ${percent < 50 ? "text-red-500" : "text-green-500"}`}
    >
      {percent}%
    </p>
  );
};

export default function AssetCheckItem({ data }: IAssetCheckItemProps) {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const isActive = React.useMemo(() => {
    const time = new Date().getTime();
    return (
      new Date(data.master.startDate).getTime() < time &&
      new Date(data.master.endDate).getTime() > time
    );
  }, [data]);
  return (
    <div
      onClick={() => navigate("/asset-check/" + data.master.id)}
      className={`cursor-pointer rounded-xl px-2 text-sm ${isActive ? "bg-blue-800 text-white shadow-md shadow-blue-200 animate-in" : "bg-gray-100 shadow-inner shadow-gray-200"}`}
    >
      <div className="flex h-[72px]">
        <div className="flex h-full w-16 items-center justify-center text-xl font-medium">
          <Progress completed={data.completed_count} total={data.total_count} />
        </div>
        <div className="flex-1">
          <div
            className={`text-sm font-bold ${isActive ? "text-white" : "text-gray-600"}`}
          >
            {data.master.subject}
          </div>
          <div className="mt-2 flex items-center gap-3">
            <p className={`text-xs opacity-75`}>{t("assetPage.progress")}:</p>
            <div className="flex-1 text-black">
              <div className="relative h-4 w-full overflow-hidden rounded-lg bg-gray-300">
                <div
                  className="h-full bg-green-400"
                  style={{
                    width: `${Math.floor((data.completed_count / data.total_count) * 100)}%`,
                  }}
                ></div>
                <div className="absolute left-0 top-0 flex h-full w-full items-center justify-center text-xs">
                  <p>
                    <span className="text-gray-800">
                      {data.completed_count}
                    </span>
                    /<span className="font-bold">{data.total_count}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-2 flex items-center gap-3">
            <p className={`text-xs opacity-75`}>{t("assetPage.duration")}:</p>
            <div className="flex flex-1 items-center gap-2 text-xs">
              <p className="opacity-70">{data.master.startDate.slice(0, 10)}</p>
              <FaArrowAltCircleRight size={12} />
              <p className="font-medium">{data.master.endDate.slice(0, 10)}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
