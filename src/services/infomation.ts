import axios from "axios";
import { toast } from "react-toastify";
import { useMobileAppStore } from "../store/mobile.app";
import { useUserInfoStore } from "../store/userinfo";
import { handleLogout } from "../lib/utlis";

export const getUserInfomation = async () => {
  const userData = await axios.post("/api/MPersonalInformationERP", {
    empCode: useMobileAppStore.getState().empCode,
    entCode: useMobileAppStore.getState().entCode,
  });

  if (userData?.data?.Table[0]) {
    useUserInfoStore.getState().setUser({
      ...userData.data.Table[0],
      Photo: userData.data.Table1?.[0].Photo,
    });
    return userData?.data;
  } else {
    toast.error("Failed to get user data");
    handleLogout();
  }
};
