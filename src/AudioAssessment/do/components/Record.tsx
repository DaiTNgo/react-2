import React from "react";
import { useModalContext } from "../../../context/ModalContext";
import Micro from "../../../Icons/Micro";
import Modal from "./Modal";
import { RecordContainer } from "./styled";

function Record({ startRecording }: { startRecording: any }) {
  const { openModal } = useModalContext();
  return (
    <div>
      <RecordContainer
        onClick={() => {
          openModal(<Modal startRecording={startRecording} />);
        }}
      >
        <div className="micro-container">
          <Micro />
        </div>
        <p className="record-container">Record</p>
      </RecordContainer>
    </div>
  );
}

export default Record;
