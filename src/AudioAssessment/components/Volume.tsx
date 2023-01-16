import React, { useCallback, useEffect, useRef, useState } from "react";
import IconVolume from "../../Icons/Volume";

type Props = {
    src: string;
    stopDirections: boolean;
};

function Volume({ src, stopDirections }: Props) {
    const [starting, setStarting] = useState(false);
    const refAudio = useRef<HTMLAudioElement>(null);

    useEffect(() => {
        if (!refAudio.current) return;

        const listenEnded = () => {
            setStarting(false);
        };

        refAudio.current.addEventListener("ended", listenEnded);

        return () => {
            if (!refAudio.current) return;
            refAudio.current.removeEventListener("ended", listenEnded);
        };
    }, []);

    useEffect(() => {
        if (stopDirections) {
            setStarting(false);
        }
    }, [stopDirections]);

    const handleStartAudio = useCallback(() => {
        if (!refAudio.current) return;

        if (starting) {
            refAudio.current.pause();
            setStarting((v) => !v);
        } else {
            refAudio.current.currentTime = 0;
            refAudio.current.play();
            setStarting((v) => !v);
        }
    }, [starting]);

    return (
        <div
            onClick={handleStartAudio}
            style={{
                position: "absolute",
                top: 14,
                left: 140,
            }}
        >
            <IconVolume
                active={starting}
                fill={starting ? "#0ac32d" : "#999999"}
            />
            <audio controls={false} ref={refAudio} src={src}></audio>
        </div>
    );
}

export default Volume;
