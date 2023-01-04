import { ResponseDefault } from "./type";
import { IPassageDate } from "../types";
import { VIEW_GRADE } from "../../enums/view-grade";

export const getListWord = (data: ResponseDefault) => {
    try {
        return data.questionBean.listQuestion[0].questionJsonObject.contents;
    } catch (_: any) {
        return [];
    }
};

export const getDirections = (data: ResponseDefault) => {
    try {
        return data.questionBean.listQuestion[0].questionSetPassageXML;
    } catch (_: any) {
        return "";
    }
};
export const getContentHeaderFooter = (data: ResponseDefault): IPassageDate => {
    try {
        return data.passageData;
    } catch (_: any) {
        return {
            programTocName: "",
            resourceTitle: "",
            productLevel: "",
            programFooterImage: "",
            tocBackgroundImage: "",
            copyright:
                "Copyright &copy; 2021 William H. Sadlier, Inc. All rights reserved.",
        };
    }
};

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
        if (cur.correct === "correct") {
            score += 1;
        }
        if (cur.fluency === "correct") {
            fluency += 1;
        }
        if (cur.accuracy === "correct") {
            accuracy += 1;
        }
    }

    return {
        score,
        accuracy,
        fluency,
    };
};
