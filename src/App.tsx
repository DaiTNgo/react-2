import AudioAssessment from "./AudioAssessment";
import Modal from "./components/modal";
import { ModalProvider, useModalContext } from "./context/ModalContext";

function App() {
  return (
    <>
      <AudioAssessment />
      <Modal />
    </>
  );
}

function ProviderApp() {
  return (
    <ModalProvider>
      <App />
    </ModalProvider>
  );
}

export default ProviderApp;
