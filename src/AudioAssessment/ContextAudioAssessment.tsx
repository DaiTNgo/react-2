import { createContext, Dispatch, SetStateAction, useContext } from "react";
import { ResponseDefault } from "./view/type";
import { ResourceLayoutEnum } from "../enums/layout";

type AudioAssessmentContextType = {
    data: ResponseDefault;
    urlRecordStudent: string;
    layout: ResourceLayoutEnum;
};

export const AudioAssessmentContext =
    createContext<AudioAssessmentContextType | null>(null);

export const useAudioAssessmentContext = () => {
    const context = useContext(AudioAssessmentContext);
    if (!context) {
        throw new Error("Please Wrapper AudioAssessmentContext");
    }
    return context;
};
