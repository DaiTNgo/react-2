import { useState, useEffect, MutableRefObject, RefObject } from "react";

function useAudioPlayer(audio: RefObject<HTMLAudioElement>) {
    const [duration, setDuration] = useState(0);
    const [curTime, setCurTime] = useState(0);
    const [clickedTime, setClickedTime] = useState<number>(0);
    const [playing, setPlaying] = useState(false);
    const [isLoadingAudio, setIsLoadingAudio] = useState(true);

    useEffect(() => {
        const setAudioTime = () => setCurTime(audio.current!.currentTime);

        audio.current!.addEventListener("timeupdate", setAudioTime);

        if (clickedTime && clickedTime !== curTime) {
            audio.current!.currentTime = clickedTime;
            // @ts-ignore
            setClickedTime(null);
        }

        // effect cleanup
        return () => {
            if (audio.current)
                audio.current!.removeEventListener("timeupdate", setAudioTime);
        };
    }, [clickedTime]);

    useEffect(() => {
        const noSrcAudio = audio.current?.currentSrc === "";
        if (noSrcAudio) setIsLoadingAudio(false);

        const setAudioData = () => {
            if (audio.current!.duration === Infinity) {
                audio.current!.currentTime = Number.MAX_SAFE_INTEGER;

                setTimeout(() => {
                    audio.current!.currentTime = 0;
                }, 1000);
            }
            audio.current!.addEventListener("durationchange", () => {
                setDuration(audio.current!.duration);
            });

            setDuration(audio.current!.duration);
            setIsLoadingAudio(false);
        };

        const completeLoadingAudio = () => {
            setIsLoadingAudio(true);
        };

        const completeAudio = () => {
            setPlaying(false);
        };

        audio.current!.addEventListener("loadeddata", setAudioData);
        audio.current!.addEventListener("loadstart", completeLoadingAudio);
        audio.current!.addEventListener("ended", completeAudio);

        return () => {
            if (audio.current) {
                audio.current!.removeEventListener("loadeddata", setAudioData);
                audio.current!.removeEventListener(
                    "loadstart",
                    completeLoadingAudio
                );
                audio.current!.removeEventListener("ended", completeAudio);
            }
        };
    }, []);

    return {
        curTime,
        duration,
        setClickedTime,
        playing,
        setPlaying,
        isLoadingAudio,
    };
}

export default useAudioPlayer;
