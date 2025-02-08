import { ClassNames } from "@emotion/react";
import styled from "styled-components";

const ButtonWrapper = styled.div`
  button {
    font-family: inherit;
    font-size: 16px;
    background: royalblue;
    color: white;
    padding: 0.7em 1.2em;
    padding-left: 0.9em;
    display: flex;
    align-items: center;
    border: none;
    border-radius: 2px;
    overflow: hidden;
    transition: all 0.2s;
    justify-content: center;
    cursor: pointer;

    &.size-sm {
      font-size: 12px;
    }
    &.size-base {
      font-size: 16px;
    }
    &.size-lg {
      font-size: 20px;
    }
  }

  button span {
    display: block;
    margin-left: 0.3em;
    transition: all 0.3s ease-in-out;
  }

  button svg {
    display: block;
    margin-right: 0.4rem;
    transform-origin: center center;
    transition: transform 0.3s ease-in-out;
  }

  button:active {
    transform: scale(0.95);
  }
`;

type ChekcBoxProps = {
  onChange?: () => void;
  className?: string;
  size?: "sm" | "base" | "lg";
  title: string;
  icon?: React.ReactNode;
  disabled?: boolean;
  type: "button" | "reset" | "submit";
};

export const Button = (props: ChekcBoxProps) => {
  return (
    <ButtonWrapper>
      <button
        disabled={props.disabled}
        type={props.type}
        className={`${props.size ? "size-" + props.size : ""} ${props.className || ""}`}
      >
        <div className="svg-wrapper-1">
          <div className="svg-wrapper">{props.icon}</div>
        </div>
        <span>{props.title}</span>
      </button>
    </ButtonWrapper>
  );
};
