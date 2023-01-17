import React, { useCallback, useEffect, useState } from "react";
import { useAudioAssessmentContext } from "../ContextAudioAssessment";
import { getContentHeaderFooter, getDirections } from "../utils/convertLayout";
import { getPhonicsAssessmentType, getScore } from "../grade/utils";
import { useImmer } from "use-immer";
import { sendToParent } from "../../helper";
import { ACTION_POST_MESSAGE } from "../../enums/action";
import styles from "../grade/grade.module.scss";
import { SIndex } from "../styled/view";
import Layout from "../components/Layout";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Table from "../../components/table";
import { getResultData } from "./utils";
import { useColumnsGrade } from "../hooks/useColumnsGrade";
import { OPTIONS_SURVEY } from "../../enums/survey";
import Audio from "../../components/Audio";
import IconSync from "../../Icons/Sync";
import { Button } from "../../components/button";
import useListScore from "../hooks/useListScore";
import { useListenPostMessage } from "../hooks/useListenPostMessage";
import Volume from "../components/Volume";

function ReGrade() {
    const { data, urlRecordStudent, layout } = useAudioAssessmentContext();
    const { direction: componentDirection, pathAudio } = getDirections(data);
    const contentHeaderFooter = getContentHeaderFooter(data);
    const phonicsAssessmentType = getPhonicsAssessmentType(data);

    const [selectedId, setSelectedId] = useState<number>(() => {
        return data?.speedScore || -1;
    });
    const [dataSource, setDataSource] = useImmer(() => {
        return getResultData(data);
    });

    const columns = useColumnsGrade({
        setDataSource,
        phonicsAssessmentType,
        layout,
    });

    const scores = getScore(dataSource);
    const { score, fluency, accuracy } = scores;

    const listScore = useListScore({
        scores,
        phonicsAssessmentType,
        selectedId,
        setSelectedId,
    });

    const handleSubmit = useCallback(() => {
        sendToParent({
            action: ACTION_POST_MESSAGE.FPR_SUBMIT_GRADING,
            resp: {
                gradingResults: dataSource,
                speedScore: selectedId,
                score,
                fluencyScore: fluency,
                accuracyScore: accuracy,
                isReGrading: true,
            },
        });
    }, [dataSource, selectedId]);

    const handleSyncAudio = useCallback(() => {
        sendToParent({
            action: ACTION_POST_MESSAGE.FPR_GET_SYNC_AUDIO,
        });
    }, []);

    useEffect(() => {
        // desc: for change student grade
        setDataSource(getResultData(data));
        setSelectedId(data.studentAssignment.speedScore || -1);
    }, [data]);

    useListenPostMessage(
        (event: any) => {
            switch (event.data.action) {
                case ACTION_POST_MESSAGE.FPR_GRADE_VALIDATE:
                    sendToParent({
                        action: ACTION_POST_MESSAGE.FPR_GRADE_VALIDATE,
                        resp: {
                            gradingResults: dataSource,
                            speedScore: selectedId,
                            score,
                            fluencyScore: fluency,
                            accuracyScore: accuracy,
                            isReGrading: true,
                        },
                    });
                    break;

                default:
                    break;
            }
        },
        [dataSource, selectedId]
    );

    const showAudio =
        data.assignment.surveyImplementOption ===
            OPTIONS_SURVEY.LEVEL_ONE.SELF_GUIDED ||
        data.assignment.surveyImplementOption ===
            OPTIONS_SURVEY.LEVEL_TWO.WITH_RECORD;

    const showSyncAudio =
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
                            <Audio src={urlRecordStudent} />
                            {showSyncAudio && (
                                <button
                                    className={styles.Sync}
                                    onClick={handleSyncAudio}
                                >
                                    <IconSync fill={"white"} width={18} />
                                    <p>Sync</p>
                                </button>
                            )}
                        </div>
                    </div>
                )}

                <Table dataSource={dataSource} columns={columns} />

                <div className={"flex items-center mt-4"}>
                    {listScore.map((item, index) => {
                        return (
                            <React.Fragment key={index}>
                                {item.component}
                            </React.Fragment>
                        );
                    })}
                </div>
                <div className={"mt-8"}></div>
                <Button className={styles.Save} onClick={handleSubmit}>
                    Save
                </Button>
            </Layout>
        </SIndex>
    );
}

export default ReGrade;
