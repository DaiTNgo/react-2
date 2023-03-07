import React from "react";
import Micro from "../../../Icons/Micro";
import { RecordContainer } from "./styled";
import IconPause from "../../../Icons/IconPause";

function Record({ onClick }: { onClick: () => void }) {
    return (
        <RecordContainer className="do-assignment-record" onClick={onClick}>
            <div className="micro-container">
                <Micro />
            </div>
            <p className="record-container">Record</p>
        </RecordContainer>
    );
}

export default Record;
