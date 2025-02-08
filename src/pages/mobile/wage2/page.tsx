import { useQuery } from "@tanstack/react-query";
import { Empty, Skeleton } from "antd";
import * as React from "react";
import { useTranslation } from "react-i18next";
import { FaCodeBranch } from "react-icons/fa";
import { HiCash } from "react-icons/hi";
import { LuCalendarClock } from "react-icons/lu";
import { MdCalendarMonth, MdOutlineCreditCardOff } from "react-icons/md";
import { useMobileAppStore } from "../../../store/mobile.app";
// import { getWageMonth } from "../wage-1/utils";
import { getWageDetail, getWageTime, getWageType } from "../../../services/wage";
import { WorkData, WorkMonth, WorkType } from "./interface";

export default function WagePage2() {
  const { setHeader } = useMobileAppStore();
  const { t } = useTranslation();

  const [wageType, setWageType] = React.useState("1");
  const [prevMonth] = React.useState(() => {
    const month = new Date().getMonth();
    if (!month) return (new Date().getFullYear() - 1).toString() + "12";
    return (
      new Date().getFullYear().toString() + month.toString().padStart(2, "0")
    );
  });
  const [wageMonth, setWageMonth] = React.useState(() => {
    const month = new Date().getMonth();
    if (!month) return (new Date().getFullYear() - 1).toString() + "12";
    return (
      new Date().getFullYear().toString() + month.toString().padStart(2, "0")
    );
  });

  const wageMonths = useQuery<WorkMonth>({
    queryKey: ["wageMonths"],
    queryFn: () => getWageTime(),
  });
  const wageTypes = useQuery<WorkType>({
    queryKey: ["wageTypes", wageMonth],
    queryFn: () => getWageType({ thang: wageMonth }),
  });
  const wageDetail = useQuery<WorkData | null>({
    queryKey: ["wageDetail", wageMonth, wageType, wageMonths.data],
    queryFn: () => {
      if (!wageMonths.data?.Table?.[0]?.Code || !wageMonth) return null;
      if (Number(wageMonths.data?.Table?.[0].Code) < Number(wageMonth))
        return null;
      return getWageDetail({ wageMonth, wageType });
    },
  });

  React.useEffect(() => {
    if (
      wageMonths.data?.Table?.[0].Code &&
      Number(wageMonths.data?.Table?.[0].Code) < Number(wageMonth)
    )
      setWageMonth(wageMonths.data?.Table?.[0].Code);
  }, [wageMonth, wageMonths.data]);

  React.useEffect(() => {
    setHeader(t("wagePage.title"));
  }, [t]);

  return (
    <>
      <div className="w-full">
        <div>
          <div className="px-4">
            <div className="rounded-xl bg-white p-2 shadow-inner shadow-gray-800">
              <div className="flex items-end gap-4"></div>
              <div className="flex items-center justify-between">
                <div className="flex h-10 items-center justify-start gap-2">
                  {/* <p className="w-12">{t("wagePage.payRollMonth")}:</p> */}
                  <LuCalendarClock size={24} className="text-gray-500" />
                  {!wageMonths?.data?.Table ? (
                    <Skeleton.Button active />
                  ) : (
                    <select
                      className="h-7 w-24 border-none px-1 font-bold text-gray-600 shadow-none outline-none duration-200"
                      value={wageMonth}
                      onChange={(event) => setWageMonth(event.target.value)}
                    >
                      {Number(prevMonth) >
                      Number(wageMonths?.data?.Table?.[0]) ? (
                        <option
                          key={prevMonth}
                          value={prevMonth}
                          className="pl-2 text-sm font-medium text-gray-700"
                        >
                          {prevMonth}
                        </option>
                      ) : null}
                      {wageMonths?.data?.Table?.map((item, viTri) => {
                        return (
                          <option
                            key={viTri}
                            value={item.Code}
                            className="pl-2 text-sm font-medium text-gray-700"
                          >
                            {item.Name}
                          </option>
                        );
                      })}
                    </select>
                  )}
                </div>
                <div className="flex h-10 items-center gap-2">
                  <FaCodeBranch size={24} className="text-gray-500" />
                  {!wageTypes.data?.Table ? (
                    <Skeleton.Button active />
                  ) : (
                    <select
                      className="h-7 w-32 border-none px-1 font-bold text-gray-600 shadow-none outline-none duration-200"
                      value={wageType}
                      onChange={(event) => setWageType(event.target.value)}
                    >
                      {wageTypes.data?.Table?.map((item, viTri) => {
                        return (
                          <option
                            key={viTri}
                            value={item.Code}
                            className="text-sm text-gray-700"
                          >
                            {item.Name}
                          </option>
                        );
                      })}
                    </select>
                  )}
                </div>
              </div>
            </div>
          </div>

          {wageDetail.isLoading ? (
            <div className="mt-2">
              <div className="mt-4 rounded-xl bg-white px-4">
                <Skeleton active />
                <Skeleton className="mt-2" active />
              </div>
            </div>
          ) : !wageDetail?.data?.Table?.length ? (
            <div className="mt-8 flex h-full flex-1 flex-col items-center justify-center rounded-lg pb-6 pt-4">
              <Empty description={t("common.noData")} />
            </div>
          ) : (
            <>
              <div className="mt-2">
                <div className="rounded-xl bg-white p-2">
                  <div className="ml-2 flex items-center gap-2 py-1">
                    <HiCash size={24} className="mt-[1px]" />
                    <p className="font-bold text-gray-900">
                      {t("wagePage.payRollDetail")}
                    </p>
                  </div>
                  <div className="ml-3 bg-white pt-2 text-gray-500">
                    <table className="w-full px-2">
                      <tbody>
                        {wageDetail?.data?.Table?.map((luong, vitri) => (
                          <tr key={vitri}>
                            <td
                              // style={{ borderBottom: "1px solid #eaeaea" }}
                              className="py-1.5 text-gray-500"
                            >
                              {t("wage." + luong.ALLOW_CD)}
                            </td>
                            <td
                              // style={{ borderBottom: "1px solid #eaeaea" }}
                              className="text-right text-gray-500"
                            >
                              {luong.ALLOW}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              <div className="mt-2">
                <div className="rounded-xl bg-white p-2">
                  <div className="ml-2 flex items-center gap-2 py-1">
                    <MdCalendarMonth size={24} className="mt-[1px]" />
                    <p className="font-bold text-gray-900">
                      {t("wagePage.timeCheckDetail")}
                    </p>
                  </div>
                  <div className="rounded-md"></div>
                  <div className="ml-3 bg-white pb-2 pt-2">
                    <table className="w-full px-2">
                      <tbody className="">
                        <tr className="border-b text-sm font-medium text-blue-500">
                          <td></td>
                          <td className="pl-2 text-center">
                            {t("common.times")}
                          </td>
                          <td className="pl-2 text-right">
                            {t("common.hour")}
                          </td>
                        </tr>
                        {wageDetail?.data?.Table1?.map((item, vitri) => {
                          return (
                            <tr key={vitri}>
                              <td className="py-1.5 text-gray-500">
                                {t("deduct." + item.DILIG_CD)}
                              </td>
                              <td className="text-center text-gray-500">
                                {item.DILIG_CNT}
                              </td>
                              <td className="text-right text-gray-500">
                                {item.DILIG_HH ? item.DILIG_HH + ":" : ""}
                                {item.DILIG_MM.toString().padStart(2, "0")}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              <div className="mt-2">
                <div className="rounded-xl bg-white p-2">
                  <div className="ml-2 flex items-center gap-2 py-1">
                    <MdOutlineCreditCardOff size={24} className="mt-[1px]" />
                    <p className="font-bold text-gray-900">
                      {t("wagePage.deductDetail")}
                    </p>
                  </div>
                  <div className="rounded-md"></div>
                  <div className="ml-3 rounded-md bg-white pt-2">
                    <table className="w-full">
                      <tbody className="">
                        {wageDetail?.data?.Table2?.map((item, vitri) => {
                          return (
                            <tr key={vitri}>
                              <td className="py-1.5 text-gray-500">
                                {t("wage." + item.SUB_CD)}
                              </td>
                              <td className="text-right text-gray-500">
                                {item.SUB_AMT}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              <div className="mt-2" style={{ borderTop: "1px solid #eaeaea" }}>
                <div className="rounded-xl bg-white p-2">
                  <div className="rounded-md"></div>
                  <div className="ml-3 rounded-md bg-white pb-4 pt-2">
                    <table className="w-full font-normal">
                      <tbody>
                        <tr>
                          <td className="pt-0.5 font-medium uppercase text-gray-700">
                            {t("common.totalPay")}
                          </td>
                          <td className="pt-0.5 text-right">
                            {wageDetail?.data?.Table3?.[0]?.PROV_TOT_AMT}
                          </td>
                        </tr>
                        <tr>
                          <td className="pt-1 font-medium uppercase text-gray-700">
                            {t("common.totalDeduct")}
                          </td>
                          <td className="pt-1 text-right">
                            {wageDetail?.data?.Table3?.[0]?.SUB_TOT_AMT}
                          </td>
                        </tr>
                        <tr>
                          <td className="pt-1 font-medium uppercase text-gray-700">
                            {t("common.totalPayment")}
                          </td>
                          <td className="pt-1 text-right font-bold">
                            {wageDetail?.data?.Table3?.[0]?.REAL_PROV_AMT}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
