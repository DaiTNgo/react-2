import React from "react";
import { useModalContext } from "../../../context/ModalContext";
import Micro from "../../../Icons/Micro";
import ModalCountDown from "./ModalCountDown";
import { RecordContainer } from "./styled";

function Record({
    startRecording,
    onClick,
}: {
    startRecording: any;
    onClick: () => void;
}) {
    const { openModal } = useModalContext();
    return (
        <RecordContainer
            className="do-assignment-record"
            onClick={() => {
                onClick();
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
