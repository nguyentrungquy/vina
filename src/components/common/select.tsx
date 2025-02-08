import { Select } from "antd";
import styled from "styled-components";

export const UnderLineSelect = styled(Select)`
  & .ant-select-selector {
    border: none !important;
    box-shadow: none !important;
    outline: none;
    border-bottom: 1px solid gray !important ;
    border-radius: 0 !important;
  }
`;
