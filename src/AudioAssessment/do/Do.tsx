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
import { useModalContext } from "../../context/ModalContext";
import ModalCountDown from "./components/modal/ModalCountDown";
import { Else, If, Then } from "react-if";
import { useStoreAudio } from "../store/audio";
import { StatusAudio } from "../../enums/status-machine";
import { noop } from "lodash";
import ModalSubmit from "./components/modal/ModalSubmit";
import { useListenPostMessage } from "../hooks/useListenPostMessage";
import ModalPause from "./components/modal/ModalPause";
import { atom, useRecoilState } from "recoil";
import { useStoreSlider } from "../store/slider";
import ModalAllowAudio from "./components/modal/ModalAllowAudio";
import RecordingDontAllowMic from "./components/RecordingDontAllowMic";
import Direction from "../components/Direction";

const isAllowMicState = atom({
    key: "isAllowMicState",
    default: false,
});

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
    const [isAllowMic, setIsAllowMic] = useRecoilState(isAllowMicState);

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

    useEffect(() => {
        if (data.submissionMetadata?.t && data.submissionMetadata?.t !== -1)
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
            case ACTION_POST_MESSAGE.FPR_ALLOW_MIC:
                setIsAllowMic(true);
                break;
            case ACTION_POST_MESSAGE.FPR_DONT_ALLOW_MIC:
                setIsAllowMic(false);
                break;
            default:
                break;
        }
    });

    useEffect(() => {
        handleOpenModalAllowMicro();
    }, []);

    const handleOpenModalAllowMicro = () => {
        const handleAllowAudio = (isAllow: boolean) => {
            sendToParent({
                action: isAllow
                    ? ACTION_POST_MESSAGE.FPR_ALLOW_MIC
                    : ACTION_POST_MESSAGE.FPR_DONT_ALLOW_MIC,
            });

            destroyModal();
        };

        openModal(<ModalAllowAudio onAllow={handleAllowAudio} />);
    };
    return (
        <AudioAssessmentTemplate>
            <div
            // style={{
            //     marginInline: "auto",
            //     maxWidth: "670px",
            // }}
            >
                <Direction />
            </div>

            <div className={"grid place-content-center text-center my-4"}>
                <If
                    condition={
                        statusAudio === StatusAudio.PLAY ||
                        statusAudio === StatusAudio.PAUSE ||
                        statusAudio === StatusAudio.RESUME
                    }
                >
                    <Then>
                        <Recording stopped={stopped} blink={blink} />
                    </Then>
                    <Else>
                        <If condition={isAllowMic}>
                            <Then>
                                <Record onClick={handleClickRecord} />
                            </Then>
                            <Else>
                                <div className={"mt-4"}>
                                    <RecordingDontAllowMic
                                        onAllowMicro={handleOpenModalAllowMicro}
                                    />
                                </div>
                            </Else>
                        </If>
                    </Else>
                </If>
            </div>

            <Slider
                onSubmitAssignment={stopRecording}
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
