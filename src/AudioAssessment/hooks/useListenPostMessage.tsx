import React, { useEffect } from "react";
import { IEventPostMessage } from "../types";

function useListenPostMessage(
    callBack: (event: IEventPostMessage) => void,
    dependencies: any[] = []
) {
    useEffect(() => {
        window.addEventListener("message", callBack);

        return () => {
            window.removeEventListener("message", callBack);
        };
    }, dependencies);
}

export { useListenPostMessage };
