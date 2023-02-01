import Footer from "../components/Footer";
import Header from "../components/Header";
import Layout from "../components/Layout";
import Slider from "../components/Slider";
import { useAudioAssessmentContext } from "../ContextAudioAssessment";
import { SIndex } from "../styled/view";
import {
    getContentHeaderFooter,
    getDirections,
    getListWord,
} from "../utils/convertLayout";
import React, { useCallback, useEffect, useRef, useState } from "react";
import Recording, { TIME_RECORD_STANDARD } from "./components/Recording";
import Record from "./components/Record";
import { useStoreSlider } from "../store/slider";
import styled from "styled-components";
import { sendToParent } from "../../helper";
import { ACTION_POST_MESSAGE } from "../../enums/action";
import Volume from "../components/Volume";
import { useListenPostMessage } from "../hooks/useListenPostMessage";

function DoAssessment() {
    const [isStarting, setIsStarting] = useState(false);
    const [blink, setBlink] = useState(false);
    const [needStopDirections, setNeedStopDirections] = useState(false);

    const stopped = useRef(false);

    const { data } = useAudioAssessmentContext();

    const { changeSlide } = useStoreSlider();

    const startRecording = useCallback(() => {
        setIsStarting(true);
        changeSlide(0);
        setNeedStopDirections(true);
    }, []);

    const listWord = getListWord(data);
    const { direction: componentDirection, pathAudio } = getDirections(data);
    const contentHeaderFooter = getContentHeaderFooter(data);

    const handleSubmitAssignment = () => {
        setBlink(false);
        setIsStarting(false);
        sendToParent({
            action: ACTION_POST_MESSAGE.FPR_SUBMIT_AUDIO_ASSESSMENT,
        });
    };

    useEffect(() => {
        if (!isStarting) return;
        const id = setTimeout(() => {
            handleSubmitAssignment();
        }, TIME_RECORD_STANDARD * 1000);

        const PERCENT_NEED_BLINK = 3 / 4;
        const idBlink = setTimeout(() => {
            setBlink(true);
        }, TIME_RECORD_STANDARD * 1000 * PERCENT_NEED_BLINK);

        return () => {
            clearTimeout(id);
            clearTimeout(idBlink);
        };
    }, [isStarting]);

    useListenPostMessage(
        (event) => {
            switch (event.data.action) {
                case ACTION_POST_MESSAGE.FPR_START_RECORDING:
                    startRecording();
                    break;
                default:
                    break;
            }
        },
        [startRecording]
    );

    return (
        <SIndex>
            <Layout
                footer={<Footer content={contentHeaderFooter} />}
                header={<Header content={contentHeaderFooter} />}
            >
                <div className="flex items-start gap-1 wrapper relative">
                    <Volume
                        // src={"https://cqa2.sadlierconnect.com" + pathAudio}
                        src={
                            "https://cqa.sadlierconnect.com/content/803001/007743417/direction-line.mp3"
                        }
                        stopDirections={needStopDirections}
                    />
                    <div
                        dangerouslySetInnerHTML={{
                            __html: componentDirection,
                        }}
                    />
                </div>
                <Wrapper>
                    {isStarting ? (
                        <Recording
                            numOfWord={listWord.length}
                            stopped={stopped}
                            blink={blink}
                        />
                    ) : (
                        <Record
                            onClick={() => {
                                sendToParent({
                                    action: ACTION_POST_MESSAGE.FPR_START_RECORDING,
                                });
                            }}
                        />
                    )}
                </Wrapper>

                <Slider
                    onSubmitAssignment={handleSubmitAssignment}
                    title={data.resource.title}
                    needShowWord={isStarting}
                    data={listWord}
                    isStarting={isStarting}
                    stopped={stopped}
                />
            </Layout>
        </SIndex>
    );
}

export default DoAssessment;

const Wrapper = styled.div`
    display: grid;
    place-content: center;
    text-align: center;
`;
