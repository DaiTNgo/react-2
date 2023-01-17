import { VIEW_GRADE } from "../../enums/view-grade";
import { StatusMachine } from "../../enums/status-machine";
import Check from "../../Icons/Check";
import XMark from "../../Icons/XMark";
import styled from "styled-components";
import { Dispatch, SetStateAction } from "react";
import { ResourceLayoutEnum } from "../../enums/layout";

const Title = styled.p`
    font-size: 24px;
    padding: 12px 4px;
    font-weight: 700;
`;

interface IParams {
    setDataSource: Dispatch<SetStateAction<any>>;
    phonicsAssessmentType: VIEW_GRADE;
    layout: ResourceLayoutEnum;
}

const noop = () => {};

const handleClick = (condition: boolean, callback: (...args: any) => void) => {
    return condition ? callback : noop;
};
export const useColumnsGrade = ({
    setDataSource,
    phonicsAssessmentType,
    layout,
}: IParams) => {
    const isExecute: boolean = layout !== ResourceLayoutEnum.REVIEW_ASSIGNMENT;
    return [
        {
            title:
                phonicsAssessmentType ===
                VIEW_GRADE.COMPREHENSIVE_PHONICS_SURVEY
                    ? () => <Title>Short Vowels</Title>
                    : () => <Title>Word</Title>,
            dataIndex: "word",
            key: "word",
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
            dataIndex: "correct",
            key: "correct",
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
                            onClick={handleClick(
                                isExecute,
                                handleScore(StatusMachine.CORRECT)
                            )}
                        />
                        <XMark
                            height={40}
                            status={record.correct}
                            onClick={handleClick(
                                isExecute,
                                handleScore(StatusMachine.INCORRECT)
                            )}
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
                            onClick={handleClick(
                                isExecute,
                                handleGradeAccuracy(StatusMachine.CORRECT)
                            )}
                        />
                        <XMark
                            height={40}
                            status={record.accuracy}
                            onClick={handleClick(
                                isExecute,
                                handleGradeAccuracy(StatusMachine.INCORRECT)
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
            title: () => {
                if (phonicsAssessmentType === VIEW_GRADE.HIGH_FREQUENCY_WORD) {
                    return <Title>Automatic</Title>;
                }

                if (phonicsAssessmentType === VIEW_GRADE.FLUENCY_CHECK) {
                    return <Title>Fluency</Title>;
                }
            },
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
                            onClick={handleClick(
                                isExecute,
                                handleGradeFluency(StatusMachine.CORRECT)
                            )}
                        />
                        <XMark
                            height={40}
                            status={record.fluency}
                            onClick={handleClick(
                                isExecute,
                                handleGradeFluency(StatusMachine.INCORRECT)
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
            title: () => <Title>Comments</Title>,
            dataIndex: "comments",
            key: "comments",
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
                                if (isExecute)
                                    setDataSource((draft: any) => {
                                        draft[index]["comment"] =
                                            e.target.value;
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
