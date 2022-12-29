import { useModalContext } from "../../../context/ModalContext";
import Micro from "../../../Icons/Micro";
import ModalCountDown from "./ModalCountDown";
import "./style.scss";

function Record({ startRecording }: { startRecording: any }) {
    const { openModal } = useModalContext();
    return (
        <div
            className="do-assignment-record record-container"
            onClick={() => {
                openModal(<ModalCountDown startRecording={startRecording} />);
            }}
        >
            <div className="micro-container">
                <Micro />
            </div>
            <p className="record-container">Record</p>
        </div>
    );
}

export default Record;
