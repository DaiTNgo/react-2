import Footer from "../components/Footer";
import Header from "../components/Header";
import Layout from "../components/Layout";
import { useAudioAssessmentContext } from "../ContextAudioAssessment";
import { SIndex } from "../styled/view";
import { ResponseDefault } from "./type";
import { getPhonicsAssessmentType, getScore } from "./utils";
import Table from "../../components/table";
import Select from "../../components/select";
import styles from "./grade.module.scss";
import { className, sendToParent } from "../../helper";
import { ISelectOption } from "../../components/select/select";
import { useImmer } from "use-immer";
import { useCallback, useState } from "react";
import { ACTION_POST_MESSAGE } from "../../enums/action";
import { VIEW_GRADE } from "../../enums/view-grade";
import {
    getContentHeaderFooter,
    getDirections,
    getListWord,
} from "../utils/convertLayout";
import { StatusMachine } from "../../enums/status-machine";
import { useColumnsGrade } from "../hooks/useColumnsGrade";
import { Button } from "../../components/button";
import IconSync from "../../Icons/Sync";

function GradeAssessment() {
    const { data, urlRecordStudent } = useAudioAssessmentContext();
    const listWord = getListWord(data as ResponseDefault);
    const { direction: componentDirection, pathAudio } = getDirections(
        data as ResponseDefault
    );
    const contentHeaderFooter = getContentHeaderFooter(data as ResponseDefault);
    const phonicsAssessmentType = getPhonicsAssessmentType(
        data as ResponseDefault
    );

    const [selectedId, setSelectedId] = useState<number>(-1);

    const [dataSource, setDataSource] = useImmer(() => {
        return listWord.map((word, index) => {
            return {
                word: word,
                key: index,
                correct: StatusMachine.IDLE,
                comment: "",
                fluency: StatusMachine.IDLE,
                accuracy: StatusMachine.IDLE,
            };
        });
    });

    const columns = useColumnsGrade({
        setDataSource,
        phonicsAssessmentType,
    });

    const { score, accuracy, fluency } = getScore(dataSource);
    const handleSubmit = () => {
        sendToParent({
            action: ACTION_POST_MESSAGE.FPR_SUBMIT_GRADING,
            body: {
                gradingResults: dataSource,
                speedScore: selectedId,
                score,
                fluencyScore: fluency,
                accuracyScore: accuracy,
            },
        });
    };

    const listScore = [
        {
            label: "Score",
            component: (
                <div
                    style={{
                        marginRight: 40,
                    }}
                >
                    <p className={className(styles.Label)}>SCORE</p>
                    <div className={styles.ScoreNum}>{score}</div>
                </div>
            ),
            hidden:
                phonicsAssessmentType !==
                VIEW_GRADE.COMPREHENSIVE_PHONICS_SURVEY,
        },
        {
            label: "Accuracy Score",
            component: (
                <div
                    style={{
                        marginRight: 40,
                    }}
                >
                    <p className={className(styles.Label)}>Accuracy Score</p>
                    <div className={styles.ScoreNum}>{accuracy}</div>
                </div>
            ),
            hidden:
                phonicsAssessmentType ===
                VIEW_GRADE.COMPREHENSIVE_PHONICS_SURVEY,
        },
        {
            label: "Fluency Score",
            component: (
                <div
                    style={{
                        marginRight: 40,
                    }}
                >
                    <p className={className(styles.Label)}>Fluency Score</p>
                    <div className={styles.ScoreNum}>{fluency}</div>
                </div>
            ),
            hidden: phonicsAssessmentType !== VIEW_GRADE.FLUENCY_CHECK,
        },
        {
            label: "Speed",
            component: (
                <div
                    style={{
                        marginRight: 40,
                    }}
                >
                    <p className={className(styles.Label)}>SPEED</p>
                    <Select
                        onClick={(select: ISelectOption) => {
                            setSelectedId(select.value);
                        }}
                        selectedId={selectedId}
                        defaultOption={{
                            label: "Select",
                            value: -1,
                            key: -1,
                        }}
                        options={[
                            { label: "Slow/labored", value: 1, key: 1 },
                            { label: "Moderate", value: 2, key: 2 },
                            { label: "Fast", value: 3, key: 3 },
                        ]}
                    />
                </div>
            ),
        },
    ].filter((rc) => !rc?.hidden);

    const handleSyncAudio = useCallback(() => {
        sendToParent({
            action: ACTION_POST_MESSAGE.FPR_GET_SYNC_AUDIO,
        });
    }, []);
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
                <div className={"fpr-audio"}>
                    <p className={"fpr-audio__title"}>Recorded Content</p>
                    <div className={"flex items-center gap-4"}>
                        <audio controls src={urlRecordStudent}></audio>
                        <button
                            className={styles.Sync}
                            onClick={handleSyncAudio}
                        >
                            <IconSync fill={"white"} width={18} />
                            <p>Sync</p>
                        </button>
                    </div>
                </div>

                <Table dataSource={dataSource} columns={columns} />

                <div className={"flex items-center mt-4"}>
                    {listScore.map((item, index) => {
                        return item.component;
                    })}
                </div>
                <div className={"mt-8"}></div>
                <Button
                    needLoading
                    className={styles.Save}
                    onClick={handleSubmit}
                >
                    Save
                </Button>
            </Layout>
        </SIndex>
    );
}

export default GradeAssessment;
