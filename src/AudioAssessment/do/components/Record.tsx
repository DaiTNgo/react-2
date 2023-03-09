import React from "react";
import Micro from "../../../Icons/Micro";
import { RecordContainer } from "./styled";

function Record({ onClick }: { onClick: () => void }) {
    return (
        <RecordContainer onClick={onClick}>
            <div className="micro-container">
                <Micro width={35} height={35} />
            </div>
            <p className="record-container">Record</p>
        </RecordContainer>
    );
}

export default Record;
