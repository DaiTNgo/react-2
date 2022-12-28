import { ReactNode, useEffect, useRef } from "react";
import { createPortal } from "react-dom";

const bodyElement = document.body;

function Layout({ children }: { children: ReactNode }) {
    const refModal = useRef<HTMLElement>(document.createElement("div"));

    useEffect(() => {
        bodyElement.append(refModal.current);
        return () => {
            bodyElement.removeChild(refModal.current);
        };
    }, []);
    return createPortal(children, refModal.current as HTMLElement);
}

export default Layout;
