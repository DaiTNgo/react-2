import Volumn from "../../../assets/Icons/Volumn";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Layout from "../components/Layout";
import Slider from "../components/Slider";
import { useAudioAssessmentContext } from "../ContextAudioAssessment";
import { SIndex } from "../styled/view";
import { ResponseDefault } from "./type";
import { getContentHeaderFooter, getDirections, getListWord } from "./utils";
import { useCallback, useEffect, useRef, useState } from "react";
import Recording, { TIME_RECORD_STANDARD } from "./components/Recording";
import Record from "./components/Record";
import { useStoreSlider } from "../store/slider";
import styled from "styled-components";
import ModalSubmit from "./components/ModalSubmit";
import { useModalContext } from "../../../context/ModalContext";
import { sendToParent } from "../../../common/helper";
import { ACTION_POST_MESSAGE } from "../../../common/constant/action";

function DoAssessment() {
    const { data, studentAssignmentId } = useAudioAssessmentContext();
    const { openModal } = useModalContext();

    const [isStarting, setIsStarting] = useState(false);

    const { changeSlide } = useStoreSlider();

    const startRecording = useCallback(() => {
        setIsStarting(true);
        changeSlide(0);
    }, []);

    const listWord = getListWord(data as ResponseDefault);
    const componentDirection = getDirections(data as ResponseDefault);
    const contentHeaderFooter = getContentHeaderFooter(data as ResponseDefault);

    const handleSubmitAssignment = (file: any) => {
        // console.log("Recording:", file);
        const audioFile = new FormData();
        audioFile.append("audioFile", file);

        openModal(
            <ModalSubmit
                onSubmit={async () => {
                    try {
                        const accessToken = localStorage.getItem("accessToken");
                        const resp = await fetch(
                            `https://cqa2api.sadlierconnect.com/student/assignments/submissions?studentAssignmentId=${studentAssignmentId}&access_token=${accessToken}`,
                            {
                                method: "post",
                                body: audioFile,
                            }
                        );

                        //TODO: ANY THING;
                        sendToParent({
                            action: ACTION_POST_MESSAGE.FPR_NAVIGATE,
                        });
                    } catch (err) {}
                }}
            />
        );
    };

    const stopped = useRef(false);
    useEffect(() => {
        if (!isStarting) return;
        const id = setTimeout(() => {
            stopped.current = true;
        }, TIME_RECORD_STANDARD * 1000);
        return () => {
            clearTimeout(id);
        };
    }, [isStarting]);
    return (
        <SIndex>
            <Layout
                footer={<Footer content={contentHeaderFooter} />}
                header={<Header content={contentHeaderFooter} />}
            >
                <div className="flex items-start gap-1 wrapper">
                    <div className="cursor-pointer">
                        <Volumn />
                    </div>
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
                        />
                    ) : (
                        <Record startRecording={startRecording} />
                    )}
                </Wrapper>
                <Slider
                    title={data.resource.title}
                    data={listWord}
                    isStarting={isStarting}
                    // onSubmitAssignment={handleSubmitAssignment}
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
