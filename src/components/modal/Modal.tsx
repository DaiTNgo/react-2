import React, { Children } from "react";
import { useModalContext } from "../../context/ModalContext";
import Layout from "./Layout";

interface Props {
  isVisible: boolean;
}

function Modal() {
  const { children, isVisibleModal } = useModalContext();

  if (!isVisibleModal) return <></>;
  return (
    <Layout>
      <div
        className="absolute inset-0 z-10 h-screen bg-gray-300"
        style={{
          backgroundColor: "rgba(255,255,255,0.8)",
        }}
      >
        <div className="relative z-20 grid place-content-center h-screen">
          {children}
        </div>
      </div>
    </Layout>
  );
}

export default Modal;
