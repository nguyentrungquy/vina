import * as React from "react";
import { Empty, Skeleton } from "antd";

import AssetCheckItem from "./assetCheckItem";
import { AssetCheckType } from "../../../../../interface/asset";

export interface IAssetCheckProps {
  assets?: AssetCheckType[];
  activeCompany: string;
}

export default function AssetCheck(props: IAssetCheckProps) {
  const assets = React.useMemo(() => {
    if (!props.assets) return null;
    if (!props.assets.length) return [];
    return [...props.assets].reverse();
  }, [props.assets]);
  return (
    <div>
      {!assets ? (
        <div className="p-2">
          <Skeleton active />
        </div>
      ) : !assets?.length ? (
        <Empty />
      ) : (
        assets.map((data, index) => {
          if (data.master.company === props.activeCompany)
            return (
              <div key={index} className="p-2">
                <AssetCheckItem data={data} />
              </div>
            );
        })
      )}
    </div>
  );
}
