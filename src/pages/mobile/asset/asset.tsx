import * as React from "react";
import { useTranslation } from "react-i18next";
import { BsQrCode } from "react-icons/bs";
import { toast } from "react-toastify";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Input } from "antd";

import { AssetCheckType, AssetInfoType } from "../../../interface/asset";
import { getAssetCheck, getAssetInfo } from "../../../services/asset";
import { useMobileAppStore } from "../../../store/mobile.app";
import AssetCheck from "./components/assetCheck";
import AssetInfoModal from "./components/assetModalInfo";
import QrCodeScanner from "./components/qrCodeScanner";

export interface IAssetProps {}

export default function Asset() {
  const { t } = useTranslation();
  const { entCode } = useMobileAppStore();
  const { setHeader, setIsLoading } = useMobileAppStore();
  const [searchText, setSearchText] = React.useState("");
  const [showQRCode, setShowQRCode] = React.useState(false);
  const [assetInfo, setAssetInfo] = React.useState<AssetInfoType | null>(null);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const html = React.useMemo<HTMLHtmlElement | null>(() => {
    return document.querySelector("html");
  }, []);
  const [activeCompany, setActiveCompany] = React.useState<string>(entCode);
  const [selectCompany, setSelectCompany] = React.useState<boolean>(false);

  const assetChecks = useQuery<AssetCheckType[]>({
    queryKey: ["assetChecks"],
    queryFn: () => getAssetCheck(),
  });

  const companyList = React.useMemo(() => {
    const list: string[] = [entCode];
    if (assetChecks.data?.length) {
      assetChecks.data.forEach((item) => {
        if (!list.includes(item.master.company)) {
          list.push(item.master.company);
        }
      });
    }
    return list;
  }, [assetChecks.data]);

  React.useEffect(() => {
    setHeader(t("assetPage.title"));
  }, [t]);

  const { mutate: assetSearch, isPending } = useMutation<
    AssetInfoType[],
    Error,
    string
  >({
    mutationKey: ["assetSearch"],
    mutationFn: async (code) => await getAssetInfo({ code }),
    onSuccess: (data) => {
      if (data[0]) {
        setAssetInfo(data[0]);
        setIsModalOpen(true);
      } else {
        setAssetInfo(null);
        toast.error(t("common.noData"));
      }
    },
    onError: () => {
      toast.error(t("common.badConnect"));
    },
  });

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const onQRCodeClose = (val?: string) => {
    if (val) {
      setSearchText(val);
      assetSearch(val);
    }
    setShowQRCode(false);
  };

  React.useEffect(() => {
    if (html) {
      if (isModalOpen) {
        html.style.maxHeight = "100vh";
        html.style.overflowY = "hidden";
      } else {
        html.style.maxHeight = "unset";
        html.style.overflowY = "unset";
      }
    }
  }, [isModalOpen, html]);

  React.useEffect(() => {
    setIsLoading(isPending);
  }, [isPending]);

  return (
    <div
      className={`relative h-full w-full ${isModalOpen ? "overflow-hidden" : ""}`}
      style={{ height: "calc(100dvh - 60px)" }}
    >
      <div>
        <div className="flex items-start justify-between">
          <div
            onClick={() => setSelectCompany(true)}
            className="ml-2 w-24 rounded-r-full bg-blue-900 px-3 py-1 text-center text-lg text-white"
          >
            {activeCompany}
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (!searchText) return toast.error("Vui lòng nhập dữ liệu");
              assetSearch(searchText);
            }}
          >
            <div className="pr-2">
              <Input
                className="h-8 w-40 rounded px-2 py-0.5 text-base text-gray-800 outline-none"
                placeholder={t("assetPage.assetNo")}
                spellCheck={false}
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                style={{ border: "1px solid #ccc" }}
              />
            </div>
            <div className="mt-1 flex items-center justify-center gap-2 pr-2">
              <button
                type="submit"
                className="flex h-8 flex-1 items-center justify-center rounded-lg border-none bg-blue-800 text-white"
              >
                {t("common.search")}
              </button>
              <div
                className="flex h-8 w-8 items-center justify-center rounded"
                onClick={() => setShowQRCode(true)}
              >
                <BsQrCode size={32} />
              </div>
            </div>
          </form>
        </div>
      </div>

      {showQRCode && <QrCodeScanner onClose={onQRCodeClose} />}
      <AssetInfoModal
        assetInfo={assetInfo}
        setAssetInfo={setAssetInfo}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />

      <div className="mt-4">
        <AssetCheck assets={assetChecks.data} activeCompany={activeCompany} />
      </div>

      {selectCompany && (
        <SelectCompany
          companyList={companyList}
          activeCompany={activeCompany}
          setActiveCompany={setActiveCompany}
          setSelectCompany={setSelectCompany}
        />
      )}
    </div>
  );
}

type SelectCompanyProps = {
  activeCompany: string;
  companyList: string[];
  setActiveCompany: React.Dispatch<React.SetStateAction<string>>;
  setSelectCompany: React.Dispatch<React.SetStateAction<boolean>>;
};
function SelectCompany({
  activeCompany,
  companyList,
  setActiveCompany,
  setSelectCompany,
}: SelectCompanyProps) {
  const selectCompany = (company: string) => {
    // e.stopPropagation()
    setActiveCompany(company);
    // setSelectCompany(false)
  };
  return (
    <div
      className="absolute left-0 top-0 z-50 flex h-full w-full flex-col items-end gap-4 bg-[#000000aa] pt-8"
      onClick={() => setSelectCompany(false)}
    >
      {companyList.map((company, index) => {
        return (
          <div
            onClick={() => {
              selectCompany(company);
              setSelectCompany(false);
            }}
            className={`w-fit min-w-28 rounded-l-full py-2 pl-8 pr-4 text-right text-lg ${activeCompany === company ? "active bg-blue-600 text-white" : "bg-white"}`}
            key={index}
          >
            {company}
          </div>
        );
      })}
    </div>
  );
}

