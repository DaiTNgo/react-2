import React, { AudioHTMLAttributes, useEffect, useRef, useState } from "react";
import styles from "./audio.module.scss";
import IconPlay from "../../Icons/Play";
import IconPause from "../../Icons/Pause";
import useAudioPlayer from "../../hooks/useAudioPlayer";
import Bar from "./Bar";
type Props = {
    src: string;
};

function Audio({ src }: Props) {
    const refAudio = useRef<HTMLAudioElement>(null);

    const { curTime, duration, playing, setPlaying, setClickedTime } =
        useAudioPlayer(refAudio);

    const handlePlayAudio = () => {
        setPlaying(true);
    };

    const handlePauseAudio = () => {
        setPlaying(false);
    };

    return (
        <React.Fragment>
            <div className={"flex items-center gap-4"}>
                {playing ? (
                    <button className={styles.Pause} onClick={handlePauseAudio}>
                        <IconPause fill={"white"} />
                    </button>
                ) : (
                    <button className={styles.Play} onClick={handlePlayAudio}>
                        <IconPlay fill={"white"} />
                    </button>
                )}

                <Bar
                    curTime={curTime}
                    duration={duration}
                    onTimeUpdate={(time) => setClickedTime(time)}
                />
            </div>

            <audio controls={false} ref={refAudio} src={src}></audio>
        </React.Fragment>
    );
}

export default Audio;
