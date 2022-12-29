import React, { useEffect, useState } from "react";
import { useModalContext } from "../../../context/ModalContext";
import "./style.scss";
function ModalCountDown({ startRecording }: { startRecording: any }) {
    const { destroyModal } = useModalContext();

    const [count, setCount] = useState(3);

    useEffect(() => {
        const id = setInterval(() => {
            setCount((c) => c - 1);
        }, 1000);
        return () => {
            clearInterval(id);
        };
    }, []);

    if (count == 0) {
        startRecording();
        destroyModal();
    }

    return (
        <div className="modal-container">
            <p className="modal-title">Recording will begin in...</p>
            <p className="count-down">{count}</p>
        </div>
    );
}

export default ModalCountDown;
