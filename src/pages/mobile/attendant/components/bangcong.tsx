import { useTranslation } from "react-i18next";
import { t } from "i18next";
import { Button, Empty, Modal } from "antd";
import {
  Attendance,
  DateDetail,
  OffDate,
} from "../../../../interface/attendance";
import React from "react";
import { MdNightsStay } from "react-icons/md";
import {
  FES,
  FOOD_BONUS,
  NIGHT_SHIFT,
  NOTFULL,
  OFF_DATE_CODE,
  OVERTIME,
  SUNDAY,
} from "../../../../lib/utlis";

export const AttendanceItem = ({
  item,
  dateDetail,
  setSelectedDate,
}: {
  item: Attendance;
  dateDetail?: DateDetail;
  setSelectedDate: React.Dispatch<React.SetStateAction<string | null>>;
}) => {
  const details = React.useMemo(() => {
    // console.log('object :>> ', object);
    return dateDetail?.[item.DATE] || [];
  }, [item, dateDetail]);

  const isOff = React.useMemo(
    () => details?.some((d) => OFF_DATE_CODE.includes(d.N_DILIG_CD)),
    [details],
  );
  const isNotFull = React.useMemo(
    () => details?.some((d) => NOTFULL.includes(d.N_DILIG_CD)),
    [details],
  );
  const isNightShift = React.useMemo(
    () => details?.some((d) => NIGHT_SHIFT.includes(d.N_DILIG_CD)),
    [details],
  );
  const isSunday = React.useMemo(
    () => details?.some((d) => SUNDAY.includes(d.N_DILIG_CD)),
    [details],
  );
  const isFes = React.useMemo(
    () => details?.some((d) => FES.includes(d.N_DILIG_CD)),
    [details],
  );
  const isOvertime = React.useMemo(
    () => details?.some((d) => OVERTIME.includes(d.N_DILIG_CD)),
    [details],
  );
  const isFoodBonus = React.useMemo(
    () => details?.some((d) => FOOD_BONUS.includes(d.N_DILIG_CD)),
    [details],
  );

  const wordShift = React.useMemo(
    () => (Number(item.STRT_TIME.slice(0, 2)) <= 17 ? "day" : "night"),
    [item.STRT_TIME],
  );
  const endTimeValue = React.useMemo(
    () =>
      Number(item.END_TIME.slice(0, 2)) * 100 +
      Number(item.END_TIME.slice(3, 5)),
    [item.END_TIME],
  );
  const startTimeValue = React.useMemo(
    () =>
      Number(item.STRT_TIME.slice(0, 2)) * 100 +
      Number(item.STRT_TIME.slice(3, 5)),
    [item.STRT_TIME],
  );

  const isLate = React.useMemo(
    () =>
      (wordShift === "day" && startTimeValue > 800) || // 8:00 is time start work
      (wordShift === "night" &&
        (startTimeValue > 2000 || startTimeValue < 500)),
    [wordShift, startTimeValue],
  );
  const isQuitSoon = React.useMemo(
    () =>
      (wordShift === "day" && endTimeValue < 1650) || //17:00 is end of day shift
      (wordShift === "night" && endTimeValue < 450), // 5:00 is end of night shift
    [wordShift, endTimeValue],
  );
  const isOT = React.useMemo(
    () =>
      (wordShift === "day" && endTimeValue > 1750) || //+50 minute for overtime
      (wordShift === "night" && endTimeValue > 550),
    [wordShift, endTimeValue],
  );

  const dateArr = React.useMemo(() => item.DATE.split("-"), [item.DATE]);
  const dateVal = React.useMemo(
    () =>
      Number(dateArr?.[0] || 0 * 500) +
      Number(dateArr?.[1] || 0 * 40) +
      Number(dateArr[2]),
    [dateArr],
  );
  const currentDateArr = React.useMemo(
    () => new Date().toISOString().slice(0, 10).split("-"),
    [],
  );
  const currentDateVal = React.useMemo(
    () =>
      Number(currentDateArr[0]) * 500 +
      Number(currentDateArr[1]) * 40 +
      Number(currentDateArr[2]),
    [currentDateArr],
  );

  if (currentDateVal < dateVal) {
    return null;
  }
  return (
    <tr
      className={`cursor-pointer ${isOff ? "bg-red-200" : ""} ${isOvertime ? "bg-blue-50" : ""} ${isNotFull ? "shadow shadow-red-200" : ""}`}
      onClick={() => setSelectedDate(item.DATE)}
    >
      <td>
        <div className="relative flex items-center justify-center">
          {isNightShift && (
            <div className="absolute -top-2 left-0">
              <MdNightsStay size={10} color="#aaa" />
            </div>
          )}
          <div
            className={`flex items-center gap-0.5 ${item.HOLI_TYPE === "H" ? "text-red-300" : "text-gray-600"} h-6 w-12 justify-center`}
          >
            <p>{item.DATE.slice(5, 7)}</p>
            <p>{"/"} </p>
            <p>{item.DATE.slice(8, 10)} </p>
          </div>
        </div>
      </td>
      <td className="py-2">
        <div className="flex items-center justify-center">
          <div
            className={`text-gray-400 ${item.WEEK_DAY !== "SUN" ? "shadow-sm shadow-blue-200" : "shadow-sm shadow-red-200"} flex h-6 w-12 items-center justify-center rounded-[50%] text-xs font-bold ${item.HOLI_TYPE === "H" ? "text-gray-600" : "text-gray-600"}`}
          >
            {t("date." + item.WEEK_DAY)}
          </div>
        </div>
      </td>

      <td>
        <p className={`${isLate ? "font-medium" : "text-sm text-gray-500"}`}>
          {item.STRT_TIME}
        </p>
      </td>
      <td
        className={`text-center font-medium ${isOT ? "" : isQuitSoon ? "" : "text-sm text-gray-500"}`}
      >
        {item.END_TIME}
      </td>
    </tr>
  );
};

