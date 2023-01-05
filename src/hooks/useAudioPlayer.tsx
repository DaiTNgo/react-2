import { useState, useEffect, MutableRefObject, RefObject } from "react";

function useAudioPlayer(audio: RefObject<HTMLAudioElement>) {
    const [duration, setDuration] = useState(0);
    const [curTime, setCurTime] = useState(0);
    const [playing, setPlaying] = useState(false);
    const [clickedTime, setClickedTime] = useState<number>(0);

    useEffect(() => {
        // state setters wrappers
        const setAudioData = () => {
            setDuration(audio.current!.duration);
            setCurTime(audio.current!.currentTime);
        };

        const setAudioTime = () => setCurTime(audio.current!.currentTime);

        // DOM listeners: update React state on DOM events
        audio.current!.addEventListener("loadeddata", setAudioData);

        audio.current!.addEventListener("timeupdate", setAudioTime);

        // React state listeners: update DOM on React state changes
        playing ? audio.current!.play() : audio.current!.pause();

        if (clickedTime && clickedTime !== curTime) {
            audio.current!.currentTime = clickedTime;
            // @ts-ignore
            setClickedTime(null);
        }

        // effect cleanup
        return () => {
            audio.current!.removeEventListener("loadeddata", setAudioData);
            audio.current!.removeEventListener("timeupdate", setAudioTime);
        };
    });

    return {
        curTime,
        duration,
        playing,
        setPlaying,
        setClickedTime,
    };
}

export default useAudioPlayer;
