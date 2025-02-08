import * as React from "react";
import { Empty, Skeleton } from "antd";
import { useTranslation } from "react-i18next";
import { WorkData } from "../../../wage2/interface";

const WageItem = ({
  title,
  value,
  isBold,
}: {
  title: React.ReactNode;
  value: React.ReactNode;
  isBold?: boolean;
}) => {
  return (
    <div
      className={`flex items-center justify-between gap-2 py-1.5 text-gray-500 ${isBold ? "font-bold !text-gray-500" : ""}`}
    >
      <div>{title}</div>
      <div>{value}</div>
    </div>
  );
};

export interface IWageProps {
  wage?: WorkData | null;
}

export default function Wage({ wage }: IWageProps) {
  const { t } = useTranslation();

  return (
    <div className="rounded-xl bg-white p-2">
      <div className="flex items-center gap-2"></div>
      <div className="px-2">
        {wage === undefined ? (
          <Skeleton active />
        ) : !wage || !wage?.Table3?.length ? (
          <Empty className="!animate-none" description={t("common.noData")} />
        ) : (
          <>
            <WageItem
              title={t("common.totalPay")}
              value={wage.Table3?.[0]?.PROV_TOT_AMT}
            />
            <WageItem
              title={t("common.totalDeduct")}
              value={wage.Table3?.[0]?.SUB_TOT_AMT}
            />
            <WageItem
              isBold
              title={<p className="font-bold">{t("common.totalPayment")}</p>}
              value={wage.Table3?.[0]?.REAL_PROV_AMT}
            />
          </>
        )}
      </div>
    </div>
  );
}
