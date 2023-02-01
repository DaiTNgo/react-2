import React, { MutableRefObject, useEffect, useState } from "react";
import Micro from "../../../Icons/Micro";
import { className, formatTimeToMMSS } from "../../../helper";
import S from "./styles.module.scss";
import { useListenPostMessage } from "../../hooks/useListenPostMessage";
import { ACTION_POST_MESSAGE } from "../../../enums/action";

export const TIME_RECORD_STANDARD = 120;

interface Props {
    numOfWord: number;
    stopped: MutableRefObject<boolean>;
    blink: boolean;
}

function Recording({ stopped, blink }: Props) {
    const [level, setLevel] = useState(0);

    useListenPostMessage((event) => {
        switch (event.data.action) {
            case ACTION_POST_MESSAGE.FPR_LEVEL_RECORDING:
                // @ts-ignore
                setLevel(event.data.body);
                break;
            default:
                break;
        }
    });

    return (
        <div className={"inline-block"}>
            <div className={"flex items-center gap-2 relative"}>
                <div className={"absolute top-[45px] left-[-60px]"}>
                    <Micro width={50} height={50} />
                </div>
                <div className={"flex flex-col items-center gap-2"}>
                    <div className={`${className(S.Recording)}`}>
                        Recording
                        <div>
                            <span className={className(S.Dot, S["Dot-1"])} />
                            <span className={className(S.Dot, S["Dot-2"])} />
                            <span className={className(S.Dot, S["Dot-3"])} />
                        </div>
                    </div>
                    <div
                        style={{
                            padding: "16px 20px",
                            borderRadius: 10,
                        }}
                        className={className(blink ? S.Blink : S.NotBlink)}
                    >
                        <div className={"flex gap-4"}>
                            {Array(12)
                                .fill(0)
                                .map((_, index) => {
                                    return (
                                        <div
                                            key={index}
                                            style={{
                                                backgroundColor:
                                                    level > index
                                                        ? "#cacaca"
                                                        : "white",
                                                border: "1px solid #707070",
                                            }}
                                            className={
                                                "rounded-full w-[14px] h-[32px] "
                                            }
                                        ></div>
                                    );
                                })}
                        </div>
                        <div
                            className={"time mt-2.5"}
                            style={{
                                fontSize: 18,
                            }}
                        >
                            <Time stopped={stopped} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function Time({ stopped }: { stopped: MutableRefObject<boolean> }) {
    const [count, setCount] = useState(0);
    useEffect(() => {
        if (stopped.current) return;

        const id = setInterval(() => {
            setCount((c) => c + 1);
        }, 1000);

        return () => {
            clearInterval(id);
        };
    }, [stopped.current]);

    if (count > TIME_RECORD_STANDARD) {
        return <>{formatTimeToMMSS(TIME_RECORD_STANDARD)}</>;
    }
    return <>{formatTimeToMMSS(count)}</>;
}

export default Recording;
