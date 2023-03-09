import React, { useEffect, useState } from "react";
import { useModalContext } from "../../../../context/ModalContext";
import { ModalContainer } from "../styled";

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
        <ModalContainer>
            <p className="modal-title">Recording will begin in...</p>
            <div className="countdown">
                <div className="countdown-number">{count}</div>
                <div className="small-circle-box">
                    <div className="small-circle"></div>
                </div>
                <svg>
                    <circle
                        className={"circle-thumb"}
                        r="23"
                        cx="25"
                        cy="25"
                    ></circle>
                    <circle
                        className={"circle-bar"}
                        r="23"
                        cx="25"
                        cy="25"
                    ></circle>
                </svg>
            </div>
        </ModalContainer>
    );
}

export default ModalCountDown;
