import React from "react";
import { useModalContext } from "../../context/ModalContext";
import Layout from "./Layout";

function Modal() {
    const { children, isVisibleModal, destroyModal, propsModal }: any =
        useModalContext();

    const handleClickMask = () => {
        propsModal.closeMask && destroyModal();
    };

    if (!isVisibleModal) return <></>;
    return (
        <Layout>
            <div
                className="absolute inset-0 z-10 h-screen bg-gray-300"
                style={{
                    backgroundColor: "rgba(255,255,255,0.8)",
                }}
                onClick={handleClickMask}
            ></div>
            <div
                className="absolute top-1/2 left-1/2 z-20 grid place-content-center"
                style={{
                    transform: "translate(-50%,-50%)",
                }}
            >
                {children}
            </div>
        </Layout>
    );
}

export default Modal;
