import React, { useRef } from "react";
import styles from "./audio.module.scss";
import { className, formatTimeToMMSS } from "../../helper";
import { Loading } from "../button";

interface Props {
    curTime: number;
    duration: number;
    onTimeUpdate: (time: number) => void;
    loading: boolean;
}

export default function Bar({
    duration,
    curTime,
    onTimeUpdate,
    loading,
}: Props) {
    const barRef = useRef<HTMLDivElement>(null);

    const curPercentage = (curTime / duration) * 100;

    const formatDuration = (duration: any) => {
        return formatTimeToMMSS(duration);
    };

    const calcClickedTime = (e: any) => {
        const clickPositionInPage = e.pageX;
        const barStart =
            barRef.current!.getBoundingClientRect().left + window.scrollX;
        const barWidth = barRef.current!.offsetWidth;
        const clickPositionInBar = clickPositionInPage - barStart;
        const timePerPixel = duration / barWidth;
        return timePerPixel * clickPositionInBar;
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
            <div className={styles.Progress}>
                <div
                    className={className(styles.Thumb, "cursor-pointer")}
                    ref={barRef}
                    onMouseDown={(e) => {
                        onTimeUpdate(calcClickedTime(e));
                    }}
                />
                <div
                    onMouseDown={handleTimeDrag}
                    className={styles.Track}
                    style={{ left: `${curPercentage - 2}%` }}
                />
                <p className={styles.CurrentTime}>{formatDuration(curTime)}</p>
                {loading ? (
                    <Loading className={styles.TotalTime} />
                ) : (
                    <p className={styles.TotalTime}>
                        {formatDuration(duration)}
                    </p>
                )}
            </div>
        </div>
    );
}
