import Check from "../../Icons/Check";
import XMark from "../../Icons/XMark";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Layout from "../components/Layout";
import { useAudioAssessmentContext } from "../ContextAudioAssessment";
import { SIndex } from "../styled/view";
import { ResponseDefault } from "./type";
import { getContentHeaderFooter, getDirections, getListWord } from "./utils";
import Table from "../../components/table";
import Select from "../../components/select";
import styles from "./grade.module.scss";
import { className, sendToParent } from "../../helper";
import { ISelectOption } from "../../components/select/select";
import { useImmer } from "use-immer";
import { useCallback, useState } from "react";
import { ACTION_POST_MESSAGE } from "../../enums/action";

const useColumns = (setDataSource: any) => {
    return [
        {
            title: "Short Vowels",
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
        },
        {
            title: "Correct/Incorrect",
            dataIndex: "age",
            key: "age",
            // width: "600px",
            width: "30%",
            align: "center",
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
        },
        {
            title: "Comments",
            dataIndex: "address",
            key: "address",
            // width: "200px",
            width: "40%",
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
        },
    ];
};

function GradeAssessment() {
    const { data } = useAudioAssessmentContext();

    const listWord = getListWord(data as ResponseDefault);
    const componentDirection = getDirections(data as ResponseDefault);
    const contentHeaderFooter = getContentHeaderFooter(data as ResponseDefault);

    const [selected, setSelected] = useState<ISelectOption>({
        label: "Select",
        value: -1,
        key: -1,
    });

    const [dataSource, setDataSource] = useImmer(() => {
        return listWord.map((word, index) => {
            return {
                word: word,
                key: index,
                correct: "ide",
                comments: "",
                fluency: "ide",
                accuracy: "ide",
            };
        });
    });

    const columns = useColumns(setDataSource);

    const score = dataSource.reduce((acc, cur) => {
        if (cur.correct === "correct") {
            return acc + 1;
        }
        return acc;
    }, 0);

    const handleSubmit = () => {
        sendToParent({
            action: ACTION_POST_MESSAGE.FPR_SUBMIT_GRADING,
            body: {
                gradingResults: dataSource,
                speedScore: selected.value,
                score,
            },
        });
    };
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
                    <div
                        style={{
                            marginRight: 40,
                        }}
                    >
                        <p className={className(styles.Label)}>SCORE</p>
                        <div className={styles.ScoreNum}>{score}</div>
                    </div>
                    <div>
                        <p className={className(styles.Label)}>SPEED</p>
                        <Select
                            onClick={(select: ISelectOption) => {
                                setSelected(select);
                            }}
                            selected={selected}
                            options={[
                                { label: "Slow/labored", value: 1, key: 1 },
                                { label: "Moderate", value: 2, key: 2 },
                                { label: "Fast", value: 3, key: 3 },
                            ]}
                        />
                    </div>
                </div>
                <div className={"mt-8"}></div>
                <button className={styles.Save} onClick={handleSubmit}>
                    Save
                </button>
            </Layout>
        </SIndex>
    );
}

export default GradeAssessment;
