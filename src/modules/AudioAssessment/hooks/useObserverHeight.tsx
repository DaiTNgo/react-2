import { useEffect } from "react";
import { ACTION_POST_MESSAGE } from "../../../common/constant/action";

export const useObserverHeight = () => {
    useEffect(() => {
        let resizeObserver = new ResizeObserver((entries) => {
            for (const entrie of entries) {
                window.parent.postMessage(
                    {
                        resp: entrie.contentRect.height,
                        action: ACTION_POST_MESSAGE.FPR_HEIGHT,
                    },
                    "*"
                );
            }
        });

        resizeObserver.observe(document.documentElement);

        return () => {
            resizeObserver.unobserve(document.documentElement);
        };
    }, []);
};
