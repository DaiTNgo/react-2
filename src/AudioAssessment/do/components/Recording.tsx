import React, {
    MutableRefObject,
    useCallback,
    useEffect,
    useRef,
    useState,
} from "react";
import Micro from "../../../Icons/Micro";

export const TIME_RECORD_STANDARD = 20;

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

    const handleRecord = useCallback(({ stream, mimeType }: any) => {
        debugger;

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
                console.log("hihihhiiiiiiiiiiiiiii");
                mediaRecorder.stop();
                setLevel(0);
            }
        };
        mediaRecorder.ondataavailable = (e) => {
            debugger;
            if (e.data.size > 0) {
                console.log("recordinggggggg");
                recordedChunks.push(e.data);
                analyser.getFloatTimeDomainData(signalData);
                const meter = rootMeanSquaredSignal(signalData);
                const dim = 100;
                const size = dim * meter; // max:24 => / 2 => 12;
                setLevel(Math.floor(size / 2));

                debugger;
            }

            if (
                stopped.current === true &&
                mediaRecorder.state == "recording"
            ) {
                console.log("stoppingggggggg");
                mediaRecorder.stop();
                setLevel(0);

                debugger;
            }
        };
        // mediaRecorder.addEventListener('dataavailable', (e: BlobEvent) => {
        //   if (e.data.size > 0) {
        //     console.log('recordinggggggg');
        //     recordedChunks.push(e.data);
        //     analyser.getFloatTimeDomainData(signalData);
        //     const meter = rootMeanSquaredSignal(signalData);
        //     const dim = 100;
        //     const size = dim * meter; // max:24 => / 2 => 12;
        //     setLevel(Math.floor(size / 2));
        //   }
        //
        //   if (stopped.current === true && mediaRecorder.state == 'recording') {
        //     console.log('stoppingggggggg');
        //     mediaRecorder.stop();
        //     setLevel(0);
        //   }
        // });
        mediaRecorder.addEventListener("stop", () => {
            debugger;
            // mediaRecorder.onstop = () => {
            const blob = new Blob(recordedChunks, {
                type: mimeType,
            });
            recordedChunks = [];
            console.log("stop:::");
            // const filename = window.prompt("Enter file name");
            // // @ts-ignore
            // downloadLink.current.href = URL.createObjectURL(blob);
            // // @ts-ignore
            // downloadLink.current.download = `${filename || "recording"}.wav`;
            // stopRecord();
            onSubmitAssignment(blob);
            // };
        });

        mediaRecorder.start(200);
    }, []);

    const recordAudio = useCallback(async () => {
        debugger;
        // try {
        const mimeType = "audio/wav";
        const stream = await navigator.mediaDevices.getUserMedia({
            audio: audioRecordConstraints,
        });
        handleRecord({ stream, mimeType });
        // } catch (e: any) {
        //   console.log(e.name);
        // }
    }, [handleRecord]);

    useEffect(() => {
        recordAudio();
        debugger;
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
                    <div
                        style={{
                            display: "grid",
                            placeContent: "center",
                            fontWeight: 700,
                        }}
                    >
                        Recording...
                    </div>
                    <div
                        style={{
                            padding: "10px 20px",
                            backgroundColor: "#c7c7c7",
                            borderRadius: 10,
                        }}
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
                                                width: 10,
                                                height: 40,
                                                borderRadius: 999999,
                                                backgroundColor:
                                                    level > index
                                                        ? "gray"
                                                        : "white",
                                                border: "1px solid black",
                                            }}
                                        ></div>
                                    );
                                })}
                        </div>
                        <div
                            className={"time"}
                            style={{
                                marginTop: 2,
                            }}
                        >
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
