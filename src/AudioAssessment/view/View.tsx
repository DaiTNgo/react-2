import AudioAssessmentTemplate from "../components/template/AudioAssessmentTemplate";
import Slider from "../components/Slider";
import { useAudioAssessmentContext } from "../ContextAudioAssessment";
import { getDirections, getListWord } from "../utils/convertLayout";
import Volume from "../components/Volume";

function ViewResource() {
    const { data } = useAudioAssessmentContext();

    const listWord = getListWord(data);
    const { direction: componentDirection, pathAudio } = getDirections(data);

    return (
        <AudioAssessmentTemplate>
            <div className="flex items-start gap-1 wrapper relative">
                <Volume
                    // src={"https://cqa2.sadlierconnect.com" + pathAudio}
                    src={
                        "https://cqa.sadlierconnect.com/content/803001/007743417/direction-line.mp3"
                    }
                />
                <div
                    dangerouslySetInnerHTML={{
                        __html: componentDirection,
                    }}
                />
            </div>

            <Slider title={data.resource.title} data={listWord} />
        </AudioAssessmentTemplate>
    );
}

export default ViewResource;
