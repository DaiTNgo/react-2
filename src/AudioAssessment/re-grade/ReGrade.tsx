import React, { useCallback, useEffect, useState } from "react";
import { useAudioAssessmentContext } from "../ContextAudioAssessment";
import { getDirections } from "../utils/convertLayout";
import { getPhonicsAssessmentType, getScore } from "../grade/utils";
import { useImmer } from "use-immer";
import { sendToParent } from "../../helper";
import { ACTION_POST_MESSAGE } from "../../enums/action";
import styles from "../grade/grade.module.scss";
import AudioAssessmentTemplate from "../components/template/AudioAssessmentTemplate";
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
import Direction from "../components/Direction";

function ReGrade() {
    const { data, urlRecordStudent, layout } = useAudioAssessmentContext();
    const { direction: componentDirection, pathAudio } = getDirections(data);
    const phonicsAssessmentType = getPhonicsAssessmentType(data);

    const [selectedId, setSelectedId] = useState<number>(() => {
        return data?.speedScore || -1;
    });
    const [isPlayDirection, setIsPlayDirection] = useState(true);

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

    const handleGradeValidate = () => {
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
    };

    const regradeStrategy = new Map([
        [ACTION_POST_MESSAGE.FPR_GRADE_VALIDATE, handleGradeValidate],
        ["default", () => {}],
    ]);
    useListenPostMessage(
        (event) => {
            const callBack =
                regradeStrategy.get(event.data.action) ||
                regradeStrategy.get("default");

            if (callBack) {
                callBack();
            }
        },
        [regradeStrategy]
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
        <AudioAssessmentTemplate>
            <Direction isPlayDirection={isPlayDirection} />
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
        </AudioAssessmentTemplate>
    );
}

export default ReGrade;
