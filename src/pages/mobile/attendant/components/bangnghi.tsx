import * as React from "react";
import { useTranslation } from "react-i18next";
import { Empty } from "antd";
import { OffDate } from "../../../../interface/attendance";

export interface IBangNghiProps {
  list: OffDate[];
}

export const DayOffItem = (props: { item: OffDate }) => {
  const { item } = props;
  return (
    <tr className={`${item.N_DILIG_HH < 8 ? "bg-gray-100" : ""}`}>
      <td className="py-2 text-sm">
        <div className={`h-6 text-left text-base text-gray-600`}>
          <span>{item.DILIG_DT.slice(5, 7)}</span>
          <span>/</span>
          <span>{item.DILIG_DT.slice(8, 10)}</span>
        </div>
      </td>

      <td className="font-medium text-gray-600">
        <div className="flex items-center justify-center">
          <div className={`h-6 w-8 text-center`}>
            {item.N_DILIG_HH}
            <span className="font-normal text-gray-400"></span>
          </div>
        </div>
      </td>

      <td className="text-center text-sm text-gray-500">
        <div>{item.DILIG_NM}</div>
      </td>
      <td className="text-center text-sm text-gray-500">
        <div>{item.REMARK}</div>
      </td>
    </tr>
  );
};

export default function BangNghi({ list }: IBangNghiProps) {
  const { t } = useTranslation();
  if (list?.length === 0)
    return (
      <div>
        <Empty className="" description={t("common.noData")} />
      </div>
    );
  return (
    <div className="rounded-lg bg-white text-center">
      <table className="w-full text-center">
        <tbody className="w-full">
          <tr
            className="rounded-t-xl text-gray-500"
            style={{ borderBottom: "1px solid red" }}
          >
            <th className="py-1.5 text-start text-sm">
              {t("attendantPage.date")}
            </th>
            <th className="font-font px-2 py-1.5 text-sm">
              {t("attendantPage.hour")}
            </th>
            <th className="font-font px-2 py-1.5 text-sm">
              {t("attendantPage.offType")}
            </th>
            <th className="font-font px-2 py-1.5 text-sm">
              {t("attendantPage.note")}
            </th>
          </tr>
          {list?.length &&
            list.map((item, index) => {
              return <DayOffItem key={index} item={item} />;
            })}
        </tbody>
      </table>
    </div>
  );
}
