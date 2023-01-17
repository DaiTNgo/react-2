import React from "react";
import { useAudioAssessmentContext } from "../ContextAudioAssessment";
import { getContentHeaderFooter, getDirections } from "../utils/convertLayout";
import { getPhonicsAssessmentType } from "../grade/utils";
import { useImmer } from "use-immer";
import { SIndex } from "../styled/view";
import Layout from "../components/Layout";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Table from "../../components/table";
import { getResultData } from "./utils";
import { useColumnsGrade } from "../hooks/useColumnsGrade";
import { OPTIONS_SURVEY } from "../../enums/survey";
import Audio from "../../components/Audio";

function Review() {
    const { data, urlRecordStudent, layout } = useAudioAssessmentContext();
    const { direction: componentDirection, pathAudio } = getDirections(data);
    const contentHeaderFooter = getContentHeaderFooter(data);
    const phonicsAssessmentType = getPhonicsAssessmentType(data);
    const [dataSource, setDataSource] = useImmer(() => {
        return getResultData(data);
    });

    const columns = useColumnsGrade({
        setDataSource,
        phonicsAssessmentType,
        layout,
    });

    const showAudio =
        data.assignment.surveyImplementOption ===
            OPTIONS_SURVEY.LEVEL_ONE.SELF_GUIDED ||
        data.assignment.surveyImplementOption ===
            OPTIONS_SURVEY.LEVEL_TWO.WITH_RECORD;

    return (
        <SIndex>
            <Layout
                footer={<Footer content={contentHeaderFooter} />}
                header={<Header content={contentHeaderFooter} />}
            >
                <div className="flex items-start gap-1 fpr__directions">
                    <div
                        dangerouslySetInnerHTML={{
                            __html: componentDirection,
                        }}
                    />
                </div>
                {showAudio && (
                    <div className={"fpr-audio"}>
                        <p className={"fpr-audio__title"}>Recorded Content</p>
                        <div className={"flex items-center gap-4 mt-2"}>
                            <Audio src={urlRecordStudent} />
                        </div>
                    </div>
                )}

                <Table dataSource={dataSource} columns={columns} />
            </Layout>
        </SIndex>
    );
}

export default Review;
