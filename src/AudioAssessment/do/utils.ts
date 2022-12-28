import { ResponseDefault } from "./type";
import { IPassageDate } from "../types";

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
