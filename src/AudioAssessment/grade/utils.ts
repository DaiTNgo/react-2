import { ResponseDefault } from "./type";
import { VIEW_GRADE } from "../../enums/view-grade";
import { StatusMachine } from "../../enums/status-machine";

export const getPhonicsAssessmentType = (data: ResponseDefault) => {
    try {
        return data.resource.phonicsAssessmentType;
    } catch (_: any) {
        return VIEW_GRADE.COMPREHENSIVE_PHONICS_SURVEY;
    }
};

export const getScore = (data: any) => {
    let score = 0;
    let accuracy = 0;
    let fluency = 0;
    for (const cur of data) {
        if (cur.correct === StatusMachine.CORRECT) {
            score += 1;
        }
        if (cur.fluency === StatusMachine.CORRECT) {
            fluency += 1;
        }
        if (cur.accuracy === StatusMachine.CORRECT) {
            accuracy += 1;
        }
    }

    return {
        score,
        accuracy,
        fluency,
    };
};
