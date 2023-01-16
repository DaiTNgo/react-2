import Footer from "../components/Footer";
import Header from "../components/Header";
import Layout from "../components/Layout";
import Slider from "../components/Slider";
import { useAudioAssessmentContext } from "../ContextAudioAssessment";
import { SIndex } from "../styled/view";
import { ResponseDefault } from "../types";
import {
    getContentHeaderFooter,
    getDirections,
    getListWord,
} from "../utils/convertLayout";
import { useCallback, useEffect, useRef, useState } from "react";
import Recording, { TIME_RECORD_STANDARD } from "./components/Recording";
import Record from "./components/Record";
import { useStoreSlider } from "../store/slider";
import styled from "styled-components";
import { sendToParent } from "../../helper";
import { ACTION_POST_MESSAGE } from "../../enums/action";
import Volume from "../components/Volume";
import { useListenPostMessage } from "../hooks/useListenPostMessage";

function DoAssessment() {
    const { data } = useAudioAssessmentContext();

    const [isStarting, setIsStarting] = useState(false); //true
    const stopped = useRef(false);

    const [blink, setBlink] = useState(false);

    const { changeSlide } = useStoreSlider();

    const startRecording = useCallback(() => {
        setIsStarting(true);
        changeSlide(0);
    }, []);

    const listWord = getListWord(data);
    const { direction: componentDirection, pathAudio } = getDirections(data);
    const contentHeaderFooter = getContentHeaderFooter(data);

    const handleSubmitAssignment = (file: Blob) => {
        sendToParent({
            action: ACTION_POST_MESSAGE.FPR_SUBMIT_AUDIO_ASSESSMENT,
            resp: {
                file,
            },
        });
    };

    useEffect(() => {
        if (!isStarting) return;
        const id = setTimeout(() => {
            stopped.current = true;
        }, TIME_RECORD_STANDARD * 1000);

        const idBlink = setTimeout(() => {
            setBlink(true);
        }, TIME_RECORD_STANDARD * 1000 - 30000);
        return () => {
            clearTimeout(id);
            clearTimeout(idBlink);
        };
    }, [isStarting]);

    useListenPostMessage((event) => {
        switch (event.data.action) {
            case ACTION_POST_MESSAGE.FPR_SUBMIT_AUDIO_ASSESSMENT:
                if (isStarting) stopped.current = true;

                sendToParent({
                    action: ACTION_POST_MESSAGE.FPR_ASSIGNMENT_EXPIRED_TIME,
                });
                break;
            default:
                break;
        }
    });

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
                        isStartingRecord={isStarting}
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
                            onSubmitAssignment={handleSubmitAssignment}
                            numOfWord={listWord.length}
                            stopped={stopped}
                            blink={blink}
                        />
                    ) : (
                        <Record startRecording={startRecording} />
                    )}
                </Wrapper>

                <Slider
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
