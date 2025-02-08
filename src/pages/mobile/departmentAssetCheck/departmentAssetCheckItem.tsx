import * as React from "react";
import { FaCheck, FaXmark } from "react-icons/fa6";
import { DepartmentAssetCheckItemType } from "../../../interface/asset";

export interface IAssetCheckItemProps {
  data: DepartmentAssetCheckItemType;
  setSelectedItem: React.Dispatch<
    React.SetStateAction<DepartmentAssetCheckItemType | null>
  >;
}
export default function DepartmentAssetCheckItem({
  data,
  setSelectedItem,
}: IAssetCheckItemProps) {
  const checked = React.useMemo(
    () => data.inspection_yn === "Y",
    [data.inspection_yn],
  );

  const handleItemClick = () => {
    setSelectedItem(data);
  };

  return (
    <>
      <div
        className={`cursor-pointer rounded-lg px-3 py-2 ${checked ? "bg-blue-500 text-white shadow shadow-blue-800" : "bg-gray-100 shadow-inner shadow-gray-200"}`}
        onClick={handleItemClick}
      >
        <div className="relative line-clamp-1 flex gap-1 text-xs font-bold">
          <p>{data.asst_no}</p>
          <p>-</p>
          <p>{data.asset_state}</p>
          <div className="absolute -top-0.5 right-0">
            {checked ? <FaCheck color="#76ff76" /> : <FaXmark color="red" />}
          </div>
        </div>
        <div className="mt-0.5 line-clamp-1 text-xs opacity-80">
          {data.asst_nm}
        </div>
      </div>
    </>
  );
}
