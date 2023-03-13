import React, {
    forwardRef,
    useCallback,
    useEffect,
    useImperativeHandle,
    useRef,
} from "react";
import IconVolume from "../../Icons/IconVolume";
import { atom, useRecoilState } from "recoil";

type Props = {
    src: string;
    isPlayDirection?: boolean;
};

export const isStartAudioDirectionState = atom({
    key: "isStartAudioDirectionState",
    default: false,
});

function Volume({ src, isPlayDirection = true }: Props, ref: any) {
    const [starting, setStarting] = useRecoilState(isStartAudioDirectionState);
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
        if (isPlayDirection === false) {
            setStarting(false);
            refAudio.current!.pause();
        }
    }, [isPlayDirection]);

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

    useImperativeHandle(ref, () => {
        return refAudio.current;
    });

    return (
        <div onClick={handleStartAudio} className={"cursor-pointer"}>
            <IconVolume
                active={starting}
                fill={starting ? "#0ac32d" : "#999999"}
            />
            <audio controls={false} ref={refAudio} src={src}></audio>
        </div>
    );
}

export default forwardRef(Volume);
