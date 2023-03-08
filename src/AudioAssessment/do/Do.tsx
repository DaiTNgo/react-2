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
import Recording, {
    counterState,
    TIME_RECORD_STANDARD,
} from "./components/Recording";
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
import ModalSubmit from "./components/ModalSubmit";
import { useListenPostMessage } from "../hooks/useListenPostMessage";
import ModalPause from "./components/ModalPause";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { useStoreSlider } from "../store/slider";

function useSubmitAssessment(setBlink: Dispatch<SetStateAction<boolean>>) {
    const { changeStatusAudio, statusAudio } = useStoreAudio();
    const [counter, setCounter] = useRecoilState(counterState);

    const increaseCounter = () => {
        setCounter((previous) => previous + 1);
    };

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
    const [isLastSlide, setIsLastSlide] = useState(false);

    // const setCounter = useSetRecoilState(counterState);
    const [counter, setCounter] = useRecoilState(counterState);
    // console.log("re-render");

    const stopped = useRef(false);

    const { changeStatusAudio, statusAudio } = useStoreAudio();
    const { currentSlide } = useStoreSlider();

    const { data } = useAudioAssessmentContext();
    const { openModal, destroyModal } = useModalContext();

    useSubmitAssessment(setBlink);

    const isStarting =
        statusAudio === StatusAudio.PLAY ||
        statusAudio === StatusAudio.PAUSE ||
        statusAudio === StatusAudio.RESUME;

    const listWord = getListWord(data);
    const { direction: componentDirection, pathAudio } = getDirections(data);

    useEffect(() => {
        setCounter(data.submissionMetadata?.t);
    }, [data]);

    const startRecording = () => {
        changeStatusAudio(StatusAudio.PLAY);
    };

    const stopRecording = () => {
        changeStatusAudio(StatusAudio.STOP);
    };

    const handleSaveAssessment = () => {
        sendToParent({
            action: ACTION_POST_MESSAGE.FPR_SAVE_AUDIO_ASSESSMENT,
            resp: {
                index: currentSlide,
                time: counter,
                pause: true,
                resume: !!data.submissionMetadata.pause,
            },
        });
    };

    const handleSubmitAssignment = () => {
        sendToParent({
            action: ACTION_POST_MESSAGE.FPR_SUBMIT_AUDIO_ASSESSMENT,
        });
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

        openModal(<ModalSubmit onSubmit={handleSubmitAssignment} />);
    };

    const handlePauseAudio = () => {
        sendToParent({
            action: ACTION_POST_MESSAGE.FPR_PAUSE_RECORDING,
        });

        openModal(
            <ModalPause
                onResume={() => {
                    changeStatusAudio(StatusAudio.RESUME);
                    destroyModal();
                }}
                onSave={handleSaveAssessment}
            />
        );
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

    useListenPostMessage((e) => {
        switch (e.data.action) {
            case ACTION_POST_MESSAGE.FPR_CLICK_SAVE:
                changeStatusAudio(StatusAudio.PAUSE);
                break;

            case ACTION_POST_MESSAGE.FPR_CLICK_SUBMIT:
                stopRecording();
                break;
            default:
                break;
        }
    });

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
                onSubmitAssignment={stopRecording}
                title={data.resource.title}
                needShowWord={isStarting}
                data={listWord}
                isStarting={isStarting}
                stopped={stopped}
                onLastSlide={() => {
                    setIsLastSlide(true);
                }}
            />
        </AudioAssessmentTemplate>
    );
}

export default DoAssessment;
