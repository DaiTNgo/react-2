import { useEffect } from "react";
import { ACTION_POST_MESSAGE } from "../../enums/action";

export const useObserverHeight = () => {
    useEffect(() => {
        let resizeObserver = new ResizeObserver((entries) => {
            for (const entrie of entries) {
                window.parent.postMessage(
                    {
                        resp: entrie.contentRect.height,
                        action: ACTION_POST_MESSAGE.HEIGHT,
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
