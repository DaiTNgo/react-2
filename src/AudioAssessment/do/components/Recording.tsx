import React, {
    MutableRefObject,
    useCallback,
    useEffect,
    useState,
} from "react";
import { className, formatTimeToMMSS } from "../../../helper";
import S from "./styles.module.scss";
import { useListenPostMessage } from "../../hooks/useListenPostMessage";
import { ACTION_POST_MESSAGE } from "../../../enums/action";
import { IconPauseActive, IconPauseInActive } from "../../../Icons/IconPause";
import { Else, If, Then } from "react-if";
import { useStoreAudio } from "../../store/audio";
import { StatusAudio } from "../../../enums/status-machine";

export const TIME_RECORD_STANDARD = 120;

interface Props {
    numOfWord: number;
    stopped: MutableRefObject<boolean>;
    blink: boolean;
}

function Recording({ stopped, blink }: Props) {
    const [level, setLevel] = useState(0);

    // const { statusAudio } = useStoreAudio();

    useListenPostMessage((event) => {
        switch (event.data.action) {
            case ACTION_POST_MESSAGE.FPR_LEVEL_RECORDING:
                console.log("event.data.body", event.data.body);
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
                        <div className={"flex items-center gap-4"}>
                            <IconRecordingGroup />
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
                                                            ? "#56ba4e"
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
function IconRecordingGroup() {
    const [isPaused, setIsPaused] = useState(false);
    const { changeStatusAudio } = useStoreAudio();

    const handleResume = useCallback(() => {
        setIsPaused(false);
        changeStatusAudio(StatusAudio.RESUME);
    }, []);

    const handlePause = useCallback(() => {
        setIsPaused(true);
        changeStatusAudio(StatusAudio.PAUSE);
    }, []);
    return (
        <>
            <If condition={isPaused}>
                <Then>
                    <div onClick={handleResume}>
                        <IconPauseActive />
                    </div>
                </Then>
                <Else>
                    <div onClick={handlePause}>
                        <IconPauseInActive />
                    </div>
                </Else>
            </If>
        </>
    );
}
function Time({ stopped }: { stopped: MutableRefObject<boolean> }) {
    const [count, setCount] = useState(0);
    const { statusAudio } = useStoreAudio();

    useEffect(() => {
        if (stopped.current) return;
        if (statusAudio === StatusAudio.PAUSE) return;

        const id = setInterval(() => {
            setCount((c) => c + 1);
        }, 1000);

        return () => {
            clearInterval(id);
        };
    }, [stopped.current, statusAudio]);

    if (count > TIME_RECORD_STANDARD) {
        return <>{formatTimeToMMSS(TIME_RECORD_STANDARD)}</>;
    }
    return <>{formatTimeToMMSS(count)}</>;
}

export default Recording;
