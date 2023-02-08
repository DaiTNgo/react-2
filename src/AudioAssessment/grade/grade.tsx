import Footer from "../components/Footer";
import Header from "../components/Header";
import Layout from "../components/Layout";
import { useAudioAssessmentContext } from "../ContextAudioAssessment";
import { SIndex } from "../styled/view";
import { getPhonicsAssessmentType, getScore } from "./utils";
import Table from "../../components/table";
import styles from "./grade.module.scss";
import { sendToParent } from "../../helper";
import { useImmer } from "use-immer";
import React, { useCallback, useState } from "react";
import { ACTION_POST_MESSAGE } from "../../enums/action";
import {
    getContentHeaderFooter,
    getDirections,
    getListWord,
} from "../utils/convertLayout";
import { StatusMachine } from "../../enums/status-machine";
import { useColumnsGrade } from "../hooks/useColumnsGrade";
import { Button } from "../../components/button";
import IconSync from "../../Icons/Sync";
import Audio from "../../components/Audio";
import { OPTIONS_SURVEY } from "../../enums/survey";
import useListScore from "../hooks/useListScore";
import { useListenPostMessage } from "../hooks/useListenPostMessage";
import Volume from "../components/Volume";

function GradeAssessment() {
    const { data, urlRecordStudent, layout } = useAudioAssessmentContext();

    const listWord = getListWord(data);
    const { direction: componentDirection, pathAudio } = getDirections(data);
    const contentHeaderFooter = getContentHeaderFooter(data);
    const phonicsAssessmentType = getPhonicsAssessmentType(data);

    const [selectedId, setSelectedId] = useState<number>(-1);
    const [isPlayDirection, setIsPlayDirection] = useState(true);

    const defaultOption = <T, K>(word: T, key: K) => ({
        word,
        key,
        correct: StatusMachine.IDLE,
        comment: "",
        fluency: StatusMachine.IDLE,
        accuracy: StatusMachine.IDLE,
    });

    const [dataSource, setDataSource] = useImmer(() => {
        return listWord.map((word, index) => {
            return defaultOption(word, index);
        });
    });

    const scores = getScore(dataSource);
    const { score, fluency, accuracy } = scores;

    const listScore = useListScore({
        scores,
        phonicsAssessmentType,
        selectedId,
        setSelectedId,
    });

    const columns = useColumnsGrade({
        setDataSource,
        phonicsAssessmentType,
        layout,
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
            },
        });
    }, [dataSource, selectedId]);

    const handleSyncAudio = useCallback(() => {
        sendToParent({
            action: ACTION_POST_MESSAGE.FPR_GET_SYNC_AUDIO,
        });
    }, []);

    const resetGradeSource = () => {
        setDataSource(
            listWord.map((word, index) => {
                return defaultOption(word, index);
            })
        );

        // speed select
        setSelectedId(-1);
    };

    useListenPostMessage(
        (event) => {
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
                        },
                    });
                    break;
                case ACTION_POST_MESSAGE.FPR_CHANGE_STUDENT:
                    resetGradeSource();
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
                            <Audio
                                src={urlRecordStudent}
                                onPermissionAllowPlayingDirection={(
                                    is: boolean
                                ) => {
                                    setIsPlayDirection(is);
                                }}
                            />
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

                <Table data={dataSource} columns={columns} />

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

export default GradeAssessment;
