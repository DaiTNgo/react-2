import React from "react";
import { formatTimeToMMSS } from "../../../helper";
import IconMicroDontAllow from "../../../Icons/MicroDontAllow";
import IconHelp from "../../../Icons/Help";

interface Props {
    onAllowMicro: () => void;
}

function RecordingDontAllowMic({ onAllowMicro }: Props) {
    return (
        <div className={"flex items-center gap-2 relative"}>
            <div
                className={
                    "flex flex-col items-center gap-2 bg-[#f0f0f0] rounded-[2rem] px-8 pb-8"
                }
            >
                <h6
                    className={`text-[#ff0000] text-[3rem] italic font-semibold `}
                >
                    No Audio Detected
                </h6>
                <IconHelp
                    className={"absolute top-[6px] right-[6px] cursor-pointer"}
                    onClick={onAllowMicro}
                />
                <div>
                    <div className={"flex items-center gap-2"}>
                        <IconMicroDontAllow />
                        <div className={"flex gap-3"}>
                            {Array(12)
                                .fill(0)
                                .map((_, index) => {
                                    return (
                                        <div
                                            key={index}
                                            style={{
                                                border: "1px solid #707070",
                                            }}
                                            className={
                                                "rounded-full w-[14px] h-[32px] bg-['transparent']"
                                            }
                                        ></div>
                                    );
                                })}
                        </div>
                    </div>
                    <div className={"time mt-2.5 opacity-50 text-[1.8rem]"}>
                        <Time />
                    </div>
                </div>
            </div>
        </div>
    );
}

function Time() {
    return <>{formatTimeToMMSS(0)}</>;
}

export default RecordingDontAllowMic;
