import React from "react";
import AudioAssessment from "./modules/AudioAssessment";
import Modal from "./components/modal";
import { ModalProvider } from "./context/ModalContext";
import GlobalStyle from "./layouts/style";
import stylex from "@ladifire-opensource/stylex";

const styles = stylex.create({
    red: {
        color: "blue",
    },
});
function App() {
    return (
        <GlobalStyle>
            <h1 className={stylex(styles.red)}>Dai + Ngo</h1>
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
