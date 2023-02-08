import React, {useState} from "react";
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
import Volume from "../components/Volume";

function Review() {
    const { data, urlRecordStudent, layout } = useAudioAssessmentContext();
    const { direction: componentDirection, pathAudio } = getDirections(data);
    const contentHeaderFooter = getContentHeaderFooter(data);
    const phonicsAssessmentType = getPhonicsAssessmentType(data);
    const [dataSource, setDataSource] = useImmer(() => {
        return getResultData(data);
    });
    const [isPlayDirection, setIsPlayDirection] = useState(true);


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
                <div className="flex items-start gap-1 relative mb-8">
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
                {showAudio && (
                    <div className={"fpr-audio"}>
                        <p className={"fpr-audio__title"}>Recorded Content</p>
                        <div className={"flex items-center gap-4 mt-2"}>
                            <Audio src={urlRecordStudent} onPermissionAllowPlayingDirection={(is:boolean)=>{
                                setIsPlayDirection(is)
                            }} />
                        </div>
                    </div>
                )}

                <Table dataSource={dataSource} columns={columns} />
            </Layout>
        </SIndex>
    );
}

export default Review;
