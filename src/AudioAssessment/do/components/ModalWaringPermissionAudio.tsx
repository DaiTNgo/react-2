import React from "react";
import { useModalContext } from "../../../context/ModalContext";
import * as S from "./styled";

function ModalWaringPermissionAudio() {
    const { destroyModal } = useModalContext();

    return (
        <S.ModalPermissionAudio>
            <div className="permision-top">
                <h3 className={"title"}>Warning:</h3>
                <p className={"content"}>
                    Sadlierconnect would like to access the microphone.
                    <br />
                    Please allow microphone to record your assignment.
                </p>
            </div>
            <button onClick={destroyModal} className={"btn-ok"}>
                Ok
            </button>
        </S.ModalPermissionAudio>
    );
}

export default ModalWaringPermissionAudio;
