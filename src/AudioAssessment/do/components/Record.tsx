import React, { MutableRefObject, useCallback, useEffect } from "react";
import Micro from "../../../Icons/Micro";
import { RecordContainer } from "./styled";
function download(payload: any, name: string) {
    const achor = document.createElement("a");
    document.body.append(achor);
    // const file = new Blob([JSON.stringify(payload)], { type: "text/plain" });
    const url = URL.createObjectURL(payload);
    achor.href = url;
    achor.download = name;
    achor.click();
    URL.revokeObjectURL(url);
    document.body.removeChild(achor);
}

function Record({
    stoppedRef,
    pauseRef,
    onClick,
}: {
    onClick: () => void;
    stoppedRef: MutableRefObject<boolean>;
    pauseRef: MutableRefObject<boolean>;
}) {
    const allowMicrophone = async () => {
        const audioRecordConstraints = {
            echoCancellation: true,
        };
        return await window.navigator.mediaDevices.getUserMedia({
            audio: audioRecordConstraints,
        });
    };

    const getStreamAudio = async (): Promise<MediaStream | null> => {
        try {
            return await allowMicrophone();
        } catch (err) {
            return null;
        }
    };

    const handleStartRecording = async () => {
        const stream = await getStreamAudio();
        if (stream) {
            recordAudio(stream);
        }
    };

    const handleRecord = useCallback(({ stream, mimeType }: any) => {
        let recordedChunks: any = [];

        const audioContext = new AudioContext();
        const mediaStreamSource = audioContext.createMediaStreamSource(stream);

        const analyser = audioContext.createAnalyser();
        analyser.fftSize = 2048;
        analyser.smoothingTimeConstant = 1;

        const signalData = new Float32Array(analyser.fftSize);

        mediaStreamSource.connect(analyser);

        const mediaRecorder = new MediaRecorder(stream);

        const onRecord = (e: BlobEvent) => {
            console.log("onRecord", e.data.size, mediaRecorder.state);
            if (e.data.size > 0) {
                recordedChunks.push(e.data);
                analyser.getFloatTimeDomainData(signalData);
            }
            if (
                stoppedRef.current &&
                (mediaRecorder.state == "recording" ||
                    mediaRecorder.state == "paused")
            ) {
                mediaRecorder.stop();
            }
        };
        mediaRecorder.addEventListener("dataavailable", onRecord);

        // mediaRecorder.addEventListener("start", (e) => {
        //     console.log("start", e);
        // });
        mediaRecorder.addEventListener("stop", () => {
            console.log("stop");
            const blob = new Blob(recordedChunks, {
                type: mimeType,
            });
            recordedChunks = [];
            const fileName = prompt("enter file name");
            download(blob, fileName);
        });

        window.addEventListener("pauseEvent", () => {
            console.log("-----pauseEvent-----");
            mediaRecorder.pause();
        });

        window.addEventListener("resumeEvent", () => {
            console.log("-----resumeEvent-----");
            mediaRecorder.resume();
        });

        mediaRecorder.start(200);
    }, []);

    const recordAudio = useCallback(
        (stream: MediaStream) => {
            if (stream) {
                const mimeType = "audio/wav";
                handleRecord({ stream, mimeType });
            }
        },
        [handleRecord]
    );

    return (
        <RecordContainer
            className="do-assignment-record"
            onClick={() => {
                onClick();
                handleStartRecording();
            }}
        >
            <div className="micro-container cursor-pointer">
                <Micro />
            </div>
            <p className="record-container">Record</p>
        </RecordContainer>
    );
}

export default Record;
