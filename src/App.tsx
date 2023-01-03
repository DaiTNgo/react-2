import AudioAssessment from "./modules/AudioAssessment";
import Modal from "./components/modal";
import { ModalProvider } from "./context/ModalContext";
import GlobalStyle from "./layouts/style";
import { Fragment } from "react";

function App() {
    return (
        <Fragment>
            <AudioAssessment />
            <Modal />
        </Fragment>
    );
}

function ProviderApp() {
    return (
        <ModalProvider>
            <GlobalStyle>
                <App />
            </GlobalStyle>
        </ModalProvider>
    );
}

export default ProviderApp;
