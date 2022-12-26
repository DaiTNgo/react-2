import { SSlider } from "../styled/view";
import { useStoreSlider } from "../store/slider";
import { MutableRefObject, useEffect } from "react";
import { TIME_RECORD_STANDARD } from "../do/components/Recording";
import { data } from "autoprefixer";
import { useModalContext } from "../../context/ModalContext";
import ModalSubmit from "../do/components/ModalSubmit";

interface Props {
  title: string;
  data: any[];
  isStarting: boolean;
  // onSubmitAssignment: (file: any) => void;
  stopped?: MutableRefObject<boolean>;
}

function ArrowRight() {
  return (
    <svg
      style={{
        width: 40,
      }}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 320 512"
    >
      <path d="M278.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-160 160c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L210.7 256 73.4 118.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l160 160z" />
    </svg>
  );
}

function ArrowLeft() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 320 512"
      style={{
        width: 40,
      }}
    >
      <path d="M41.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 256 246.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" />
    </svg>
  );
}

function Slider({ isStarting, stopped, ...props }: Props) {
  const { currentSlide, changeSlide, increaseSlide, decreaseSlide } =
    useStoreSlider();

  const { openModal } = useModalContext();

  const onChange = (currentSlide: number) => () => {
    changeSlide(currentSlide);
  };

  const handlePrevious = () => {
    decreaseSlide();
  };

  const handleNext = () => {
    increaseSlide();
  };

  const showArrowPrevious = currentSlide !== 0;
  const showArrowNext = currentSlide !== props.data.length - 1;

  useEffect(() => {
    if (!props?.data?.length) return;
    if (!isStarting) return;

    if (currentSlide === props.data.length - 1) return;
    const id = setTimeout(() => {
      increaseSlide();
    }, (TIME_RECORD_STANDARD / props.data.length) * 1000);

    return () => {
      clearTimeout(id);
    };
  }, [currentSlide, isStarting]);

  const handleSubmit = () => {
    if (stopped) stopped.current = true;
    // openModal(
    //   <ModalSubmit
    //     onSubmit={() => {
    //       console.log("submit");
    //     }}
    //   />
    // );
  };

  return (
    <SSlider className="">
      <h4 className="text-center slider-title py-4">{props.title}</h4>
      <div
        className="slider-wrapper flex items-center justify-center"
        style={{
          gap: 40,
        }}
      >
        <button
          onClick={handlePrevious}
          className={`${showArrowPrevious ? "visible" : "invisible"}
                      audio-btn
                        `}
        >
          <ArrowLeft />
        </button>
        {props.data && props.data.length > 0 && (
          <div className={"word-assessment"}>
            {props.data.find((item, index) => {
              return index === currentSlide;
            })}
          </div>
        )}

        <button
          onClick={handleNext}
          className={`${showArrowNext ? "visible" : "invisible"}
                    audio-btn
                    ${
                      currentSlide === props.data.length - 1 && isStarting
                        ? "hidden"
                        : ""
                    }
                    `}
        >
          {/*mx-4*/}
          <ArrowRight />
        </button>
        {isStarting && currentSlide === props.data.length - 1 && (
          <button
            style={{
              backgroundColor: "black",
              color: "white",
              padding: "4px 14px",
              cursor: " pointer",
              borderRadius: "4px",
            }}
            onClick={handleSubmit}
          >
            Stop Recording
          </button>
        )}
      </div>
      <div className="dots flex justify-center gap-2 mt-4">
        {props.data &&
          props.data.length > 0 &&
          props.data.map((_, i) => {
            return (
              <div
                className="w-3 h-3 rounded-full border border-gray-400 cursor-pointer"
                style={{
                  backgroundColor: i === currentSlide ? "gray" : "inherit",
                }}
                onClick={onChange(i)}
              />
            );
          })}
      </div>
    </SSlider>
  );
}

export default Slider;
