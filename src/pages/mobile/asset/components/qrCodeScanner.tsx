import * as React from "react";
import { Scanner } from "@yudiel/react-qr-scanner";
import styled from "styled-components";
import { IoMdCloseCircle } from "react-icons/io";

export interface IQrCodeScannerProps {
  pause?: number | boolean;
  onClose: (code?: string) => void;
}

const StyledScanner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0;
  padding: 0;
  video {
    position: fixed;
    inset: 0;
    height: 100vh;
    width: 100vw;
    object-fit: cover;
  }

  & > div > div > div {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    svg {
      margin-bottom: 25vh;
    }
    & > div > svg {
      height: 60vw;
      width: 60vw;
      border: none !important;
      & > path {
        stroke: #a1a1a1;
        stroke-width: 4;
      }
    }
  }
`;

export default function QrCodeScanner(props: IQrCodeScannerProps) {
  const pause = React.useMemo(() => props.pause, [props.pause]);
  // const [flashOn, setFlashOn] = React.useState<boolean>(false);
  // const [videoTrack, setVideoTrack] = React.useState<MediaStreamTrack | null>(
  //   null,
  // );
  // const [facingMode, setFacingMode] = React.useState<string>("environment");

  const scan = (result) => {
    if (result[0]?.rawValue) {
      props.onClose(result[0]?.rawValue);
    }
  };

  // const toggleFlash = () => {
  //   if (videoTrack) {
  //     const constraints = {
  //       advanced: [{ torch: !flashOn }],
  //     };
  //     videoTrack.applyConstraints(constraints);
  //     setFlashOn(!flashOn);
  //   }
  // };

  // React.useEffect(() => {
  //   const constraints = {
  //     video: {
  //       facingMode: { exact: facingMode },
  //     },
  //   };

  //   navigator.mediaDevices
  //     .getUserMedia(constraints)
  //     .then((stream) => {
  //       const track = stream.getVideoTracks()[0];
  //       setVideoTrack(track);
  //       // Apply the torch constraint if flash is on
  //       if (flashOn) {
  //         track.applyConstraints({
  //           advanced: [{ torch: flashOn }],
  //         });
  //       }
  //     })
  //     .catch((err) => console.error(err));
  // }, [facingMode, flashOn]);

  return (
    <div className="fixed inset-0 z-10 flex items-center justify-center">
      <div className="overlay h-full w-full bg-[#000000]"></div>

      <StyledScanner
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          zIndex: 1000,
          overflow: "hidden",
        }}
      >
        <div>
          <Scanner
            constraints={{ facingMode: "environment" }}
            paused={!!pause}
            onScan={(result) => scan(result)}
          />
        </div>
        <div className="option absolute left-0 top-0 flex h-[20vh] w-full flex-col">
          <div className="flex h-[20vh] justify-end gap-2 p-4">
            {/* <button onClick={toggleFlash}>
              {flashOn ? "Turn Off Flash" : "Turn On Flash"}
            </button> */}
            <div
              className="flex h-12 flex-row items-center justify-center gap-2 rounded-lg bg-blue-200 px-2 py-1"
              onClick={() => props.onClose()}
            >
              <IoMdCloseCircle size={32} color="#666666" className="m-0 p-0" />
              <p className="font-medium text-gray-400">Close QR</p>
            </div>
          </div>
        </div>
      </StyledScanner>
    </div>
  );
}