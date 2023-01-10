import { VIEW_GRADE } from "../../enums/view-grade";
import { StatusMachine } from "../../enums/status-machine";
import Check from "../../Icons/Check";
import XMark from "../../Icons/XMark";
import styled from "styled-components";

const Title = styled.p`
    font-size: 24px;
    padding: 12px 4px;
    font-weight: 500;
`;
export const useColumnsGrade = ({
    setDataSource,
    phonicsAssessmentType,
}: any) => {
    return [
        {
            title:
                phonicsAssessmentType ===
                VIEW_GRADE.COMPREHENSIVE_PHONICS_SURVEY
                    ? () => <Title>Short Vowels</Title>
                    : () => <Title>Word</Title>,
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
                            fontSize: 24,
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
            title: () => <Title>Correct/Incorrect</Title>,
            dataIndex: "age",
            key: "age",
            // width: "600px",
            width: "40%",
            align: "center",
            render: (record: any, index: number) => {
                const handleScore = (correct: StatusMachine) => () => {
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
                            onClick={handleScore(StatusMachine.CORRECT)}
                        />
                        <XMark
                            height={40}
                            status={record.correct}
                            onClick={handleScore(StatusMachine.INCORRECT)}
                        />
                    </>
                );
            },

            hidden:
                phonicsAssessmentType !==
                VIEW_GRADE.COMPREHENSIVE_PHONICS_SURVEY,
        },
        {
            title: () => <Title>Accuracy</Title>,
            dataIndex: "accuracy",
            key: "accuracy",
            // width: "30%",
            align: "center",
            render: (record: any, index: number) => {
                const handleGradeAccuracy = (correct: StatusMachine) => () => {
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
                            onClick={handleGradeAccuracy(StatusMachine.CORRECT)}
                        />
                        <XMark
                            height={40}
                            status={record.accuracy}
                            onClick={handleGradeAccuracy(
                                StatusMachine.INCORRECT
                            )}
                        />
                    </>
                );
            },

            hidden:
                phonicsAssessmentType ===
                VIEW_GRADE.COMPREHENSIVE_PHONICS_SURVEY,
        },
        {
            title: () => <Title>Fluency</Title>,
            dataIndex: "fluency",
            key: "fluency",
            width: "30%",
            align: "center",
            render: (record: any, index: number) => {
                const handleGradeFluency = (correct: StatusMachine) => () => {
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
                            onClick={handleGradeFluency(StatusMachine.CORRECT)}
                        />
                        <XMark
                            height={40}
                            status={record.fluency}
                            onClick={handleGradeFluency(
                                StatusMachine.INCORRECT
                            )}
                        />
                    </>
                );
            },

            hidden: phonicsAssessmentType !== VIEW_GRADE.FLUENCY_CHECK,
        },
        {
            title: () => <Title>Comments</Title>,
            dataIndex: "address",
            key: "address",
            // width: "200px",
            width: "30%",
            align: "left",
            render: (record: any, index: any) => {
                return (
                    <div
                        className={"w-full"}
                        style={{
                            border: "1px solid #ccc",
                            borderRadius: 4,
                            overflow: "hidden",
                            padding: "4px 10px",
                        }}
                    >
                        <input
                            className={"w-full outline-none"}
                            type={"text"}
                            placeholder={"Enter text here. (Optional)"}
                            value={record.comment}
                            onChange={(e) => {
                                setDataSource((draft: any) => {
                                    draft[index]["comment"] = e.target.value;
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
