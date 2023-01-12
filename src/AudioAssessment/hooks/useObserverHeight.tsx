import { useEffect } from "react";
import { ACTION_POST_MESSAGE } from "../../enums/action";

export const useObserverHeight = (callBack: (height: number) => void) => {
    useEffect(() => {
        let resizeObserver = new ResizeObserver((entries) => {
            for (const entry of entries) {
                callBack(entry.contentRect.height);
            }
        });

        resizeObserver.observe(document.documentElement);

        return () => {
            resizeObserver.unobserve(document.documentElement);
        };
    }, []);
};
