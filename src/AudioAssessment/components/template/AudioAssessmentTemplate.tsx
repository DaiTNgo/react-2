import React from "react";
import Footer from "../Footer";
import { getContentHeaderFooter } from "../../utils/convertLayout";
import { useAudioAssessmentContext } from "../../ContextAudioAssessment";
import Header from "../Header";
import * as S from "./styled";
import { Container } from "./styled";

interface Props {
    children: React.ReactNode;
}
function AudioAssessmentTemplate({ children }: Props) {
    const { data } = useAudioAssessmentContext();

    const contentHeaderFooter = getContentHeaderFooter(data);

    return (
        <S.Container>
            <S.Div>
                <Header content={contentHeaderFooter} />
                <div className="layout-container flex flex-col justify-between">
                    <div>{children}</div>
                    <Footer content={contentHeaderFooter} />
                </div>
            </S.Div>
        </S.Container>
    );
}

export default AudioAssessmentTemplate;
