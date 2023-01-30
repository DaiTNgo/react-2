import React, {
    MutableRefObject,
    useCallback,
    useEffect,
    useState,
} from "react";
import Micro from "../../../Icons/Micro";
import { MimeTypeAudio } from "../../../enums/mime-type-audio";
import { className, formatTimeToMMSS } from "../../../helper";
import S from "./styles.module.scss";

export const TIME_RECORD_STANDARD = 120;

function rootMeanSquaredSignal(data: any) {
    let rms = 0;
    for (let i = 0; i < data.length; i++) {
        rms += data[i] * data[i];
    }
    return Math.sqrt(rms / data.length);
}

interface Props {
    numOfWord: number;
    onSubmitAssignment: (file: Blob) => void;
    stopped: MutableRefObject<boolean>;
    blink: boolean;
}

function Recording({ onSubmitAssignment, stopped, blink }: Props) {
    const [level, setLevel] = useState(0);

    const audioRecordConstraints = {
        echoCancellation: true,
    };

    const handleRecord = useCallback(({ stream, mimeType }: any) => {
        let recordedChunks: any = [];

        const audioContext = new AudioContext();
        const mediaStreamSource = audioContext.createMediaStreamSource(stream);

        const analyser = audioContext.createAnalyser();
        analyser.fftSize = 2048;
        analyser.smoothingTimeConstant = 1;

        const signalData = new Float32Array(analyser.fftSize);

        // mediaStreamSource.connect(audioContext.destination);

        mediaStreamSource.connect(analyser);
        //-------------------
        // mediaStreamSource.connect(audioContext);

        const mediaRecorder = new MediaRecorder(stream);

        const onRecord = (e: BlobEvent) => {
            if (e.data.size > 0) {
                recordedChunks.push(e.data);
                analyser.getFloatTimeDomainData(signalData);
                const meter = rootMeanSquaredSignal(signalData);
                const dim = 100;
                const size = dim * meter; // max:24 => / 2 => 12;
                setLevel(Math.floor(size / 2));
            }
            if (
                stopped.current === true &&
                mediaRecorder.state == "recording"
            ) {
                mediaRecorder.stop();
                setLevel(0);
            }
        };
        mediaRecorder.addEventListener("dataavailable", onRecord);
        mediaRecorder.addEventListener("stop", () => {
            const blob = new Blob(recordedChunks, {
                type: mimeType,
            });
            recordedChunks = [];
            onSubmitAssignment(blob);
        });

        mediaRecorder.start(200);
    }, []);

    const recordAudio = useCallback(async () => {
        const mimeType = MimeTypeAudio.WAV;
        try {
            const stream = await window.navigator.mediaDevices.getUserMedia({
                audio: audioRecordConstraints,
            });
            handleRecord({ stream, mimeType });
        } catch (e: any) {
            console.log("[ERR]", e);
        }
    }, [handleRecord]);

    useEffect(() => {
        recordAudio();
    }, [recordAudio]);

    return (
        <div
            style={{
                display: "inline-block",
            }}
        >
            <div className={"flex items-center gap-2 relative"}>
                <div
                    style={{
                        top: 45,
                        left: -60,
                    }}
                    className={"absolute"}
                >
                    <Micro width={50} height={50} />
                </div>
                <div className={"flex flex-col items-center gap-2"}>
                    <div className={`${className(S.Recording)}`}>
                        Recording
                        <div>
                            <span className={className(S.Dot, S["Dot-1"])} />
                            <span className={className(S.Dot, S["Dot-2"])} />
                            <span className={className(S.Dot, S["Dot-3"])} />
                        </div>
                    </div>
                    <div
                        style={{
                            padding: "16px 20px",
                            borderRadius: 10,
                        }}
                        className={className(blink ? S.Blink : S.NotBlink)}
                    >
                        <div
                            style={{
                                display: "flex",
                                gap: 10,
                            }}
                        >
                            {Array(12)
                                .fill(0)
                                .map((_, index) => {
                                    return (
                                        <div
                                            key={index}
                                            style={{
                                                width: 14,
                                                height: 32,
                                                borderRadius: 999999,
                                                backgroundColor:
                                                    level > index
                                                        ? "#cacaca"
                                                        : "white",
                                                border: "1px solid #707070",
                                            }}
                                        ></div>
                                    );
                                })}
                        </div>
                        <div
                            className={"time"}
                            style={{
                                marginTop: 6,
                                fontSize: 18,
                            }}
                        >
                            <Time stopped={stopped} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function Time({ stopped }: { stopped: MutableRefObject<boolean> }) {
    const [count, setCount] = useState(0);
    useEffect(() => {
        if (stopped.current) return;

        const id = setInterval(() => {
            setCount((c) => c + 1);
        }, 1000);

        return () => {
            clearInterval(id);
        };
    }, [stopped.current]);

    if (count > TIME_RECORD_STANDARD) {
        return <>{formatTimeToMMSS(TIME_RECORD_STANDARD)}</>;
    }
    return <>{formatTimeToMMSS(count)}</>;
}

export default Recording;
