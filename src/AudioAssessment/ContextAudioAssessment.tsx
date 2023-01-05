import { createContext, useContext } from "react";

type AudioAssessmentContextType = {
    data: any;
    studentAssignmentId: number | undefined;
    accessToken: string;
    location: string;
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