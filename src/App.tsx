import AudioAssessment from "./AudioAssessment";
import Modal from "./components/modal";
import { ModalProvider } from "./context/ModalContext";
import { SIndex } from "./AudioAssessment/styled/view";

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
// export class Singleton {
//     private static instance: Singleton;
//     public count = 99;
//     private constructor() {
//         console.log("[COUNT]", this.getCount());
//     }
//
//     public setCount(count: number) {
//         this.count = count;
//     }
//
//     public getCount() {
//         return this.count;
//     }
//
//     public static getInstance(): Singleton {
//         if (!this.instance) {
//             this.instance = new this();
//         }
//         return this.instance;
//     }
//
//     public static get Instance() {
//         return this.getInstance();
//     }
// }

export default ProviderApp;
