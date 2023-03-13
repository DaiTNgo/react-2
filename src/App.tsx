import AudioAssessment from "./AudioAssessment";
import Modal from "./components/modal";
import { ModalProvider } from "./context/ModalContext";
import { useEffect, useState } from "react";

// const useTest = () => {
//     const [count, setCount] = useState(0);
//
//     const TIME = 1000;
//
//     useEffect(() => {
//         setInterval(() => {
//             setCount((c) => c + 1);
//         }, TIME);
//     }, []);
//     return count;
// };
//
// function B() {
//     const _ = useTest();
//     console.log("B re-render");
//
//     return <></>;
// }
//
// function A() {
//     console.log("re-render");
//
//     return (
//         <>
//             <>
//                 <B />
//             </>
//             <C />
//         </>
//     );
// }

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
