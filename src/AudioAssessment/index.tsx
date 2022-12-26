import { useEffect, useState } from "react";
import { ResourceLayoutEnum } from "../enums/layout";
import { AudioAssessmentContext } from "./ContextAudioAssessment";
import DoAssessment from "./do";
import { ResponseDefault } from "./view/type";
import ViewResource from "./view";
import { useObserverHeight } from "./hooks/useObserverHeight";

function AudioAssessment() {
  const [data, setData] = useState<ResponseDefault | null>(
    new ResponseDefault()
  );

  const [layout, setLayout] = useState<ResourceLayoutEnum>(
    ResourceLayoutEnum.VIEW_RESOURCE
  );

  const sendToParent = () => {
    window.parent.postMessage(
      {
        child: data, //TODO:
      },
      "*"
    );
  };

  useEffect(() => {
    const fn = (event: any) => {
      // console.log(event.data.response);
      console.log("FPR:::Send message from parent", event.data);
      if (!event.data.response) return;

      console.log("FPR::: offsetHeight", document.documentElement.offsetHeight);

      if (event.data.response) {
        setData(event.data.response);
      }

      if (event.data.layout) {
        setLayout(event.data.layout);
      }
    };
    window.addEventListener("message", fn);
    return () => {
      window.removeEventListener("message", fn);
    };
  }, []);

  useObserverHeight();

  if (!data) {
    return (
      <div
        style={{
          width: "100%",
          height: "500px",
          backgroundColor: "#fff",
        }}
      >
        Loading...
      </div>
    );
  }

  const Component = (() => {
    switch (layout) {
      case ResourceLayoutEnum.VIEW_RESOURCE:
        return <ViewResource />;
      case ResourceLayoutEnum.DO_ASSIGNMENT:
        return <DoAssessment />;
      default:
        break;
    }
  })();

  return (
    <AudioAssessmentContext.Provider
      value={{
        data,
      }}
    >
      {Component}
    </AudioAssessmentContext.Provider>
  );
}

export default AudioAssessment;
