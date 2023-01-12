import Footer from "../components/Footer";
import Header from "../components/Header";
import Layout from "../components/Layout";
import Slider from "../components/Slider";
import { useAudioAssessmentContext } from "../ContextAudioAssessment";
import { SIndex } from "../styled/view";
import { ResponseDefault } from "./type";
import {
    getContentHeaderFooter,
    getDirections,
    getListWord,
} from "../utils/convertLayout";
import Volume from "../components/Volume";

function ViewResource() {
    const { data } = useAudioAssessmentContext();

    const listWord = getListWord(data as ResponseDefault);
    const { direction: componentDirection, pathAudio } = getDirections(
        data as ResponseDefault
    );
    const contentHeaderFooter = getContentHeaderFooter(data as ResponseDefault);

    return (
        <SIndex>
            <Layout
                footer={<Footer content={contentHeaderFooter} />}
                header={<Header content={contentHeaderFooter} />}
            >
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

                <Slider
                    isStarting={true}
                    title={data.resource.title}
                    data={listWord}
                />
            </Layout>
        </SIndex>
    );
}

export default ViewResource;
