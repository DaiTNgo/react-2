import { IPassageDate, ResponseDefault } from "../types";

export const getListWord = (data: ResponseDefault) => {
    try {
        return data.questionBean.listQuestion[0].questionJsonObject.contents;
    } catch (_: any) {
        return [];
    }
};
const REGEX_FIND_SRC_AUDIO = /src.(".+")/g;
export const getDirections = (data: ResponseDefault) => {
    try {
        const pathAudio =
            REGEX_FIND_SRC_AUDIO.exec(
                data.questionBean.listQuestion[0].questionSetPassageXML
            )?.[1] || "";
        return {
            direction: data.questionBean.listQuestion[0].questionSetPassageXML,
            pathAudio: pathAudio,
        };
    } catch (_: any) {
        return {
            direction: "",
            pathAudio: "",
        };
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
            // programFooterImage: "",
            // tocBackgroundImage: "",
            copyright:
                "Copyright &copy; 2021 William H. Sadlier, Inc. All rights reserved.",
        };
    }
};
