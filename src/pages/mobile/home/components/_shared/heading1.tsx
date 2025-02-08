import * as React from "react";

export interface IHeading1Props {
  title: string;
  icon?: React.ReactNode;
}

export default function Heading1({ title, icon }: IHeading1Props) {
  return (
    <div className="flex items-center gap-2">
      {icon && <div>{icon}</div>}
      <div className="text-lg font-bold">{title}</div>
    </div>
  );
}
