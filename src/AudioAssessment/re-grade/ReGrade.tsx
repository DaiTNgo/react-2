import React, { useState } from "react";
import { useAudioAssessmentContext } from "../ContextAudioAssessment";
import {
    getContentHeaderFooter,
    getDirections,
    getListWord,
} from "../utils/convertLayout";
import { ResponseDefault } from "../grade/type";
import { getPhonicsAssessmentType, getScore } from "../grade/utils";
import Select, { ISelectOption } from "../../components/select/select";
import { useImmer } from "use-immer";
import { className, sendToParent } from "../../helper";
import { ACTION_POST_MESSAGE } from "../../enums/action";
import styles from "../grade/grade.module.scss";
import { VIEW_GRADE } from "../../enums/view-grade";
import { SIndex } from "../styled/view";
import Layout from "../components/Layout";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Table from "../../components/table";
import Check from "../../Icons/Check";
import XMark from "../../Icons/XMark";
import { getResultData } from "./utils";

type Props = any;
const useColumns = ({ setDataSource, phonicsAssessmentType }: any) => {
    return [
        {
            title:
                phonicsAssessmentType ===
                VIEW_GRADE.COMPREHENSIVE_PHONICS_SURVEY
                    ? "Short Vowels"
                    : "Word",
            dataIndex: "word",
            key: "name",
            // width: "200px", //20%
            width: "30%",
            align: "left",
            render: (rc: any, _index: number) => {
                return (
                    <div
                        className={"flex items-center"}
                        style={{
                            fontSize: 22,
                        }}
                    >
                        <p
                            style={{
                                marginRight: 5,
                                fontWeight: 500,
                            }}
                        >
                            {_index + 1}.
                        </p>
                        <p>{rc.word}</p>
                    </div>
                );
            },
            hidden: false,
        },
        {
            title: "Correct/Incorrect",
            dataIndex: "age",
            key: "age",
            // width: "600px",
            width: "30%",
            align: "left",
            render: (record: any, index: number) => {
                const handleScore =
                    (correct: "ide" | "correct" | "incorrect") => () => {
                        setDataSource((draft: any) => {
                            draft[index].correct = correct;
                        });
                    };
                return (
                    <>
                        <Check
                            height={40}
                            width={40}
                            status={record.correct}
                            onClick={handleScore("correct")}
                        />
                        <XMark
                            height={40}
                            status={record.correct}
                            onClick={handleScore("incorrect")}
                        />
                    </>
                );
            },

            hidden:
                phonicsAssessmentType !==
                VIEW_GRADE.COMPREHENSIVE_PHONICS_SURVEY,
        },
        {
            title: "Accuracy",
            dataIndex: "accuracy",
            key: "accuracy",
            // width: "30%",
            align: "center",
            render: (record: any, index: number) => {
                const handleGradeAccuracy =
                    (correct: "ide" | "correct" | "incorrect") => () => {
                        setDataSource((draft: any) => {
                            draft[index].accuracy = correct;
                        });
                    };
                return (
                    <>
                        <Check
                            height={40}
                            width={40}
                            status={record.accuracy}
                            onClick={handleGradeAccuracy("correct")}
                        />
                        <XMark
                            height={40}
                            status={record.accuracy}
                            onClick={handleGradeAccuracy("incorrect")}
                        />
                    </>
                );
            },

            hidden:
                phonicsAssessmentType ===
                VIEW_GRADE.COMPREHENSIVE_PHONICS_SURVEY,
        },
        {
            title: "Fluency",
            dataIndex: "fluency",
            key: "fluency",
            width: "30%",
            align: "center",
            render: (record: any, index: number) => {
                const handleGradeFluency =
                    (correct: "ide" | "correct" | "incorrect") => () => {
                        setDataSource((draft: any) => {
                            draft[index].fluency = correct;
                        });
                    };
                return (
                    <>
                        <Check
                            height={40}
                            width={40}
                            status={record.fluency}
                            onClick={handleGradeFluency("correct")}
                        />
                        <XMark
                            height={40}
                            status={record.fluency}
                            onClick={handleGradeFluency("incorrect")}
                        />
                    </>
                );
            },

            hidden: phonicsAssessmentType !== VIEW_GRADE.FLUENCY_CHECK,
        },
        {
            title: "Comments",
            dataIndex: "address",
            key: "address",
            // width: "200px",
            width: "30%",
            align: "left",
            render: (record: any, index: any) => {
                return (
                    <div
                        style={{
                            border: "1px solid #ccc",
                            borderRadius: 4,
                            overflow: "hidden",
                            padding: "4px 10px",
                        }}
                    >
                        <input
                            style={{
                                outline: "none",
                            }}
                            type={"text"}
                            placeholder={"Enter text here. (Optional)"}
                            value={record.comments}
                            onChange={(e) => {
                                setDataSource((draft: any) => {
                                    draft[index]["comments"] = e.target.value;
                                });
                            }}
                        />
                    </div>
                );
            },

            hidden:
                phonicsAssessmentType !==
                VIEW_GRADE.COMPREHENSIVE_PHONICS_SURVEY,
        },
    ].filter((rc) => !rc?.hidden);
};
function ReGrade({}: Props) {
    const { data } = useAudioAssessmentContext();
    const listWord = getListWord(data as ResponseDefault);
    const { direction: componentDirection, pathAudio } = getDirections(
        data as ResponseDefault
    );
    const contentHeaderFooter = getContentHeaderFooter(data as ResponseDefault);
    const phonicsAssessmentType = getPhonicsAssessmentType(
        data as ResponseDefault
    );

    const [selectedId, setSelectedId] = useState<number>(() => {
        return data.speedScore || -1;
    });

    const [dataSource, setDataSource] = useImmer(() => {
        return getResultData(data);
    });

    const columns = useColumns({
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
                isReGrading: true,
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
    return (
        <SIndex>
            <Layout
                footer={<Footer content={contentHeaderFooter} />}
                header={<Header content={contentHeaderFooter} />}
            >
                <div className="flex items-start gap-1">
                    <div
                        dangerouslySetInnerHTML={{
                            __html: componentDirection,
                        }}
                    />
                </div>
                <audio controls src={data.audioRecordedUrl}></audio>

                <Table dataSource={dataSource} columns={columns} />

                <div className={"flex items-center mt-4"}>
                    {listScore.map((item, index) => {
                        return item.component;
                    })}
                </div>
                <div className={"mt-8"}></div>
                <button className={styles.Save} onClick={handleSubmit}>
                    Save
                </button>
            </Layout>
        </SIndex>
    );
}

export default ReGrade;
