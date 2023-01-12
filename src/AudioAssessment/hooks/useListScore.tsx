import React, { Dispatch, SetStateAction } from "react";
import { className } from "../../helper";
import styles from "../grade/grade.module.scss";
import { VIEW_GRADE } from "../../enums/view-grade";
import Select from "../../components/select";
import { ISelectOption } from "../../components/select/select";

type Props = {
    scores: any;
    phonicsAssessmentType: VIEW_GRADE;
    selectedId: number;
    setSelectedId: Dispatch<SetStateAction<number>>;
};

function useListScore({
    scores,
    phonicsAssessmentType,
    selectedId,
    setSelectedId,
}: Props) {
    const { score, accuracy, fluency } = scores;
    return [
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
}

export default useListScore;
