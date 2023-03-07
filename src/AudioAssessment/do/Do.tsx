import AudioAssessmentTemplate from "../components/template/AudioAssessmentTemplate";
import Slider from "../components/Slider";
import { useAudioAssessmentContext } from "../ContextAudioAssessment";
import { getDirections, getListWord } from "../utils/convertLayout";
import React, {
    Dispatch,
    SetStateAction,
    useEffect,
    useRef,
    useState,
} from "react";
import Recording, { TIME_RECORD_STANDARD } from "./components/Recording";
import Record from "./components/Record";
import { sendToParent } from "../../helper";
import { ACTION_POST_MESSAGE } from "../../enums/action";
import Volume from "../components/Volume";
import { useModalContext } from "../../context/ModalContext";
import ModalCountDown from "./components/ModalCountDown";
import { Else, If, Then } from "react-if";
import { useStoreAudio } from "../store/audio";
import { StatusAudio } from "../../enums/status-machine";
import { noop } from "lodash";
import { useStoreCounter } from "../store/counter";

function useSubmitAssessment(setBlink: Dispatch<SetStateAction<boolean>>) {
    const { changeStatusAudio, statusAudio } = useStoreAudio();
    const { increaseCounter, counter } = useStoreCounter();

    useEffect(() => {
        if (
            statusAudio === StatusAudio.PLAY ||
            statusAudio === StatusAudio.RESUME
        ) {
            const id = setInterval(() => {
                increaseCounter();
            }, 1000);

            return () => {
                clearInterval(id);
            };
        }
    }, [statusAudio]);

    useEffect(() => {
        const PERCENT_NEED_BLINK = 3 / 4;

        if (counter === TIME_RECORD_STANDARD) {
            changeStatusAudio(StatusAudio.STOP);
        }

        if (counter === Math.floor(TIME_RECORD_STANDARD * PERCENT_NEED_BLINK)) {
            setBlink(true);
        }
    }, [counter]);
}

function DoAssessment() {
    const [blink, setBlink] = useState(false);
    const [isPlayDirection, setIsPlayDirection] = useState(true);

    const stopped = useRef(false);

    const { changeStatusAudio, statusAudio } = useStoreAudio();

    const isStarting =
        statusAudio === StatusAudio.PLAY ||
        statusAudio === StatusAudio.PAUSE ||
        statusAudio === StatusAudio.RESUME;

    useSubmitAssessment(setBlink);

    const { data } = useAudioAssessmentContext();
    const { openModal } = useModalContext();

    const listWord = getListWord(data);
    const { direction: componentDirection, pathAudio } = getDirections(data);

    const startRecording = () => {
        changeStatusAudio(StatusAudio.PLAY);
    };

    const handleSubmitAssignment = () => {
        changeStatusAudio(StatusAudio.STOP);
    };

    const handleClickRecord = () => {
        openModal(<ModalCountDown startRecording={startRecording} />);
    };

    const handlePlayAudio = () => {
        setIsPlayDirection(false);

        sendToParent({ action: ACTION_POST_MESSAGE.FPR_START_RECORDING });
    };

    const handleStopAudio = () => {
        setBlink(false);
        sendToParent({
            action: ACTION_POST_MESSAGE.FPR_SUBMIT_AUDIO_ASSESSMENT,
        });
    };

    const handlePauseAudio = () => {
        sendToParent({
            action: ACTION_POST_MESSAGE.FPR_PAUSE_RECORDING,
        });
    };
    const handleResumeAudio = () => {
        sendToParent({
            action: ACTION_POST_MESSAGE.FPR_RESUME_RECORDING,
        });
    };

    const statusAudioStrategy = new Map([
        [StatusAudio.PLAY, handlePlayAudio],
        [StatusAudio.STOP, handleStopAudio],
        [StatusAudio.PAUSE, handlePauseAudio],
        [StatusAudio.RESUME, handleResumeAudio],
        [StatusAudio.IDLE, noop],
        ["default", noop],
    ]);

    useEffect(() => {
        const cb =
            statusAudioStrategy.get(statusAudio) ||
            statusAudioStrategy.get("default");

        if (cb) {
            cb();
        }
    }, [statusAudio]);

    return (
        <AudioAssessmentTemplate>
            <div className="flex items-start gap-1 wrapper relative">
                <Volume
                    // src={"https://cqa2.sadlierconnect.com" + pathAudio}
                    src={
                        "https://cqa.sadlierconnect.com/content/803001/007743417/direction-line.mp3"
                    }
                    isPlayDirection={isPlayDirection}
                />
                <div
                    dangerouslySetInnerHTML={{
                        __html: componentDirection,
                    }}
                />
            </div>
            <div className={"grid place-content-center text-center"}>
                <If
                    condition={
                        statusAudio === StatusAudio.PLAY ||
                        statusAudio === StatusAudio.PAUSE ||
                        statusAudio === StatusAudio.RESUME
                    }
                >
                    <Then>
                        <Recording
                            numOfWord={listWord.length}
                            stopped={stopped}
                            blink={blink}
                        />
                    </Then>
                    <Else>
                        <Record onClick={handleClickRecord} />
                    </Else>
                </If>
            </div>

            <Slider
                onSubmitAssignment={handleSubmitAssignment}
                title={data.resource.title}
                needShowWord={isStarting}
                data={listWord}
                isStarting={isStarting}
                stopped={stopped}
            />
        </AudioAssessmentTemplate>
    );
}

export default DoAssessment;
