import { create } from "zustand";
import i18n from "../locales/i18n";
import { getRawCookie, handleLogout } from "../lib/utlis";

type Props = {
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
  device: "phone" | "pc";
  setDevice: (type: "phone" | "pc") => void;
  header: string;
  setHeader: (header: string) => void;
  darkmode: boolean;
  setDarkmode: (darkmode: boolean) => void;
  language: string;
  setLanguage: (app: string) => void;
  selectedApp: string;
  setSelectedApp: (app: string) => void;
  empCode: string;
  setEmpCode: (id: string) => void;
  entCode: string;
  setEntCode: (id: string) => void;
  activeTab: string;
  setActiveTab: (activeTab: string) => void;
};

export const useMobileAppStore = create<Props>((set) => {
  const mainInfo = decodeURIComponent(getRawCookie("JHMain") || "");
  if (mainInfo == null || typeof mainInfo == "undefined") return handleLogout();

  const mainInfoArr = mainInfo.split("♪");
  const empCode = mainInfoArr[2] || getRawCookie("EmpCode");
  const entCode = mainInfoArr[0] || getRawCookie("EntCode");

  return {
    isLoading: false,
    setIsLoading: (isLoading) => set({ isLoading }),
    empCode: empCode,
    setEmpCode: (id) => set({ empCode: id }),
    entCode: entCode,
    setEntCode: (id) => set({ entCode: id }),
    device: "phone",
    setDevice: (type) => set({ device: type }),
    header: "",
    setHeader: (header: string) => set({ header }),

    darkmode: false,
    setDarkmode: (darkmode: boolean) =>
      set(() => {
        document.querySelector("html")?.classList.toggle("dark", darkmode);
        return { darkmode };
      }),
    language: localStorage.getItem("language") || "vi",
    setLanguage: (lang: string) =>
      set(() => {
        i18n.changeLanguage(lang);
        localStorage.setItem("language", lang);
        return { language: lang };
      }),
    selectedApp: window.location.pathname.split("/")[1] || "home",
    setSelectedApp: (app: string) => set({ selectedApp: app }),
    activeTab: "wage",
    setActiveTab: (activeTab: string) => set({ activeTab }),
  };
});
