import React from "react";
import AudioAssessment from "./modules/AudioAssessment";
import Modal from "./components/modal";
import { ModalProvider } from "./context/ModalContext";
import GlobalStyle from "./layouts/style";

function App() {
    return (
        <GlobalStyle>
            <AudioAssessment />
            <Modal />
        </GlobalStyle>
    );
}

function Store() {
    const stores = [ModalProvider];
    return stores.reduceRight((Component: any, Store: any) => {
        return <Store>{Component}</Store>;
    }, <App />);
}

export default Store;
