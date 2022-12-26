import Volumn from "../../Icons/Volumn";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Layout from "../components/Layout";
import Slider from "../components/Slider";
import { useAudioAssessmentContext } from "../ContextAudioAssessment";
import { SIndex } from "../styled/view";
import { ResponseDefault } from "./type";
import { getContentHeaderFooter, getDirections, getListWord } from "./utils";
import { useCallback, useState } from "react";
import Recording from "./components/Recording";
import Record from "./components/Record";
import { useStoreSlider } from "../store/slider";

function DoAssessment() {
  const { data } = useAudioAssessmentContext();

  //TODO:
  const [isStarting, setIsStarting] = useState(false);
  const { changeSlide } = useStoreSlider();

  const startRecording = useCallback(() => {
    setIsStarting(true);
    changeSlide(0);
  }, []);

  const listWord = getListWord(data as ResponseDefault);
  const componentDirection = getDirections(data as ResponseDefault);
  const contentHeaderFooter = getContentHeaderFooter(data as ResponseDefault);

  return (
    <SIndex>
      <Layout
        footer={<Footer content={contentHeaderFooter} />}
        header={<Header content={contentHeaderFooter} />}
      >
        <div className="flex items-start gap-1 wrapper">
          <div className="cursor-pointer">
            <Volumn />
          </div>
          <div
            dangerouslySetInnerHTML={{
              __html: componentDirection,
            }}
          />
        </div>
        <div
          style={{
            display: "grid",
            placeContent: "center",
            textAlign: "center",
          }}
        >
          {/*<Recording />*/}
          {isStarting ? (
            <Recording numOfWord={listWord.length} />
          ) : (
            <Record startRecording={startRecording} />
          )}
        </div>
        <Slider
          title={data.resource.title}
          data={listWord}
          isStarting={isStarting}
        />
      </Layout>
    </SIndex>
  );
}

export default DoAssessment;
