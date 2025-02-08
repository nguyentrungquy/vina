import { useMutation, useQuery } from "@tanstack/react-query";
import { Empty, Input, Select, Skeleton } from "antd";
import * as React from "react";
import { useTranslation } from "react-i18next";
import { BiSearch } from "react-icons/bi";
import { BsQrCode } from "react-icons/bs";
import { useParams } from "react-router-dom";
import useDebounce from "../../../hooks/useDebounce";
import {
  AssetCheckType,
  DepartmentAssetCheckType,
  ScannedInfoType,
} from "../../../interface/asset";
import {
  getAssetCheckDetail,
  getAssetCheckInfo,
  getCheckingAssetInfo,
} from "../../../services/asset";
import { useMobileAppStore } from "../../../store/mobile.app";
import { useUserInfoStore } from "../../../store/userinfo";
import QrCodeScanner from "../asset/components/qrCodeScanner";
import AssetCheckItem from "./assetCheckItem";
import ScannedInfoDetail from "./scannedInfo";

let timeOut: NodeJS.Timeout;

export default function AssetCheckDetail() {
  const params = useParams();
  const { t } = useTranslation();
  const { setHeader, setIsLoading } = useMobileAppStore();
  const { user } = useUserInfoStore();

  const [showQRCode, setShowQRCode] = React.useState(false);
  const [scannedInfo, setScannedInfo] = React.useState<ScannedInfoType | null>(
    null,
  );

  const masterId = React.useMemo(() => params?.masterId, [params?.masterId]);
  const [searchVal, setSearchVal] = React.useState("");
  const [coolDown, setCoolDown] = React.useState(0);
  const [cooling, setCooling] = React.useState(false);

  const [selectFilter, setSelectFilter] = React.useState<
    "all" | "done" | "notDone"
  >("all");
  const filtVal = useDebounce({ value: searchVal, delay: 500 }) as string;

  const { data: AssetCheckDetail } = useQuery<DepartmentAssetCheckType[]>({
    queryKey: ["AssetCheckDetail", masterId],
    queryFn: () => getAssetCheckDetail({ masterId: masterId }),
  });

  const selectedMasterQuery = useQuery<AssetCheckType[]>({
    queryKey: ["selectedMaster", masterId],
    queryFn: () => getAssetCheckInfo({ masterId }),
  });

  const selectedMaster = React.useMemo(() => {
    return selectedMasterQuery?.data?.[0] || null;
  }, [selectedMasterQuery.data]);

  const active = React.useMemo(() => {
    if (selectedMaster) {
      return (
        new Date(selectedMaster?.master.startDate).getTime() <
          new Date().getTime() &&
        new Date().getTime() < new Date(selectedMaster.master.endDate).getTime()
      );
    }
  }, [selectedMaster]);

  const filtedValue = React.useMemo(() => {
    if (!AssetCheckDetail) return null;
    if (!AssetCheckDetail?.length) return [];
    const list = AssetCheckDetail?.filter((item) => {
      if (
        selectFilter === "done" &&
        item.completed_count !== item.total_count
      ) {
        return false;
      }

      if (
        selectFilter === "notDone" &&
        item.completed_count === item.total_count
      ) {
        return false;
      }

      return (
        item.dept_nm.toUpperCase().includes(filtVal.toUpperCase()) ||
        item.dept_cd.toUpperCase().includes(filtVal.toUpperCase())
      );
    });

    if (list && user?.DEPT_CD) {
      const myItem = list.find((item) => item.dept_cd === user?.DEPT_CD);
      if (myItem) {
        const index = list.indexOf(myItem);
        if (index > 0) {
          list.splice(index, 1);
          list.unshift(myItem);
        }
      }
    }

    return list;
  }, [AssetCheckDetail, filtVal, selectFilter]);

  const { mutate: getAssetInfo, isPending } = useMutation({
    mutationKey: ["getAssetInfo"],
    mutationFn: async (assetId: string) =>
      await getCheckingAssetInfo({ masterId, assetId }),
    onSuccess: (data) => {
      if (data) {
        setScannedInfo(data);
        // checkAssetMutation(data);
      }
    },
  });

  const onQRCodeClose = (val?: string) => {
    if (val) getAssetInfo(val);
    else setShowQRCode(false);
  };

  React.useEffect(() => {
    setHeader(t("assetPage.checkProgress"));
  }, [t]);

  React.useEffect(() => {
    if (cooling || !coolDown) return;
    else {
      setCooling(true);

      timeOut = setInterval(() => {
        setCoolDown((prev) => {
          if (prev <= 1) {
            clearInterval(timeOut);
            setCooling(false);
          }
          return prev - 1 < 0 ? 0 : prev - 1;
        });
      }, 1000);
    }
  }, [coolDown]);

  React.useEffect(() => {
    setIsLoading(isPending);
  }, [isPending]);

  return (
    <div>
      {/* <div onClick={() => setCoolDown(3)} className="bg-red-400 p-2">
        Test cooling
      </div> */}
      {coolDown ? (
        <div className="fixed left-1/2 top-1/2 z-[1001] -translate-x-1/2 -translate-y-1/2 animate-none opacity-30">
          <p className="flex h-32 w-32 items-center justify-center rounded-full bg-black text-7xl text-white">
            {coolDown}
          </p>
        </div>
      ) : null}
      {showQRCode && !scannedInfo && <QrCodeScanner onClose={onQRCodeClose} />}
      <ScannedInfoDetail
        assetInfo={scannedInfo}
        onClose={() => setScannedInfo(null)}
        isOpen={!!scannedInfo}
      />
      {active ? (
        <div
          onClick={() => setShowQRCode(true)}
          className="mx-2 mb-2 flex items-center justify-between rounded-md bg-green-600 px-4 py-3 font-medium text-white shadow-md shadow-green-300 animate-in"
        >
          <p>{t("assetPage.QRScan")}</p>
          <div className="flex h-8 w-8 items-center justify-center rounded">
            <BsQrCode size={32} />
          </div>
        </div>
      ) : null}
      <div className="mb-4 flex justify-between p-2">
        <div className="relative overflow-hidden rounded-full">
          {/* <div className="absolute left-0.5 top-0.5 flex h-[80%] w-10 items-center justify-center rounded-l-full bg-blue-500 shadow-inner shadow-gray-600">
           
          </div> */}
          <Input
            prefix={<BiSearch color="blue" />}
            value={searchVal}
            onChange={(e) => setSearchVal(e.target.value)}
            spellCheck={false}
            className="h-8 rounded-full border-none text-sm text-gray-700 shadow-inner shadow-gray-400 focus:shadow-blue-400 focus:outline-blue-800"
            placeholder={t("assetPage.departmentSearch")}
          />
        </div>
        <div>
          <Select
            className="w-28"
            // defaultValue={"all"}
            value={selectFilter}
            onChange={(val) => setSelectFilter(val)}
          >
            <Select.Option value="all">{t("assetPage.all")}</Select.Option>
            <Select.Option value="done">{t("assetPage.done")}</Select.Option>
            <Select.Option value="notDone">
              {t("assetPage.notDone")}
            </Select.Option>
          </Select>
        </div>
      </div>
      <div>
        {!filtedValue ? (
          <div className="p-2">
            <Skeleton active />
          </div>
        ) : !filtedValue?.length ? (
          <Empty />
        ) : (
          <div className="grid grid-cols-2 gap-x-3 gap-y-4 px-2">
            {filtedValue?.map((item, index) => (
              <div key={index}>
                <AssetCheckItem data={item} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
