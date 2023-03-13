import AudioAssessmentTemplate from "../components/template/AudioAssessmentTemplate";
import { useAudioAssessmentContext } from "../ContextAudioAssessment";
import { getPhonicsAssessmentType, getScore } from "./utils";
import Table from "../../components/table";
import styles from "./grade.module.scss";
import { sendToParent } from "../../helper";
import { useImmer } from "use-immer";
import React, { useCallback, useState } from "react";
import { ACTION_POST_MESSAGE } from "../../enums/action";
import { getDirections, getListWord } from "../utils/convertLayout";
import { StatusMachine } from "../../enums/status-machine";
import { useColumnsGrade } from "../hooks/useColumnsGrade";
import { Button } from "../../components/button";
import IconSync from "../../Icons/Sync";
import Audio from "../../components/Audio";
import { OPTIONS_SURVEY } from "../../enums/survey";
import useListScore from "../hooks/useListScore";
import { useListenPostMessage } from "../hooks/useListenPostMessage";
import Volume from "../components/Volume";
import Direction from "../components/Direction";

function GradeAssessment() {
    const [selectedId, setSelectedId] = useState<number>(-1);
    const [isPlayDirection, setIsPlayDirection] = useState(true);

    const { data, urlRecordStudent, layout } = useAudioAssessmentContext();
    const listWord = getListWord(data);
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

    const phonicsAssessmentType = getPhonicsAssessmentType(data);

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

    const handleGradeValidate = () => {
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
    };
    const handleChangeStudent = () => {
        setDataSource(
            listWord.map((word, index) => {
                return defaultOption(word, index);
            })
        );

        setSelectedId(-1);
    };

    const gradeStrategy = new Map([
        [ACTION_POST_MESSAGE.FPR_GRADE_VALIDATE, handleGradeValidate],
        [ACTION_POST_MESSAGE.FPR_CHANGE_STUDENT, handleChangeStudent],
        ["default", () => {}],
    ]);
    useListenPostMessage(
        (event) => {
            const callBack =
                gradeStrategy.get(event.data.action) ||
                gradeStrategy.get("default");

            if (callBack) {
                callBack();
            }
        },
        [gradeStrategy]
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

export default GradeAssessment;
