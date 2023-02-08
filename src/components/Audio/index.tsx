import React, { AudioHTMLAttributes, useEffect, useRef, useState } from "react";
import styles from "./audio.module.scss";
import IconPlay from "../../Icons/Play";
import IconPause from "../../Icons/Pause";
import useAudioPlayer from "../../hooks/useAudioPlayer";
import Bar from "./Bar";
import { className } from "../../helper";
type Props = {
    src: string;
    onPermissionAllowPlayingDirection:(is:boolean)=>void
};

function Audio({ src,onPermissionAllowPlayingDirection }: Props) {
    const refAudio = useRef<HTMLAudioElement>(null);

    const {
        curTime,
        duration,
        setClickedTime,
        playing,
        setPlaying,
        isLoadingAudio,
    } = useAudioPlayer(refAudio);

    const handlePlayAudio = () => {
        refAudio.current!.play();
        setPlaying(true);

        onPermissionAllowPlayingDirection(false)
    };

    const handlePauseAudio = () => {
        refAudio.current!.pause();
        setPlaying(false);

        onPermissionAllowPlayingDirection(true)
    };

    return (
        <React.Fragment>
            <div
                className={`flex items-center gap-4 ${
                    !!src ? "" : "opacity-50"
                }`}
            >
                {playing ? (
                    <button className={styles.Pause} onClick={handlePauseAudio}>
                        <IconPause fill={"white"} />
                    </button>
                ) : (
                    <button
                        className={styles.Play}
                        onClick={!!src ? handlePlayAudio : () => {}}
                    >
                        <IconPlay fill={"white"} />
                    </button>
                )}

                <Bar
                    curTime={curTime}
                    duration={duration}
                    onTimeUpdate={(time) => setClickedTime(time)}
                    loading={isLoadingAudio}
                />
            </div>
            <audio controls={false} ref={refAudio} src={src} />
        </React.Fragment>
    );
}

export default Audio;
