import { Avatar, Dropdown, MenuProps } from "antd";
import * as React from "react";
import { useTranslation } from "react-i18next";
import { useMobileAppStore } from "../../store/mobile.app";

import vnFlag from "../../assets/images/vn-flag.jpg";
import krFlag from "../../assets/images/korean-flag.png";
import cnFlag from "../../assets/images/cn-flag.png";
import enFlag from "../../assets/images/en-flag.jfif";
import { FaEarthAsia } from "react-icons/fa6";

export interface ILanguageChangerProps {}

export default function LanguageChanger(props: ILanguageChangerProps) {
  const [showChangeLang, setChangeLang] = React.useState(false);
  const { language, setLanguage } = useMobileAppStore();
  const { t, i18n } = useTranslation();

  const items: MenuProps["items"] = React.useMemo(() => {
    return [
      {
        key: "1",
        label: (
          <div
            style={{ display: "flex", alignItems: "center", gap: "8px" }}
            onClick={() => setLanguage("vi")}
          >
            <Avatar src={vnFlag} size={"small"}></Avatar>
            <div style={{ fontWeight: "500" }}>Tiếng Việt</div>
          </div>
        ),
      },
      {
        key: "2",
        label: (
          <div
            style={{ display: "flex", alignItems: "center", gap: "8px" }}
            onClick={() => setLanguage("kr")}
          >
            <Avatar src={krFlag} size={"small"}></Avatar>
            <div style={{ fontWeight: "500" }}>한국어</div>
          </div>
        ),
      },
      {
        key: "3",
        label: (
          <div
            style={{ display: "flex", alignItems: "center", gap: "8px" }}
            onClick={() => setLanguage("cn")}
          >
            <Avatar src={cnFlag} size={"small"}></Avatar>
            <div style={{ fontWeight: "500" }}>中文</div>
          </div>
        ),
      },
      {
        key: "4",
        label: (
          <div
            style={{ display: "flex", alignItems: "center", gap: "8px" }}
            onClick={() => setLanguage("en")}
          >
            <Avatar src={enFlag} size={"small"}></Avatar>
            <div style={{ fontWeight: "500" }}>English</div>
          </div>
        ),
      },
    ];
  }, []);

  React.useEffect(() => {
    i18n.changeLanguage(language);
  }, []);

  return (
    <Dropdown
      menu={{ items }}
      placement="bottomLeft"
      className="h-[24px] w-[24px]"
    >
      <div className="flex items-center justify-center">
        <FaEarthAsia size={21} className="text-gray-400" />
        {/* <div
          className="h-8 w-8 rounded-full shadow-inner shadow-gray-900"
          style={{
            background: `url(${languageBG[language]}) center center / cover no-repeat`,
          }}
        ></div> */}
      </div>
    </Dropdown>
  );
}
