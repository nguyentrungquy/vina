import { ClassNames } from "@emotion/react";
import styled from "styled-components";

const CheckBoxWrapper = styled.div`
  .cbx {
    font-size: 10px;
    position: relative;
    top: 0.1em;
    width: 2.4em;
    height: 2.4em;
    border: 0.1em solid #c8ccd4;
    border-radius: 0.3em;
    /* vertical-align: middle; */
    transition: background-color 0.1s ease;
    cursor: pointer;
    /* display: block; */
    display: flex;
    justify-content: center;
    align-items: center;
    &.size-sm {
      font-size: 8px;
    }
    &.size-base {
      font-size: 10px;
    }
    &.size-lg {
      font-size: 12px;
    }
  }

  .cbx:after {
    content: "";
    position: absolute;
    /* top: 0.2em; */
    left: 0.8em;
    width: 0.7em;
    height: 1.4em;
    opacity: 0;
    transform: rotate(45deg) scale(0);
    border-right: 0.2em solid #fff;
    border-bottom: 0.2em solid #fff;
    transition: all 0.3s ease;
    transition-delay: 0.15s;
  }

  .lbl {
    margin-left: 0.5em;
    vertical-align: middle;
    cursor: pointer;
  }

  #cbx:checked ~ .cbx {
    border-color: transparent;
    background: #6871f1;
    animation: jelly 0.6s ease;
  }

  #cbx:checked ~ .cbx:after {
    opacity: 1;
    transform: rotate(45deg) scale(1);
  }

  .cntr {
    position: relative;
  }

  @keyframes jelly {
    from {
      transform: scale(1, 1);
    }

    30% {
      transform: scale(1.25, 0.75);
    }

    40% {
      transform: scale(0.75, 1.25);
    }

    50% {
      transform: scale(1.15, 0.85);
    }

    65% {
      transform: scale(0.95, 1.05);
    }

    75% {
      transform: scale(1.05, 0.95);
    }

    to {
      transform: scale(1, 1);
    }
  }

  .hidden-xs-up {
    display: none !important;
  }
`;

type ChekcBoxProps = {
  checked: boolean;
  onChange: () => void;
  className?: string;
  size?: "sm" | "base" | "lg";
  checkboxId?: string;
  label?: string;
};

export const CheckBox = (props: ChekcBoxProps) => {
  return (
    <CheckBoxWrapper>
      <div className={`cntr`}>
        <input
          checked={props.checked}
          type="checkbox"
          id={props.checkboxId || "cbx"}
          className="hidden-xs-up"
          onChange={props.onChange}
        />

        <label
          htmlFor={props.checkboxId || "cbx"}
          className={`cbx ${props.className || ""} ${props.size ? "size-" + props.size : ""}`}
        ></label>
      </div>
    </CheckBoxWrapper>
  );
};
