import React, {
    MutableRefObject,
    useCallback,
    useEffect,
    useRef,
    useState,
} from "react";
import Micro from "../../../Icons/Micro";
import { ACTION_POST_MESSAGE } from "../../../enums/action";
import "./style.scss";

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
    onSubmitAssignment: (file: any) => void;
    stopped: MutableRefObject<boolean>;
}

function Recording({ onSubmitAssignment, stopped }: Props) {
    const [level, setLevel] = useState(0);

    const audioRecordConstraints = {
        echoCancellation: true,
    };

    // useEffect(() => {
    //     const fn = (event: any) => {
    //         if (!event.data) return;
    //         switch (event.data.action) {
    //             case ACTION_POST_MESSAGE.FPR_SEND_AUDIO:
    //                 console.log("FPR:::BODY", event.data.body);
    //                 break;
    //             default:
    //                 break;
    //         }
    //     };
    //     window.addEventListener("message", fn);
    //
    //     return () => {
    //         window.removeEventListener("message", fn);
    //     };
    // }, []);

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
        // mediaRecorder.ondataavailable = (e) => {
        //     if (e.data.size > 0) {
        //         recordedChunks.push(e.data);
        //         analyser.getFloatTimeDomainData(signalData);
        //         const meter = rootMeanSquaredSignal(signalData);
        //         const dim = 100;
        //         const size = dim * meter; // max:24 => / 2 => 12;
        //         setLevel(Math.floor(size / 2));
        //     }
        //
        //     if (
        //         stopped.current === true &&
        //         mediaRecorder.state == "recording"
        //     ) {
        //         console.log("stoppingggggggg");
        //         mediaRecorder.stop();
        //         setLevel(0);
        //     }
        // };
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
    const sendToParent = () => {
        debugger;
        window.parent.postMessage(
            {
                action: ACTION_POST_MESSAGE.FPR_GET_AUDIO,
            },
            "*"
        );
    };
    const recordAudio = useCallback(async () => {
        try {
            const mimeType = "audio/wav";
            // sendToParent();
            const stream =
                await window.self.navigator.mediaDevices.getUserMedia({
                    audio: audioRecordConstraints,
                });
            handleRecord({ stream, mimeType });
        } catch (e: any) {
            console.log("FPR:::", e.name);
        }
    }, [handleRecord]);

    useEffect(() => {
        recordAudio();
    }, [recordAudio]);

    return (
        <div className="recording-layout">
            <div className={"flex items-center gap-2 relative"}>
                <div className={"absolute micro-wrapper"}>
                    <Micro width={50} height={50} />
                </div>
                <div className={"flex flex-col items-center gap-2"}>
                    <div className="recording-container">Recording...</div>
                    <div className="recording-wrapper">
                        <div className="recording">
                            {Array(12)
                                .fill(0)
                                .map((_, index) => {
                                    return (
                                        <div
                                            key={index}
                                            className={`item ${
                                                level > index ? "active" : ""
                                            }`}
                                        ></div>
                                    );
                                })}
                        </div>
                        <div className={"time"}>
                            <Time stopped={stopped} />
                        </div>
                    </div>
                </div>
            </div>

            {/*<div className="container mt-3">*/}
            {/*  <span>*/}
            {/*    <a ref={downloadLink}>*/}
            {/*      <button type="button" className="btn btn-primary mb-4">*/}
            {/*        Download*/}
            {/*      </button>*/}
            {/*    </a>*/}
            {/*  </span>*/}
            {/*  <button*/}
            {/*    onClick={() => (shouldStop.current = true)}*/}
            {/*    type="button"*/}
            {/*    className="btn btn-danger"*/}
            {/*    style={{*/}
            {/*      border: "1px solid",*/}
            {/*      padding: 4,*/}
            {/*    }}*/}
            {/*  >*/}
            {/*    Stop*/}
            {/*  </button>*/}
            {/*  <button*/}
            {/*    type="button"*/}
            {/*    onClick={recordAudio}*/}
            {/*    className="btn btn-info"*/}
            {/*    style={{*/}
            {/*      border: "1px solid",*/}
            {/*      padding: 4,*/}
            {/*    }}*/}
            {/*  >*/}
            {/*    Record Audio*/}
            {/*  </button>*/}
            {/*</div>*/}
        </div>
    );
}
const convertValueToTime = (value: number) => {
    const minute = Math.floor(value / 60);
    let second: number | string = value % 60;
    second = second < 10 ? `0${second}` : second;

    return `0${minute}:${second}`;
};
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
    return <>{convertValueToTime(count)}</>;
}

export default Recording;
