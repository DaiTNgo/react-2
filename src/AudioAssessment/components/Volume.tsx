import React, { useCallback, useEffect, useRef, useState } from "react";
import IconVolume from "../../Icons/Volume";

type Props = {
    src: string;
};

function Volume({ src }: Props) {
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

    const handleStartAudio = useCallback(() => {
        if (!refAudio.current) return;

        refAudio.current.currentTime = 0;
        refAudio.current.play();
        setStarting(true);
    }, []);

    return (
        <div
            onClick={handleStartAudio}
            style={{
                position: "absolute",
                top: 15,
                left: 170,
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
