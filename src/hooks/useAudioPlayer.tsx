import { useState, useEffect, MutableRefObject, RefObject } from 'react';

function useAudioPlayer(audio: RefObject<HTMLAudioElement>) {
    const [duration, setDuration] = useState(0);
    const [curTime, setCurTime] = useState(0);
    const [clickedTime, setClickedTime] = useState<number>(0);

    useEffect(() => {
        const setAudioTime = () => setCurTime(audio.current!.currentTime);

        audio.current!.addEventListener('timeupdate', setAudioTime);

        if (clickedTime && clickedTime !== curTime) {
            audio.current!.currentTime = clickedTime;
            // @ts-ignore
            setClickedTime(null);
        }

        // effect cleanup
        return () => {
            audio.current!.removeEventListener('timeupdate', setAudioTime);
        };
    }, [clickedTime]);

    useEffect(() => {
        const setAudioData = () => {
            console.log({
                currentTime: audio.current!.currentTime,
                duration: audio.current!.duration,
                audio: audio.current,
            });
            setDuration(audio.current!.duration);
            setCurTime(audio.current!.currentTime);
        };
        // audio.current!.addEventListener('loadeddata', setAudioData);
        audio.current?.addEventListener('loadedmetadata', setAudioData);
        return () => {
            audio.current!.removeEventListener('loadeddata', setAudioData);
        };
    }, []);

    return {
        curTime,
        duration,
        setClickedTime,
    };
}

export default useAudioPlayer;
