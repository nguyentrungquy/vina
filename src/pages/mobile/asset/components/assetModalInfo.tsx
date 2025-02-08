import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { FaSave, FaArrowLeft } from "react-icons/fa";
import { Empty, Input, Select, Skeleton, Tabs } from "antd";
import styled, { keyframes } from "styled-components";
import { useMutation, useQuery } from "@tanstack/react-query";

import useDebounce from "../../../../hooks/useDebounce";
import { getUsers, updateAsset } from "../../../../services/asset";
import { useMobileAppStore } from "../../../../store/mobile.app";
import { AssetInfoType } from "../../../../interface/asset";

const slideIn = keyframes`
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0);
  }
`;

const slideOut = keyframes`
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(100%);
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100dvh;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const ModalContent = styled.div<{ isClosing: boolean }>`
  background: white;
  width: 100%;
  height: 100%;
  animation: ${({ isClosing }) => (isClosing ? slideOut : slideIn)} 0.3s
    forwards;
`;

const Card = styled.div`
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 16px;
  margin-bottom: 16px;
`;

const ItemInfo = ({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) => (
  <div className="flex items-center justify-between gap-2 py-3 text-gray-700">
    <div className="w-1/3 text-sm font-medium text-gray-500">{label}:</div>
    <div className="flex-1">{value}</div>
  </div>
);

const { Option } = Select;

const AssetInfoModal = ({
  assetInfo,
  setAssetInfo,
  isOpen,
  onClose,
}: {
  assetInfo: AssetInfoType | null;
  setAssetInfo: React.Dispatch<React.SetStateAction<AssetInfoType | null>>;
  isOpen: boolean;
  onClose: () => void;
}) => {
  const { t } = useTranslation();
  const { setIsLoading } = useMobileAppStore();
  const [isClosing, setIsClosing] = React.useState(false);
  const [userQuery, setUserQuery] = React.useState("");
  const [place, setPlace] = React.useState<string>("");
  const [selectedUser, setSelectedUser] = React.useState<string>("");
  const userDounce = useDebounce({ value: userQuery });

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      onClose();
    }, 300);
  };

  const { data: users, isLoading } = useQuery({
    queryKey: ["users", userDounce],
    queryFn: async () => await getUsers({ query: userDounce }),
  });

  const { mutate: mUpdateAsset, isPending: isLoading2 } = useMutation({
    mutationKey: ["updateAsset"],
    mutationFn: () => {
      if (!assetInfo) return new Promise(() => toast.error(t("common.noData")));
      //Đã duyệt khiến cho cho assetInfo luôn có dữ liệu

      return updateAsset({
        asst_no: assetInfo.asst_no,
        company: assetInfo.company,
        setarea: place,
        user_cd: selectedUser,
      });
    },
    onSuccess: (data) => {
      if (data[0]) {
        toast.success(t("assetPage.updateSuccess"));
        setAssetInfo({ ...assetInfo, ...data[0] });
      }
    },
    onError: (error) => {
      toast.success(t("assetPage.updateFailed"));
      console.log("update asset Error :>> ", error);
    },
  });

  useEffect(() => {
    assetInfo?.setarea && setPlace(assetInfo.setarea);
    assetInfo?.user_cd && setSelectedUser(assetInfo.user_cd);
  }, [assetInfo]);

  useEffect(() => {
    setIsLoading(isLoading2);
  }, [isLoading2]);

  if (!isOpen) return null;

  return (
    <ModalOverlay className="z-10 h-dvh w-full max-w-[500px] overflow-auto">
      <ModalContent className="flex flex-col py-2" isClosing={isClosing}>
        {/* <div className="fixed inset-0 z-10"> */}
        <div className="absolute inset-0 flex flex-col gap-1 bg-white">
          <div
            className="flex items-center justify-between gap-2 bg-blue-600 p-2 text-white"
            style={{ borderBottom: "1px solid #ddd" }}
          >
            <div className="flex items-center gap-2" onClick={handleClose}>
              <FaArrowLeft size={20} />
              <div className="line-clamp-1 text-lg font-medium">
                {assetInfo?.asst_no || "ID"}
              </div>
              <p className="text-sm text-gray-300">
                {assetInfo?.asst_nm || "Check Asset"}
              </p>
            </div>
            <div className="flex items-center gap-1 text-sm font-medium italic">
              <div className="flex gap-2">
                {assetInfo && (
                  <FaSave
                    className="text-yellow-300"
                    size={24}
                    onClick={() => mUpdateAsset()}
                  />
                )}
              </div>
            </div>
          </div>
          <div className="flex-1 overflow-auto px-2">
            {!assetInfo ? (
              <div>
                <Empty description={t("common.noData")} />
              </div>
            ) : (
              <Tabs
                defaultActiveKey="1"
                className="[&_.ant-tabs-tab]:font-bold [&_.ant-tabs-tab]:text-gray-400"
              >
                <Tabs.TabPane tab={t("assetPage.usedInfo")} key="1">
                  <Card>
                    <ItemInfo
                      label={t("asset.assetState")}
                      value={
                        <div className="font-bold text-gray-700">
                          {assetInfo.asset_state}
                        </div>
                      }
                    />
                    <div className="flex items-center justify-between gap-2 text-gray-700">
                      <div className="w-1/3 py-2 text-sm font-medium text-gray-500">
                        {t("asset.installationPlace")}:
                      </div>
                      <div className="flex-1">
                        <Input
                          className="rounded-none border-none p-0 text-sm font-medium text-blue-600"
                          style={{ borderBottom: "1px solid #2563eb88 " }}
                          value={place}
                          onChange={(e) => setPlace(e.target.value)}
                        />
                      </div>
                    </div>
                    <ItemInfo
                      label={t("asset.user")}
                      value={
                        <Select
                          suffixIcon={null}
                          showSearch
                          className="h-8 w-full rounded-none font-medium !shadow-none !outline-none [&_*]:inset-0 [&_*]:!border-none [&_*]:p-0 [&_.ant-select-selection-placeholder]:text-blue-600"
                          style={{ borderBottom: "1px solid #2563eb88 " }}
                          placeholder={
                            assetInfo.user_cd + " - " + assetInfo.user_nm
                          }
                          onChange={(val) => setSelectedUser(val)}
                          onSearch={(val) => val && setUserQuery(val)}
                          filterOption={false}
                        >
                          {isLoading ? (
                            <Skeleton.Input active />
                          ) : !users?.length ? (
                            ""
                          ) : (
                            users.map(
                              (
                                user: { empCode: string; name: string },
                                index: number,
                              ) => (
                                <Option key={index} value={user.empCode}>
                                  <p className="flex items-center gap-1 text-sm font-medium text-orange-600">
                                    <span>{user.empCode}</span> -{" "}
                                    <span>{user.name}</span>
                                  </p>
                                </Option>
                              ),
                            )
                          )}
                        </Select>
                      }
                    />
                    <ItemInfo
                      label={t("asset.deptCode")}
                      value={
                        <div className="text-gray-700">
                          {assetInfo.dept_cd}
                          {/* <span className="text-sm text-gray-400">
                            {" "}
                            - {assetInfo.dept_nm}
                          </span> */}
                        </div>
                      }
                    />
                    <ItemInfo
                      label={t("asset.deptName")}
                      value={
                        <div className="text-gray-700">{assetInfo.dept_nm}</div>
                      }
                    />
                    <ItemInfo
                      label={t("asset.company")}
                      value={
                        <div className="text-gray-700">{assetInfo.company}</div>
                      }
                    />
                    <ItemInfo
                      label={t("asset.companyName")}
                      value={
                        <div className="text-gray-700">
                          {assetInfo.company_nm}
                        </div>
                      }
                    />
                    <ItemInfo
                      label={t("asset.acctCode")}
                      value={
                        <div className="flex-1 text-gray-700">
                          {assetInfo.acct_cd}
                        </div>
                      }
                    />
                    <ItemInfo
                      label={t("asset.acctName")}
                      value={
                        <div className="flex-1 text-gray-700">
                          {assetInfo.acct_nm}
                        </div>
                      }
                    />
                    <ItemInfo
                      label={t("asset.rentPlace")}
                      value={<div>{assetInfo.send_bp_nm || "-"}</div>}
                    />
                  </Card>
                </Tabs.TabPane>
                <Tabs.TabPane tab={t("assetPage.valueInfo")} key="2">
                  <Card>
                    {/* <div
                      className="flex rounded shadow-inner shadow-gray-400"
                      style={{ border: "1px solid #e7e7e7" }}
                    >
                      <div
                        className=""
                        style={{ borderRight: "1px solid #ddd" }}
                      >
                        <p
                          className="mb-2 py-1 pl-0.5 pr-2 text-center text-[13px] text-gray-500"
                          style={{ borderBottom: "1px solid #ddd" }}
                        >
                          {t("asset.regDate")}
                        </p>
                        <p className="my-2 px-2">
                          {assetInfo?.reg_dt?.slice(0, 10) || "-"}
                        </p>
                      </div>
                      <div className="flex flex-1 flex-col">
                        <p
                          className="mb-2 py-1 pl-0.5 pr-2 text-center text-[13px] text-gray-500"
                          style={{ borderBottom: "1px solid #ddd" }}
                        >
                          {t("asset.custBpName")}
                        </p>
                        <div className="text-center">
                          <p className="line-clamp-3">{assetInfo.cust_bp_nm}</p>
                        </div>
                      </div>
                    </div> */}
                    <ItemInfo
                      label={t("asset.regDate")}
                      value={assetInfo?.reg_dt?.slice(0, 10) || "-"}
                    />
                    <ItemInfo
                      label={t("asset.acqLocAmt")}
                      value={assetInfo.cust_bp_nm || "-"}
                    />
                    <ItemInfo
                      label={t("asset.custBpName")}
                      value={assetInfo.acq_loc_amt || "-"}
                    />
                    <ItemInfo
                      label={t("asset.resAmt")}
                      value={assetInfo.res_amt || "-"}
                    />
                    <ItemInfo
                      label={t("asset.taxFlag")}
                      value={assetInfo.tax_flg || "-"}
                    />
                    <ItemInfo
                      label={t("asset.taxEndDate")}
                      value={assetInfo.tax_end_date || "-"}
                    />
                  </Card>
                </Tabs.TabPane>
                <Tabs.TabPane tab={t("assetPage.assetInfo")} key="3">
                  <Card>
                    <ItemInfo
                      label={t("asset.maker")}
                      value={assetInfo.maker || "-"}
                    />
                    <ItemInfo
                      label={t("asset.manufacturingDate")}
                      value={assetInfo.manufacturing_date || "-"}
                    />
                    <ItemInfo
                      label={t("asset.spec")}
                      value={assetInfo.spec || "-"}
                    />
                    <ItemInfo
                      label={t("asset.serialNo")}
                      value={assetInfo.serial_no || "-"}
                    />
                    <ItemInfo
                      label={t("asset.assetType")}
                      value={assetInfo.asset_type || "-"}
                    />

                    <ItemInfo
                      label={t("asset.projectNo")}
                      value={assetInfo.project_no || "-"}
                    />
                    <ItemInfo
                      label={t("asset.monitor")}
                      value={assetInfo.monitor || "-"}
                    />
                    <ItemInfo
                      label={t("asset.cpu")}
                      value={assetInfo.cpu || "-"}
                    />
                    <ItemInfo
                      label={t("asset.ram")}
                      value={assetInfo.ram || "-"}
                    />
                    <ItemInfo
                      label={t("asset.hdd")}
                      value={assetInfo.hdd || "-"}
                    />
                    <ItemInfo
                      label={t("asset.cd")}
                      value={assetInfo.cd || "-"}
                    />

                    <ItemInfo label="MAC" value={assetInfo.mac_add || "-"} />
                  </Card>
                </Tabs.TabPane>
              </Tabs>
            )}
          </div>
        </div>
        {/* </div> */}
      </ModalContent>
    </ModalOverlay>
  );
};

export default AssetInfoModal;