import { useTranslation } from "react-i18next";
import { Skeleton } from "antd";

import { OffInfo } from "../../../../interface/attendance";

export interface ILeaveDetailProps {
  leaveInfo?: OffInfo;
}

const LeaveItem = ({ title, content }: { title: string; content: number }) => {
  return (
    <div
      className={`${!content ? "opacity-100" : content < 0 ? "text-red-500" : ""} h-9`}
    >
      <div className="flex items-center justify-between">
        <p className="text-gray-600">{title}</p>
        <p className={`${content ? "font-medium" : ""}`}>{content}</p>
      </div>
    </div>
  );
};

export default function LeaveDetail({ leaveInfo }: ILeaveDetailProps) {
  const { t } = useTranslation();
  return (
    <div>
      {!leaveInfo ? (
        <div>
          <Skeleton active />
        </div>
      ) : (
        <div>
          <LeaveItem
            title={t("dayOffPage.lastYearP")}
            content={leaveInfo.YEAR_PART}
          />
          <LeaveItem
            title={t("dayOffPage.thisYearP")}
            content={leaveInfo.YEAR_SAVE}
          />
          <LeaveItem
            title={t("dayOffPage.XRAYP")}
            content={leaveInfo.YEAR_XRAY}
          />
          <LeaveItem
            title={t("dayOffPage.totalP")}
            content={leaveInfo.YEAR_SAVE_TOT}
          />
          <LeaveItem
            title={t("dayOffPage.leaveUsed")}
            content={leaveInfo.USE_CNT}
          />
          <LeaveItem
            title={t("dayOffPage.remain")}
            content={leaveInfo.MAX_YEAR_CNT}
          />
        </div>
      )}
    </div>
  );
}
