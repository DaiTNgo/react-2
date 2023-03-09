import AudioAssessmentTemplate from "../components/template/AudioAssessmentTemplate";
import Slider from "../components/Slider";
import { useAudioAssessmentContext } from "../ContextAudioAssessment";
import { getDirections, getListWord } from "../utils/convertLayout";
import Volume from "../components/Volume";
import Direction from "../components/Direction";

function ViewResource() {
    const { data } = useAudioAssessmentContext();
    const listWord = getListWord(data);

    return (
        <AudioAssessmentTemplate>
            <Direction />

            <div className={"mt-8"}>
                <Slider data={listWord} />
            </div>
        </AudioAssessmentTemplate>
    );
}

export default ViewResource;
