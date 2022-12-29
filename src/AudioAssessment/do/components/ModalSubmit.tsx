import React from "react";
import Volumn from "../../../Icons/Volumn";
import "./style.scss";
interface Props {
    onSubmit: () => void;
}
function ModalSubmit({ onSubmit }: Props) {
    return (
        <div className="modal-submit-container">
            <div className="volumn-container">
                <Volumn fill={"rgb(153,153,153)"} />
            </div>
            <h3 className="finished">Finished?</h3>
            <p className="submit-para">
                Click the Submit button to send your recording to your teacher.
            </p>
            <button className="submit-btn" onClick={onSubmit}>
                Submit
            </button>
        </div>
    );
}

export default ModalSubmit;
