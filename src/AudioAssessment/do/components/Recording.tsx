import React, { MutableRefObject, useCallback, useState } from "react";
import { className, formatTimeToMMSS } from "../../../helper";
import S from "./styles.module.scss";
import { useListenPostMessage } from "../../hooks/useListenPostMessage";
import { ACTION_POST_MESSAGE } from "../../../enums/action";
import { IconPauseActive, IconPauseInActive } from "../../../Icons/IconPause";
import { If, Then } from "react-if";
import { useStoreAudio } from "../../store/audio";
import { StatusAudio } from "../../../enums/status-machine";
import { atom, useRecoilValue } from "recoil";

export const TIME_RECORD_STANDARD = 180;

interface Props {
    stopped: MutableRefObject<boolean>;
    blink: boolean;
}

function Recording({ blink }: Props) {
    const [level, setLevel] = useState(0);

    useListenPostMessage((event) => {
        switch (event.data.action) {
            case ACTION_POST_MESSAGE.FPR_LEVEL_RECORDING:
                setLevel(event.data.body);
                break;
            default:
                break;
        }
    });

    return (
        <div
            className={className(
                blink ? S.Blink : S.NotBlink,
                "flex flex-col items-center gap-2 rounded-[2rem] p-4"
            )}
        >
            <div className={`${className(S.Recording)}`}>
                Recording
                <div>
                    <span className={className(S.Dot, S["Dot-1"])} />
                    <span className={className(S.Dot, S["Dot-2"])} />
                    <span className={className(S.Dot, S["Dot-3"])} />
                </div>
            </div>
            <div>
                <div className={"flex items-center gap-4"}>
                    <IconRecordingGroup />
                    <div className={"flex gap-3"}>
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
                <div className={"time text-[1.8rem]"}>
                    <Time />
                </div>
            </div>
        </div>
    );
}

function IconRecordingGroup() {
    const { statusAudio, changeStatusAudio } = useStoreAudio();

    const handleResume = useCallback(() => {}, []);

    const handlePause = useCallback(() => {
        changeStatusAudio(StatusAudio.PAUSE);
    }, []);
    return (
        <>
            <If condition={statusAudio === StatusAudio.PAUSE}>
                <Then>
                    <div onClick={handleResume} className={"cursor-pointer"}>
                        <IconPauseActive />
                    </div>
                </Then>
            </If>
            <If
                condition={
                    statusAudio === StatusAudio.RESUME ||
                    statusAudio === StatusAudio.PLAY
                }
            >
                <Then>
                    <div onClick={handlePause} className={"cursor-pointer"}>
                        <IconPauseInActive />
                    </div>
                </Then>
            </If>
        </>
    );
}

export const counterState = atom({
    key: "counterState",
    default: 0,
});

function Time() {
    const counter = useRecoilValue(counterState);

    if (counter > TIME_RECORD_STANDARD) {
        return <>{formatTimeToMMSS(TIME_RECORD_STANDARD)}</>;
    }
    return <>{formatTimeToMMSS(counter)}</>;
}

export default Recording;