const DateDetailItem = ({ dateDetail }: { dateDetail: OffDate }) => {
  return (
    <tr className={`${dateDetail.N_DILIG_HH < 8 ? "bg-gray-100" : ""}`}>
      <td className="text-center text-sm text-gray-500">
        <div>{dateDetail.DILIG_NM}</div>
      </td>

      <td className="font-medium text-gray-600">
        <div style={{ textAlign: "center" }}>
          <div className={`h-6 w-8 text-center`}>
            {dateDetail.N_DILIG_HH}
            <span className="font-normal text-gray-400"></span>
          </div>
        </div>
      </td>
      <td className="font-medium text-gray-600">
        <div style={{ textAlign: "center" }}>
          <div className={`h-6 w-8 text-center`}>
            {dateDetail.N_DILIG_MM}
            <span className="font-normal text-gray-400"></span>
          </div>
        </div>
      </td>

      <td style={{ textAlign: "center" }}>
        <div>{dateDetail.REMARK}</div>
      </td>
    </tr>
  );
};

export interface IBangCongProps {
  list?: Attendance[];
  dateDetail?: DateDetail;
}

export default function BangCong({ list, dateDetail }: IBangCongProps) {
  const { t } = useTranslation();
  const [selectedDate, setSelectedDate] = React.useState<string | null>(null);
  const attendance = React.useMemo(
    () => list?.find((item) => item.DATE === selectedDate),
    [list, selectedDate],
  );
  const details = React.useMemo(() => {
    if (selectedDate) {
      return dateDetail?.[selectedDate];
    }
    return null;
  }, [selectedDate, dateDetail]);

  if (list?.length === 0) return <Empty description={t("common.noData")} />;
  return (
    <div className="rounded-lg bg-white text-center">
      <Modal
        open={!!selectedDate}
        closeIcon={false}
        onCancel={() => setSelectedDate(null)}
        footer={null}
        title={
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            {selectedDate}
            {!attendance?.END_TIME ? null : (
              <span
                style={{
                  fontWeight: 400,
                  fontSize: "12px",
                  color: "blue",
                }}
              >
                {t("attendantPage.finish")} - {attendance?.END_TIME}
              </span>
            )}
          </div>
        }
      >
        {!details?.length ? (
          <Empty description={t("common.noData")} />
        ) : (
          <table style={{ width: "100%", margin: "0 8px" }}>
            <tbody>
              <tr>
                <th style={{ textAlign: "left" }}>
                  {t("attendantPage.offType")}
                </th>
                <th style={{ textAlign: "center" }}>{t("common.hour")}</th>
                <th style={{ textAlign: "center" }}>{t("common.munite")}</th>
                <th style={{ textAlign: "center" }}>
                  {t("attendantPage.note")}
                </th>
              </tr>
              {details?.map((item, index) => {
                return <DateDetailItem dateDetail={item} key={index} />;
              })}
            </tbody>
          </table>
        )}
        <div style={{ marginTop: "20px" }}>
          <Button
            type="primary"
            size="large"
            block
            onClick={() => setSelectedDate(null)}
          >
            OK
          </Button>
        </div>
      </Modal>
      <table className="w-full text-center">
        <tbody className="w-full">
          <tr
            className="rounded-t-xl text-sm text-gray-700"
            style={{ borderBottom: "1px solid red" }}
          >
            <th className="px-2 py-1.5 font-bold">{t("attendantPage.date")}</th>
            <th className="px-2 py-1.5 font-bold">
              {t("attendantPage.weekday")}
            </th>
            <th className="px-2 py-1.5 font-bold">
              {t("attendantPage.start")}
            </th>
            <th className="px-2 py-1.5 font-bold">
              {t("attendantPage.finish")}
            </th>
          </tr>
          {list &&
            list.map((item, index) => {
              return (
                <AttendanceItem
                  key={index}
                  item={item}
                  dateDetail={dateDetail}
                  setSelectedDate={setSelectedDate}
                />
              );
            })}
        </tbody>
      </table>
    </div>
  );
}
