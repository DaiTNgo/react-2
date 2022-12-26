import React from "react";
import { useModalContext } from "../../../context/ModalContext";
import Micro from "../../../Icons/Micro";
import ModalCountDown from "./ModalCountDown";

function Record({ startRecording }: { startRecording: any }) {
  const { openModal } = useModalContext();
  return (
    <div>
      <div
        style={{
          backgroundColor: "rgb(111,111,111)",
          display: "flex",
          gap: 10,
          borderRadius: 99999,
          padding: 4,
          alignItems: "center",
          width: "max-content",
          minWidth: "200px",
          margin: "40px auto",
          cursor: "pointer",
          userSelect: "none",
        }}
        className="do-assignment-record"
        onClick={() => {
          openModal(<ModalCountDown startRecording={startRecording} />);
        }}
      >
        <div
          style={{
            backgroundColor: "#fff",
            width: 50,
            height: 50,
            // border: "1px solid",
            display: "grid",
            placeContent: "center",
            borderRadius: "50%",
          }}
        >
          <Micro />
        </div>
        <p
          style={{
            color: "#fff",
            fontSize: 24,
            fontWeight: 500,
          }}
        >
          Record
        </p>
      </div>
    </div>
  );
}

export default Record;
