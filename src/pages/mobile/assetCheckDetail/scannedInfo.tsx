import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { FaArrowLeft } from "react-icons/fa6";
import { toast } from "react-toastify";
import { useMutation, useQuery } from "@tanstack/react-query";
import styled, { keyframes } from "styled-components";
import { Button, Card, Input, Select, Skeleton, Tabs } from "antd";

import useDebounce from "../../../hooks/useDebounce";
import { checkAsset, getUsers, updateAsset } from "../../../services/asset";
import { useMobileAppStore } from "../../../store/mobile.app";
import { ScannedInfoType } from "../../../interface/asset";

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

const ScannedInfoModal = ({
  assetInfo,
  isOpen,
  onClose,
}: {
  assetInfo: ScannedInfoType | null;
  isOpen: boolean;
  onClose: () => void;
}) => {
  const { t } = useTranslation();
  const [isClosing, setIsClosing] = React.useState(false);
  const [userQuery, setUserQuery] = React.useState("");
  const { setIsLoading } = useMobileAppStore();
  const [place, setPlace] = React.useState<string>("");
  const [selectedUser, setSelectedUser] = React.useState<{
    code: string;
    name: string;
  }>({ code: assetInfo?.user_cd || "", name: assetInfo?.user_nm || "" });
  const [isInfoChange, setIsInfoChange] = useState(false);
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

  const { mutate: mUpdateAsset, isPending: isPending2 } = useMutation({
    mutationKey: ["updateAsset"],
    mutationFn: () => {
      return updateAsset({
        asst_no: assetInfo?.asst_no,
        company: assetInfo?.company,
        setarea: place,
        user_cd: selectedUser.code,
      });
    },
    onSuccess: (data) => {
      if (data[0]) {
        // toast.success("Cập nhật thành công"); //hạn chế toast 2 lần
        // setAssetInfo({ ...assetInfo, ...data[0] });
      }
    },
    onError: () => {
      toast.success(t("assetPage.updateFail"));
    },
  });

  const { mutate: checkAssetMutation, isPending } = useMutation({
    mutationKey: ["checkAsset"],
    mutationFn: async () =>
      await checkAsset({
        assetInfo: {
          ...assetInfo,
          setarea: place,
          user_cd: selectedUser.code,
          user_nm: selectedUser.name,
        },
      }),
    onSuccess: async () => {
      toast.success(t("assetPage.checkSuccess"));
      if (isInfoChange) {
        await mUpdateAsset();
      }
      handleClose();
    },

    onError: () => {
      toast.error(t("assetPage.checkFail"));
    },
  });

  useEffect(() => {
    assetInfo?.setarea && setPlace(assetInfo.setarea);
    assetInfo?.user_cd &&
      setSelectedUser({ code: assetInfo.user_cd, name: assetInfo.user_nm });
  }, [assetInfo]);

  useEffect(() => {
    const changed =
      place !== assetInfo?.setarea ||
      selectedUser.code !== assetInfo.user_cd ||
      selectedUser.name !== assetInfo.user_nm;
    if (changed !== isInfoChange) setIsInfoChange(changed);
  }, [place, selectedUser]);

  useEffect(() => {
    setIsLoading(isPending || isPending2);
  }, [isPending, isPending2]);
  if (!isOpen) return null;

  return (
    <ModalOverlay className="z-10 h-dvh w-full max-w-[500px] overflow-auto">
      <ModalContent className="flex flex-col py-2" isClosing={isClosing}>
        {/* <div className="fixed inset-0 z-10"> */}
        <div
          className="absolute inset-0 flex flex-col gap-1 bg-white"
          // style={{ maxHeight: "80vh" }}
        >
          <div
            className="flex items-center justify-between gap-2 bg-blue-600 p-2 text-white"
            style={{ borderBottom: "1px solid #ddd" }}
          >
            <div className="flex items-center gap-2" onClick={handleClose}>
              <FaArrowLeft size={20} />
              <div className="line-clamp-1 text-lg font-medium">
                {assetInfo?.asst_no || "-"}
              </div>
              <p className="text-sm text-gray-300">
                {assetInfo?.asst_nm || "No data"}
              </p>
            </div>
            <div className="flex items-center gap-1 text-sm font-medium italic">
              <div className="flex gap-2">
                {!assetInfo ? null : assetInfo.insertUserId ? null : (
                  <Button onClick={() => checkAssetMutation()}>
                    {isInfoChange
                      ? t("assetPage.saveAndInspect")
                      : t("assetPage.inspect")}
                  </Button>
                )}
                {/* <FaSave
                    className="text-yellow-300"
                    size={24}
                    onClick={() => mUpdateAsset()}
                  /> */}
              </div>
            </div>
          </div>
          {!assetInfo ? null : (
            <div className="flex-1 overflow-auto px-2">
              <Tabs
                defaultActiveKey="1"
                className="[&_.ant-tabs-tab]:font-bold [&_.ant-tabs-tab]:text-gray-400"
              >
                <Tabs.TabPane tab={t("assetPage.usedInfo")} key="1">
                  <Card>
                    <div
                      className={`text-xl font-bold ${assetInfo.insertUserId ? "font-medium text-blue-500" : "text-gray-400"}`}
                    >
                      {assetInfo.insertUserId
                        ? t("assetPage.checked")
                        : t("assetPage.notChecked")}
                    </div>
                    {/* <ItemInfo
                        label={t("asset.isInspection")}
                        value={
                          <div
                            className={`font-bold ${assetInfo.insertUserId ? "font-medium text-blue-500" : "text-gray-400"}`}
                          >
                            {assetInfo.insertUserId
                              ? t("assetPage.checked")
                              : t("assetPage.notChecked")}
                          </div>
                        }
                      /> */}
                    {assetInfo.insertUserId ? (
                      <ItemInfo
                        label={t("assetPage.inspector")}
                        value={
                          <div className="text-xs text-gray-700">
                            {`${assetInfo.insertUserId} - (${assetInfo.insertUserName})`}
                          </div>
                        }
                      />
                    ) : null}

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
                          onChange={(val) => setSelectedUser(JSON.parse(val))}
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
                                <Option
                                  key={index}
                                  value={JSON.stringify({
                                    code: user.empCode,
                                    name: user.name,
                                  })}
                                >
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
            </div>
          )}
        </div>
      </ModalContent>
    </ModalOverlay>
  );
};

export default ScannedInfoModal;
