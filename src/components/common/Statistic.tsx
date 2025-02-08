import * as React from "react";

export interface IStatisticProps {
  title: string;
  value: string | number;
  type?: "outline" | "primary" | "bold" | "danger";
  className?: string;
}

const styleDefine = {
  outline:
    "border border-solid border-blue-600 bg-white text-blue-600 shadow-blue-500",
  primary: "bg-blue-600 text-white shadow-indigo-500 ",
  bold: "bg-indigo-900 text-white shadow-gray-500",
  danger: "bg-pink-400 text-white shadow-rose-300",
};

export default function SumaryStatistic(props: IStatisticProps) {
  const style = React.useMemo(
    () => styleDefine[props.type || "outline"],
    [props.type],
  );

  return (
    <div
      className={`item rounded-2xl px-4 py-3 shadow ${style} ${props.className || ""}`}
      style={{
        animation:
          "0.5s cubic-bezier(0.22, 0.61, 0.36, 1) 0s 1 normal none running rightFloatIn",
      }}
    >
      <p className="text-sm">{props.title}</p>
      <p className="p-2 pb-0 text-center text-2xl font-medium">{props.value}</p>
    </div>
  );
}
