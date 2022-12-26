import Volumn from "../../Icons/Volumn";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Layout from "../components/Layout";
import Slider from "../components/Slider";
import { useAudioAssessmentContext } from "../ContextAudioAssessment";
import { SIndex } from "../styled/view";
import { ResponseDefault } from "./type";
import { getContentHeaderFooter, getDirections, getListWord } from "./utils";

function ViewResource() {
  const { data } = useAudioAssessmentContext();

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
          <div>
            <Volumn />
          </div>
          <div
            dangerouslySetInnerHTML={{
              __html: componentDirection,
            }}
          />
        </div>

        <Slider
          isStarting={false}
          title={data.resource.title}
          data={listWord}
        />
      </Layout>
    </SIndex>
  );
}

export default ViewResource;
