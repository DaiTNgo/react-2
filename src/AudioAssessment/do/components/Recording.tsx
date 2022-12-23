import React, {useRef, useState} from "react";
import Micro from "../../../Icons/Micro";

//@ts-ignore
function createAudioMeter(audioContext, clipLevel, averaging, clipLag) {
  const processor = audioContext.createScriptProcessor(512);
  processor.onaudioprocess = volumeAudioProcess;
  processor.clipping = false;
  processor.lastClip = 0;
  processor.volume = 0;
  processor.clipLevel = clipLevel || 0.98;
  processor.averaging = averaging || 0.95;
  processor.clipLag = clipLag || 750;

  // this will have no effect, since we don't copy the input to the output,
  // but works around a current Chrome bug.
  processor.connect(audioContext.destination);

  processor.checkClipping = function () {
    if (!this.clipping) return false;
    if (this.lastClip + this.clipLag < window.performance.now())
      this.clipping = false;
    return this.clipping;
  };

  processor.shutdown = function () {
    this.disconnect();
    this.onaudioprocess = null;
  };

  return processor;
}

function volumeAudioProcess(event: any) {
  var buf = event.inputBuffer.getChannelData(0);
  var bufLength = buf.length;
  var sum = 0;
  var x;

  // Do a root-mean-square on the samples: sum up the squares...
  // for (var i = 0; i < bufLength; i++) {
  //   x = buf[i];
  //   if (Math.abs(x) >= this.clipLevel) {
  //     this.clipping = true;
  //     this.lastClip = window.performance.now();
  //   }
  //   sum += x * x;
  // }
  //
  // // ... then take the square root of the sum.
  // var rms = Math.sqrt(sum / bufLength);
  //
  // // Now smooth this out with the averaging factor applied
  // // to the previous sample - take the max here because we
  // // want "fast attack, slow release."
  // this.volume = Math.max(rms, this.volume * this.averaging);
}

function Recording() {
  const stopped = useRef(false);
  const shouldStop = useRef(false);
  const canvasContext = useRef(null);

  const downloadLink = useRef(null); // document.getElementById('download');
  const [level, setLevel] = useState(0);
  const startRecord = () => {
    stopped.current = false;
  };

  const stopRecord = () => {
    stopped.current = true;
    shouldStop.current = false;
  };

  const audioRecordConstraints = {
    echoCancellation: true,
  };

  const handleRecord = ({ stream, mimeType }: any) => {
    startRecord();

    let recordedChunks: any = [];

    const audioContext = new AudioContext();
    const mediaStreamSource = audioContext.createMediaStreamSource(stream);

    //-------------------
    const analyser = audioContext.createAnalyser();

    // analyser.fftSize = 2048 * 2;
    analyser.fftSize = 2048;
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    analyser.getByteTimeDomainData(dataArray);

    console.log("FPR:::analyser", analyser);
    //=================
    analyser.smoothingTimeConstant = 1;

    const signalData = new Float32Array(analyser.fftSize);

    mediaStreamSource.connect(audioContext.destination);

    mediaStreamSource.connect(analyser);
    // mediaStreamSource.connect(analyser);
    // Create a new volume meter and connect it.
    // meter = createAudioMeter(audioContext);
    // mediaStreamSource.connect(meter);
    // console.log('volumn', meter.volume);
    // kick off the visual updating
    // drawLoop();
    //-------------------
    // mediaStreamSource.connect(audioContext);

    const mediaRecorder = new MediaRecorder(stream);

    mediaRecorder.ondataavailable = function (e) {
      // console.log('-------');
      // console.log(e);
      // console.log('-------');
      if (e.data.size > 0) {
        recordedChunks.push(e.data);
        // const level = meter.volume * 10 * 2;
        // @ts-ignore
        console.log(mediaStreamSource.context.outputLatency);
        // console.log('volumn', meter.volume * 10 * 2);
        // setLevel(level);
      }

      if (shouldStop.current === true && stopped.current === false) {
        mediaRecorder.stop();
        stopped.current = true;
      }
    };

    mediaRecorder.onstop = () => {
      const blob = new Blob(recordedChunks, {
        type: mimeType,
      });
      recordedChunks = [];
      const filename = window.prompt("Enter file name");
      // @ts-ignore
      downloadLink.current.href = URL.createObjectURL(blob);
      // @ts-ignore
      downloadLink.current.download = `${filename || "recording"}.wav`;
      stopRecord();
    };

    mediaRecorder.start(200);
  };

  const recordAudio = async () => {
    const mimeType = "audio/wav";
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: audioRecordConstraints,
    });
    handleRecord({ stream, mimeType });
  };

  const drawLoop = (time: any) => {
    // clear the background
    // canvasContext.current.clearRect(0, 0, WIDTH, HEIGHT);
    // check if we're currently clipping
    // if (meter.checkClipping()) canvasContext.current.fillStyle = 'red';
    // else canvasContext.fillStyle = 'green';
    // draw a bar based on the current volume
    // canvasContext.current.fillRect(0, 0, meter.volume * WIDTH * 1.4, HEIGHT);
    // set up the next visual callback
    // rafID = window.requestAnimationFrame(drawLoop);
  };
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
                        backgroundColor: level > index ? "gray" : "white",
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
              00:07
            </div>
          </div>
        </div>
      </div>

      <div className="container mt-3">
        {/*<span>*/}
        {/*  <a ref={downloadLink}>*/}
        {/*    <button type="button" className="btn btn-primary mb-4">*/}
        {/*      Download*/}
        {/*    </button>*/}
        {/*  </a>*/}
        {/*</span>*/}
        <button
          onClick={() => (shouldStop.current = true)}
          type="button"
          className="btn btn-danger"
          style={{
            border: "1px solid",
            padding: 4,
          }}
        >
          Stop
        </button>
        <button
          type="button"
          onClick={recordAudio}
          className="btn btn-info"
          style={{
            border: "1px solid",
            padding: 4,
          }}
        >
          Record Audio
        </button>
      </div>
    </div>
  );
}

export default Recording;
