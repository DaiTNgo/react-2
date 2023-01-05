import React, { useRef } from "react";
import moment from "moment";
import styles from "./audio.module.scss";
import { formatTimeToMMSS } from "../../helper";

interface Props {
    curTime: number;
    duration: number;
    onTimeUpdate: (time: number) => void;
}

const formatTime = (time: number | string) => {
    const _time = Number(time);

    if (!isNaN(_time)) return 0;
};
export default function Bar({ duration, curTime, onTimeUpdate }: Props) {
    const barRef = useRef<HTMLDivElement>(null);

    const curPercentage = (curTime / duration) * 100;

    function formatDuration(duration: any) {
        return formatTimeToMMSS(duration);
        // return moment(duration, "X").format("mm:ss");
    }

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
                <div className={styles.Thumb} ref={barRef} />
                <div
                    onMouseDown={handleTimeDrag}
                    className={styles.Track}
                    style={{ left: `${curPercentage - 2}%` }}
                />
                <p className={styles.CurrentTime}>{formatDuration(curTime)}</p>
                <p className={styles.TotalTime}>{formatDuration(duration)}</p>
            </div>
        </div>
    );
}
