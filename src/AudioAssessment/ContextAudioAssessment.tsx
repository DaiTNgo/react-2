import { createContext, useContext } from "react";

export const AudioAssessmentContext = createContext<any>(null);

export const useAudioAssessmentContext = () => {
  const context = useContext(AudioAssessmentContext);
  if (!context) {
    throw new Error("Please Wrapper AudioAssessmentContext");
  }
  return context;
};
