import React, { useState } from "react";
import { useAudioAssessmentContext } from "../ContextAudioAssessment";
import { getDirections } from "../utils/convertLayout";
import { getPhonicsAssessmentType } from "../grade/utils";
import { useImmer } from "use-immer";
import AudioAssessmentTemplate from "../components/template/AudioAssessmentTemplate";
import Table from "../../components/table";
import { getResultData } from "./utils";
import { useColumnsGrade } from "../hooks/useColumnsGrade";
import { OPTIONS_SURVEY } from "../../enums/survey";
import Audio from "../../components/Audio";
import Volume from "../components/Volume";
import Direction from "../components/Direction";

function Review() {
    const { data, urlRecordStudent, layout } = useAudioAssessmentContext();
    const { direction: componentDirection, pathAudio } = getDirections(data);
    const phonicsAssessmentType = getPhonicsAssessmentType(data);
    const [dataSource, setDataSource] = useImmer(() => {
        return getResultData(data);
    });
    const [isPlayDirection, setIsPlayDirection] = useState(true);

    const columns = useColumnsGrade({
        setDataSource,
        phonicsAssessmentType,
        layout,
    });

    const showAudio =
        data.assignment.surveyImplementOption ===
            OPTIONS_SURVEY.LEVEL_ONE.SELF_GUIDED ||
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
                    </div>
                </div>
            )}

            <Table data={dataSource} columns={columns} />
        </AudioAssessmentTemplate>
    );
}

export default Review;
