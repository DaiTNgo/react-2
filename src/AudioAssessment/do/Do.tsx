import AudioAssessmentTemplate from "../components/template/AudioAssessmentTemplate";
import Slider from "../components/Slider";
import { useAudioAssessmentContext } from "../ContextAudioAssessment";
import { getListWord } from "../utils/convertLayout";
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

function useSubmitAssessment() {
    const { changeStatusAudio, statusAudio } = useStoreAudio();
    const [counter, setCounter] = useRecoilState(counterState);

    const increaseCounter = () => {
        setCounter((previous) => previous + 1);
    };

    const isStarting =
        statusAudio === StatusAudio.PLAY ||
        statusAudio === StatusAudio.PAUSE ||
        statusAudio === StatusAudio.RESUME;

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
        if (counter >= TIME_RECORD_STANDARD && isStarting) {
            changeStatusAudio(StatusAudio.STOP);
        }
    }, [counter, isStarting]);
}

function DoAssessment() {
    const [counter, setCounter] = useRecoilState(counterState);
    const [isAllowMic, setIsAllowMic] = useState(true);

    const stopped = useRef(false);

    const { changeStatusAudio, statusAudio } = useStoreAudio();
    const { currentSlide } = useStoreSlider();

    const { data } = useAudioAssessmentContext();
    const { openModal, destroyModal } = useModalContext();

    useSubmitAssessment();

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
        sendToParent({ action: ACTION_POST_MESSAGE.FPR_START_RECORDING });
    };

    const handleStopAudio = () => {
        sendToParent({
            action: ACTION_POST_MESSAGE.FPR_PAUSE_RECORDING,
        });

        openModal(<ModalSubmit onSubmit={handleSubmitAssignment} />);
    };

    const handlePauseAudio = () => {
        sendToParent({
            action: ACTION_POST_MESSAGE.FPR_PAUSE_RECORDING,
        });

        const handleResume = () => {
            openModal(
                <ModalCountDown
                    startRecording={() => {
                        changeStatusAudio(StatusAudio.RESUME);
                    }}
                />
            );
        };

        openModal(
            <ModalPause onResume={handleResume} onSave={handleSaveAssessment} />
        );
    };
    const handleResumeAudio = () => {
        sendToParent({
            action: ACTION_POST_MESSAGE.FPR_RESUME_RECORDING,
        });
    };

    const statusAudioStrategy = new Map<StatusAudio, Function>([
        [StatusAudio.PLAY, handlePlayAudio],
        [StatusAudio.STOP, handleStopAudio],
        [StatusAudio.PAUSE, handlePauseAudio],
        [StatusAudio.RESUME, handleResumeAudio],
        [StatusAudio.IDLE, noop],
    ]);

    useEffect(() => {
        const cb = statusAudioStrategy.get(statusAudio);

        if (cb) {
            cb();
        }
    }, [statusAudio]);

    useListenPostMessage(
        (e) => {
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
                case ACTION_POST_MESSAGE.FPR_CLICK_LOGO:
                    changeStatusAudio(StatusAudio.PAUSE);
                    break;
                case ACTION_POST_MESSAGE.FPR_CLICK_BACK:
                    if (
                        statusAudio === StatusAudio.PLAY ||
                        statusAudio === StatusAudio.RESUME
                    ) {
                        changeStatusAudio(StatusAudio.PAUSE);
                    }
                    break;
                default:
                    break;
            }
        },
        [statusAudio]
    );

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
                <Direction isPlayDirection={statusAudio === StatusAudio.IDLE} />
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
                        <Recording stopped={stopped} blink={false} />
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
            />
        </AudioAssessmentTemplate>
    );
}

export default DoAssessment;
