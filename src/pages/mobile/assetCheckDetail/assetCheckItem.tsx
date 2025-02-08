import * as React from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { DepartmentAssetCheckType } from "../../../interface/asset";

export interface IAssetCheckItemProps {
  data: DepartmentAssetCheckType;
}

export default function AssetCheckItem({ data }: IAssetCheckItemProps) {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const completed = React.useMemo(() => {
    return data.completed_count === data.total_count;
  }, [data]);

  const progress = React.useMemo(() => {
    return Math.floor((data.completed_count / data.total_count) * 100);
  }, [data]);
  return (
    <div
      onClick={() => navigate(data.dept_cd)}
      className={`rounded-lg px-3 py-2 ${completed ? "bg-blue-400 text-white" : "bg-gray-100 shadow-inner shadow-gray-300"}`}
    >
      <div className="flex items-center justify-between">
        <div className="line-clamp-1 h-4 text-xs font-bold">{data.dept_nm}</div>
      </div>

      <div className="mt-2 flex items-start gap-3">
        <p
          className={`text-xs ${completed ? "text-gray-100" : "text-gray-400"}`}
        >
          {t("assetPage.progress")}:
        </p>
        <div className="flex-1">
          <div
            className={`relative h-4 w-full overflow-hidden rounded-lg bg-gray-300 ${progress > 50 ? "text-white" : "text-red-500"} `}
          >
            <div
              className="h-full bg-green-400"
              style={{
                width: `${Math.floor((data.completed_count / data.total_count) * 100)}%`,
              }}
            ></div>
            <div className="absolute left-0 top-0 flex h-full w-full items-center justify-center text-xs">
              <p className="text-xs font-medium">{progress + "%"}</p>
            </div>
          </div>
          <div className={`text-center text-xs`}>
            <span className="">{data.completed_count}</span>/
            <span className="font-bold">{data.total_count}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
