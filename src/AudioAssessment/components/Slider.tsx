import { useState } from "react";
import { SSlider } from "../styled/view";

interface Props {
  title: string;
  data: any[];
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

function Slider(props: Props) {
  // const refCarousel = useRef<CarouselRef>(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  const onChange = (currentSlide: number) => {
    setCurrentSlide(currentSlide);
  };

  const handlePrevious = () => {
    // refCarousel.current?.prev();
    onChange(currentSlide - 1);
  };

  const handleNext = () => {
    onChange(currentSlide + 1);
    // refCarousel.current?.next();
  };

  const showArrowPrevious = currentSlide !== 0;
  const showArrowNext = currentSlide !== props.data.length - 1;

  return (
    <SSlider className="">
      <h4 className="text-center slider-title py-4">{props.title}</h4>
      <div className="slider-wrapper flex items-center justify-center">
        <button
          onClick={handlePrevious}
          className={`${showArrowPrevious ? "visible" : "invisible"}
                        mx-4
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
                    mx-4`}
        >
          <ArrowRight />
        </button>
      </div>
      <div className="flex justify-center gap-2 mt-4">
        {props.data &&
          props.data.length > 0 &&
          props.data.map((_, i) => {
            return (
              <div
                className="w-3 h-3 rounded-full border border-gray-400 cursor-pointer"
                style={{
                  backgroundColor: i === currentSlide ? "gray" : "inherit",
                }}
                onClick={() => {
                  onChange(i);
                }}
              />
            );
          })}
      </div>
    </SSlider>
  );
}

export default Slider;
