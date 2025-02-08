import { useTranslation } from "react-i18next";
import { DepartmentAssetCheckItemType } from "../../../interface/asset";

const ItemInfo = ({
  title,
  value,
}: {
  title: string;
  value?: string | number;
}) => {
  return (
    <div className="flex items-center justify-between gap-2 py-1.5 text-gray-500">
      <div className="w-1/3">{title}</div>
      <div className="flex-1">
        {value?.toString().replace(/_/g, " ") || "-"}
      </div>
    </div>
  );
};

export function ModelItem({ data }: { data: DepartmentAssetCheckItemType }) {
  const { t } = useTranslation();
  return (
    <div className="text-sm">
      <div className="h-[60vh] overflow-auto px-4">
        <ItemInfo title={t("asset.company")} value={data.company} />
        <ItemInfo title={t("asset.asstNo")} value={data.asst_no} />
        <ItemInfo title={t("asset.asstName")} value={data.asst_nm} />
        {/* <ItemInfo title={t("asset.company")} value={data.v_asst_nm} /> */}
        <ItemInfo title={t("asset.deptCode")} value={data.dept_cd} />
        <ItemInfo title={t("asset.deptName")} value={data.dept_nm} />
        <ItemInfo title={t("asset.acqLocAmt")} value={data.acq_loc_amt} />
        <ItemInfo title={t("asset.resAmt")} value={data.res_amt} />
        <ItemInfo title={t("asset.regDate")} value={data.reg_dt} />
        <ItemInfo title={t("asset.spec")} value={data.spec} />
        <ItemInfo title={t("asset.acctCode")} value={data.acct_cd} />
        <ItemInfo title={t("asset.acctName")} value={data.acct_nm} />
        <ItemInfo title={t("asset.maker")} value={data.maker} />
        <ItemInfo title={t("asset.assetState")} value={data.asset_state} />
        <ItemInfo title={t("asset.setArea")} value={data.setarea} />
        <ItemInfo title={t("asset.sendBpName")} value={data.send_bp_nm} />
        <ItemInfo title={t("asset.projectNo")} value={data.project_no} />
        <ItemInfo title={t("asset.custBpName")} value={data.cust_bp_nm} />
        <ItemInfo title={t("asset.assetType")} value={data.asset_type} />
        <ItemInfo
          title={t("asset.manufacturingDate")}
          value={data.manufacturing_date}
        />
        <ItemInfo title={t("asset.serialNo")} value={data.serial_no} />
        <ItemInfo title={t("asset.cpu")} value={data.cpu} />
        <ItemInfo title={t("asset.ram")} value={data.ram} />
        <ItemInfo title={t("asset.hdd")} value={data.hdd} />
        <ItemInfo title={t("asset.cd")} value={data.cd} />
        <ItemInfo title={t("asset.monitor")} value={data.monitor} />
        <ItemInfo title={t("asset.userCode")} value={data.user_cd} />
        <ItemInfo title={t("asset.userName")} value={data.user_nm} />
        <ItemInfo title={t("asset.macAddress")} value={data.mac_add} />
        {/* <ItemInfo title={t("asset.company")} value={data.inspection_yn} /> */}
      </div>
    </div>
  );
}
