import axios from "axios";
import { useMobileAppStore } from "../store/mobile.app";
import { toast } from "react-toastify";
import { useUserInfoStore } from "../store/userinfo";

const api = axios.create({
  baseURL: window.location.origin,
});

export const getAssetInfo = async ({ code }: { code: string }) => {
  const res = await api.get(`v2/api/Assets/${code}`);
  return res.data;
};

export const getAssetCheck = async () => {
  const res = await api.get(`v2/api/InspectionMaster/StatusByMaster`);
  return res.data;
};

export const getAssetCheckInfo = async ({
  masterId,
}: {
  masterId?: string;
}) => {
  if (!masterId) return [];
  const res = await api.get(
    `v2/api/InspectionMaster/StatusByMaster/${masterId}`,
  );
  return res.data;
};

export const getAssetCheckDetail = async ({
  masterId,
}: {
  masterId?: string;
}) => {
  if (!masterId) return [];
  const res = await api.get(`v2/api/InspectionMaster/StatusByDept/` + masterId);
  return res.data;
};

export const getDepartmentAssetCheckDetail = async ({
  masterId,
  departmentId,
}: {
  masterId?: string;
  departmentId?: string;
}) => {
  if (!masterId || !departmentId) return [];
  const res = await api.get(
    `v2/api/InspectionDetail/GetDepartmentByMasterAllList/${masterId}/${departmentId}`,
  );
  return res.data;
};

export const getUsers = async ({ query }: { query?: string }) => {
  if (!query) return [];
  const res = await api.get(`/v2/api/Users/UserList`, {
    params: {
      query,
    },
  });
  return res.data;
};

export const updateAsset = async ({
  company,
  asst_no,
  setarea,
  user_cd,
}: {
  company?: string;
  asst_no?: string;
  setarea?: string;
  user_cd?: string;
}) => {
  if (!company || !asst_no || !setarea || !user_cd)
    return toast.error("Fill required field");
  const updt_user = useMobileAppStore.getState().empCode;
  const res = await api.post(`/v2/api/Assets/asstInfoChange`, {
    company,
    asst_no,
    setarea,
    user_cd,
    updt_user,
  });
  return res.data;
};

export const getCheckingAssetInfo = async ({
  masterId,
  assetId,
}: {
  masterId?: string;
  assetId?: string;
}) => {
  if (!masterId || !assetId) return null;
  const res = await api.get(
    `/v2/api/InspectionDetail/GetNoInspectionAllList/${masterId}/${assetId}`,
  );
  if (res.data[0]) return res.data[0];
  return null;
};

export const checkAsset = async ({
  assetInfo,
  // userCode,
  // userName,
}: {
  assetInfo: any;
  // userCode?: string;
  // userName?: string;
}) => {
  if (!assetInfo) {
    toast.error("No data found");
    return;
  }

  if (
    !useUserInfoStore.getState().user?.EMP_NO ||
    !useUserInfoStore.getState().user?.NAME
  ) {
    return toast.error("Please login first");
  }

  const body = {
    ...assetInfo,
    id: 0,
    insertUserId: useUserInfoStore.getState().user?.EMP_NO,
    insertUserName: useUserInfoStore.getState().user?.NAME,
    // insertUserId: userCode,
    // insertUserName: userName,
  };
  try {
    await api.post(`/v2/api/InspectionDetail`, body);
  } catch (error) {
    console.log(error);
  }
};
