import Volumn from "../../Icons/Volumn";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Layout from "../components/Layout";
import Slider from "../components/Slider";
import { useAudioAssessmentContext } from "../ContextAudioAssessment";
import { SIndex } from "../styled/view";
import { ResponseDefault } from "./type";
import { getContentHeaderFooter, getDirections, getListWord } from "./utils";
import { useCallback, useRef, useState } from "react";
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

  const handleSubmitAssignment = (file: any) => {
    // console.log("Recording:", file);
    const audioFile = new FormData();
    audioFile.append("audioFile", file);
    const accessToken =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2NzIwNDg4ODQsInVzZXJfbmFtZSI6ImRuZ29ccmJ2X2ZwclxyMVxyU0NcckxPR0lOX0FUXzE2NzIwNDUyODQ3MTFcciIsImF1dGhvcml0aWVzIjpbIlNUVURFTlQiLCJMT0dHRURfSU4iXSwianRpIjoiYWUyNjEzNzgtMWFkOC00NTIyLThmYmEtMzQzY2UzZjVlNWZhIiwiY2xpZW50X2lkIjoiV2ViQ2xpZW50Iiwic2NvcGUiOlsidWkiXX0.e2ApIKimzj7pg4KXaTS1UMnJ9lYHHfZg5dFy5a-9_GY";
    fetch(
      "https://cqa2api.sadlierconnect.com/activity/submitaudioassignment?studentAssignmentId=14760288&access_token=" +
        accessToken,
      {
        method: "post",
        // @ts-ignore
        body: audioFile,
      }
    )
      .then((response) => response.json())
      .then((data) => console.log(data));
  };

  const stopped = useRef(false);

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
          {isStarting ? (
            <Recording
              onSubmitAssignment={handleSubmitAssignment}
              numOfWord={listWord.length}
              stopped={stopped}
            />
          ) : (
            <Record startRecording={startRecording} />
          )}
        </div>
        <Slider
          title={data.resource.title}
          data={listWord}
          isStarting={isStarting}
          // onSubmitAssignment={handleSubmitAssignment}
          stopped={stopped}
        />
      </Layout>
    </SIndex>
  );
}

export default DoAssessment;
