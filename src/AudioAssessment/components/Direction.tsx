import React, { forwardRef, useCallback, useEffect, useRef } from "react";
import Volume, { isStartAudioDirectionState } from "./Volume";
import { getDirections } from "../utils/convertLayout";
import { useAudioAssessmentContext } from "../ContextAudioAssessment";
import styled from "styled-components";
import useAudioPlayer from "../../hooks/useAudioPlayer";
import { className, formatTimeToMMSS } from "../../helper";
import styles from "../../components/Audio/audio.module.scss";
import { Loading } from "../../components/button";
import { useRecoilState, useRecoilValue } from "recoil";
import { Else, If, Then } from "react-if";
const SDirection = styled.div`
    .direction-title {
        font-size: 2.4rem;
        color: #e11740;
    }
    .direction-content {
        font-size: 2.4rem;
    }
`;

const PauseIcon = () => {
    return (
        <>
            <svg
                width="20px"
                height="20px"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <g id="SVGRepo_bgCarrier" strokeWidth="0" />

                <g
                    id="SVGRepo_tracerCarrier"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />

                <g id="SVGRepo_iconCarrier">
                    <path
                        d="M10.65 19.11V4.89C10.65 3.54 10.08 3 8.64 3H5.01C3.57 3 3 3.54 3 4.89V19.11C3 20.46 3.57 21 5.01 21H8.64C10.08 21 10.65 20.46 10.65 19.11Z"
                        fill="#006ef5"
                    />
                    <path
                        d="M21.0016 19.11V4.89C21.0016 3.54 20.4316 3 18.9916 3H15.3616C13.9316 3 13.3516 3.54 13.3516 4.89V19.11C13.3516 20.46 13.9216 21 15.3616 21H18.9916C20.4316 21 21.0016 20.46 21.0016 19.11Z"
                        fill="#006ef5"
                    />
                </g>
            </svg>
        </>
    );
};

const PlayIcon = () => {
    return (
        <svg
            width="20px"
            height="20px"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <g id="SVGRepo_bgCarrier" strokeWidth="0" />

            <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
            />

            <g id="SVGRepo_iconCarrier">
                <path
                    d="M17.2839 11.134C17.9506 11.5189 17.9506 12.4811 17.2839 12.866L6.71601 18.9674C6.04934 19.3523 5.21601 18.8712 5.21601 18.1014L5.21601 5.8986C5.21601 5.1288 6.04934 4.64768 6.71601 5.03258L17.2839 11.134Z"
                    fill="#006ef5"
                />
            </g>
        </svg>
    );
};

interface Props {
    curTime: number;
    duration: number;
    onTimeUpdate: (time: number) => void;
}

