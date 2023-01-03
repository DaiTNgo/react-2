import React from "react";
import { useModalContext } from "../../../../context/ModalContext";
import Micro from "../../../../assets/Icons/Micro";
import ModalCountDown from "./ModalCountDown";
import { RecordContainer } from "./styled";

function Record({ startRecording }: { startRecording: any }) {
    const { openModal } = useModalContext();
    return (
        <RecordContainer
            className="do-assignment-record"
            onClick={() => {
                openModal(<ModalCountDown startRecording={startRecording} />);
            }}
        >
            <div className="micro-container">
                <Micro />
            </div>
            <p className="record-container">Record</p>
        </RecordContainer>
    );
}

export default Record;
