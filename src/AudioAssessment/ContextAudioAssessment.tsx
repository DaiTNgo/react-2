import { createContext, Dispatch, SetStateAction, useContext } from "react";
import { ResponseDefault } from "./view/type";

type AudioAssessmentContextType = {
    data: ResponseDefault;
    urlRecordStudent: string;
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
