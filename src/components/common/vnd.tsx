import * as React from "react";
import { numberToCurrency2 } from "../../pages/mobile/wage/utils";

export interface IVNDONGProps {
  value: string | number;
}

export default function VNDONG(props: IVNDONGProps) {
  const value = React.useMemo(() => {
    if (props.value.toString().includes(",")) return props.value.toString();
    return numberToCurrency2(props.value, 3, ",");
  }, [props.value]);
  return (
    <div className="relative pr-2.5">
      <div className="text-right">{value}</div>
      <div className="absolute -top-1 right-0 text-xs">đ</div>
    </div>
  );
}
