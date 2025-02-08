// Loading.js
import React from "react";
import styled, { keyframes } from "styled-components";
import { useMobileAppStore } from "../../../store/mobile.app";

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const fadeIn = keyframes`
  0% { opacity: 0; }
  100% { opacity: 1; }
`;

const LoadingOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`;

const LoadingSpinner = styled.div`
  border: 12px solid #f3f3f3;
  border-top: 12px solid #3498db;
  border-radius: 50%;
  width: 80px;
  height: 80px;
  animation: ${spin} 2s linear infinite;
`;

const LoadingText = styled.div`
  margin-top: 20px;
  font-size: 24px;
  color: #fff;
  animation: ${fadeIn} 1s ease-in-out infinite alternate;
`;

const Loading = () => {
  const { isLoading } = useMobileAppStore();

  if (!isLoading) return null;

  return (
    <LoadingOverlay>
      <LoadingSpinner />
      {/* <LoadingText className="!text-2xl font-bold text-green-400">
        JAHWA
      </LoadingText> */}
    </LoadingOverlay>
  );
};

export default Loading;
