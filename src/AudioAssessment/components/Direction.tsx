import React from "react";
import Volume from "./Volume";
import { getDirections } from "../utils/convertLayout";
import { useAudioAssessmentContext } from "../ContextAudioAssessment";
import styled from "styled-components";
const SDirection = styled.div`
    .direction-title {
        font-size: 2.4rem;
        color: #e11740;
    }
    .direction-content {
        font-size: 2.4rem;
    }
`;
function Direction() {
    const { data } = useAudioAssessmentContext();
    const { direction } = getDirections(data);

    return (
        <SDirection className="flex items-start gap-1 relative">
            <div className={"mt-[-9px]"}>
                <Volume
                    // src={"https://cqa2.sadlierconnect.com" + pathAudio}
                    src={
                        "https://cqa.sadlierconnect.com/content/803001/007743417/direction-line.mp3"
                    }
                />
            </div>
            <div
                dangerouslySetInnerHTML={{
                    __html: direction,
                }}
            />
        </SDirection>
    );
}

export default Direction;
