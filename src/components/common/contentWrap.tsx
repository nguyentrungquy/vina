import * as React from "react";
import styled from "styled-components";

const Styled = styled.div``;

export interface IContentWrapProps {
  className?: string;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}

export default function ContentWrap(props: IContentWrapProps) {
  return (
    <Styled
      // style={{ background: "white" }}
      className={
        "relative flex flex-1 flex-col gap-10 rounded-t-3xl bg-slate-50 duration-300 dark:bg-gray-800 " +
        props.className
      }
    >
      <div className="z-[10] flex flex-1 flex-col gap-4">{props.children}</div>
    </Styled>
  );
}