function Bar({ duration, curTime, onTimeUpdate }: Props) {
    const barRef = useRef<HTMLDivElement>(null);

    const curPercentage = (curTime / duration) * 100;

    const formatDuration = (duration: any) => {
        return formatTimeToMMSS(duration);
    };

    const calcClickedTime = (e: any) => {
        try {
            const clickPositionInPage = e.pageX;
            const barStart =
                barRef.current!.getBoundingClientRect().left + window.scrollX;
            const barWidth = barRef.current!.offsetWidth;
            const clickPositionInBar = clickPositionInPage - barStart;
            const timePerPixel = duration / barWidth;
            return timePerPixel * clickPositionInBar;
        } catch (error) {
            return 0;
        }
    };

    const handleTimeDrag = (e: any) => {
        onTimeUpdate(calcClickedTime(e));

        const updateTimeOnMove = (eMove: any) => {
            onTimeUpdate(calcClickedTime(eMove));
        };

        document.addEventListener("mousemove", updateTimeOnMove);

        document.addEventListener("mouseup", () => {
            document.removeEventListener("mousemove", updateTimeOnMove);
        });
    };

    return (
        <div className="bar">
            <div className={"relative flex items-center mx-8 gap-8"}>
                <div
                    className={className("cursor-pointer")}
                    ref={barRef}
                    onMouseDown={(e) => {
                        onTimeUpdate(calcClickedTime(e));
                    }}
                    style={{
                        width: "150px",
                        height: "8px",
                        borderRadius: "4px",
                        border: "1px solid #000000",
                        backgroundColor: "#b9b9b9",
                        background: `linear-gradient(to right, #006ef5 ${curPercentage}%, #b9b9b9 ${curPercentage}%)`,
                    }}
                />
                <div
                    onMouseDown={handleTimeDrag}
                    style={{
                        left: `${curPercentage - 2}%`,
                        position: "absolute",
                        top: "50%",
                        transform: "translateY(-50%)",

                        cursor: "pointer",

                        width: "16px",
                        height: "16px",
                        borderRadius: "50%",
                        backgroundColor: "#ccc",

                        border: "1px solid white",
                    }}
                />
            </div>
        </div>
    );
}
const DirectionAudio = forwardRef(function DirectionAudio(
    {
        onPermissionAllowPlayingDirection,
        isPlayDirection,
    }: {
        onPermissionAllowPlayingDirection: (isAllow: boolean) => void;
        isPlayDirection: boolean;
    },
    refAudio: any
) {
    const { duration, curTime, setClickedTime, setPlaying } =
        useAudioPlayer(refAudio);
    const [starting, setStarting] = useRecoilState(isStartAudioDirectionState);

    const handleStartAudio = useCallback(() => {
        if (!refAudio.current || isPlayDirection === false) return;

        if (starting) {
            refAudio.current.pause();
            setStarting((v) => !v);
        } else {
            refAudio.current.currentTime = 0;
            refAudio.current.play();
            setStarting((v) => !v);
        }
    }, [starting, isPlayDirection]);

    if (!starting) {
        return <></>;
    }
    return (
        <>
            <div
                style={{
                    backgroundColor: "white",
                    borderRadius: "99999px",
                    // minHeight: "2rem",
                    width: "max-content",
                    boxShadow: "0px 0px 5px 0px black",
                    display: "flex",
                    alignItems: "center",
                    padding: "4px 0",
                }}
            >
                <div
                    style={{
                        borderRight: "1px solid black",
                        padding: "0 .8rem",
                    }}
                    className={"cursor-pointer"}
                    onClick={handleStartAudio}
                >
                    <If condition={starting}>
                        <Then>
                            <PauseIcon />
                        </Then>
                        <Else>
                            <PlayIcon />
                        </Else>
                    </If>
                </div>
                <div>
                    <Bar
                        duration={duration}
                        curTime={curTime}
                        onTimeUpdate={(time) => setClickedTime(time)}
                    />
                </div>
                <div className={"pr-8 text-[#006ef5]"}>
                    {formatTimeToMMSS(curTime)} / {formatTimeToMMSS(duration)}
                </div>
            </div>
        </>
    );
});
function Direction({ isPlayDirection = true }: { isPlayDirection?: boolean }) {
    const { data } = useAudioAssessmentContext();
    const { direction } = getDirections(data);
    const testRef = useRef(null);

    return (
        <>
            <div
                style={{
                    paddingLeft: "1rem",
                }}
            >
                <DirectionAudio
                    isPlayDirection={isPlayDirection}
                    onPermissionAllowPlayingDirection={() => {}}
                    ref={testRef}
                />
            </div>

            <SDirection className="flex items-start gap-1 relative mt-12">
                <div className={"mt-[-9px]"}>
                    <Volume
                        // src={"https://cqa2.sadlierconnect.com" + pathAudio}
                        src={
                            "https://cqa.sadlierconnect.com/content/803001/007743417/direction-line.mp3"
                        }
                        isPlayDirection={isPlayDirection}
                        ref={testRef}
                    />
                </div>
                <div
                    dangerouslySetInnerHTML={{
                        __html: direction,
                    }}
                />
            </SDirection>
        </>
    );
}

export default Direction;
