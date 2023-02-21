import { SSlider } from "../styled/view";
import { useStoreSlider } from "../store/slider";
import { MutableRefObject, useEffect } from "react";
import { TIME_RECORD_STANDARD } from "../do/components/Recording";

interface Props {
    title: string;
    data: any[];
    isStarting?: boolean;
    stopped?: MutableRefObject<boolean>;
    needShowWord?: boolean;
    onSubmitAssignment?: () => void;
}

function ArrowRight() {
    return (
        <svg
            style={{
                width: 40,
                marginInline: "auto",
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
                marginInline: "auto",
            }}
        >
            <path d="M41.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 256 246.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" />
        </svg>
    );
}

function Slider({
    isStarting = false,
    needShowWord = true,
    stopped,
    onSubmitAssignment,
    ...props
}: Props) {
    const { currentSlide, increaseSlide, decreaseSlide } =
        useStoreSlider();

    // const onChange = (currentSlide: number) => () => {
    //     changeSlide(currentSlide);
    // };

    const handlePrevious = () => {
        decreaseSlide();
    };

    const handleNext = () => {
        increaseSlide();
    };

    const showArrowPrevious = currentSlide !== 0;
    const showArrowNext = currentSlide !== props.data.length - 1;

    // useEffect(() => {
    //     if (!props?.data?.length) return;
    //     if (!isStarting) return;
    //
    //     if (currentSlide === props.data.length - 1) return;
    //
    //     if (stopped?.current) return;
    //     const id = setTimeout(() => {
    //         increaseSlide();
    //     }, (TIME_RECORD_STANDARD / props.data.length) * 1000);
    //
    //     return () => {
    //         clearTimeout(id);
    //     };
    // }, [currentSlide, isStarting]);

    const renderSlideData = () => {
        if (needShowWord) {
            if (props.data && props.data.length > 0) {
                return (
                    <div className={"word-assessment"}>
                        {props.data.find((item, index) => {
                            return index === currentSlide;
                        })}
                    </div>
                );
            }
        } else {
            return <div className={"word-assessment"}></div>;
        }
    };
    return (
        <SSlider className="">
            <h4 className="text-center slider-title py-4">{props.title}</h4>
            <div className="slider-wrapper flex items-center justify-center">
                <button
                    onClick={handlePrevious}
                    className={`${showArrowPrevious ? "visible" : "invisible"}
                      audio-btn
                        `}
                >
                    <ArrowLeft />
                </button>
                {renderSlideData()}

                <button
                    onClick={needShowWord ? handleNext : () => {}}
                    className={`${showArrowNext ? "visible" : "invisible"}
                    audio-btn
                    ${
                        currentSlide === props.data.length - 1 && isStarting
                            ? "hidden"
                            : ""
                    }`}
                    disabled={!needShowWord}
                >
                    <ArrowRight />
                </button>
                {isStarting && currentSlide === props.data.length - 1 && (
                    <button
                        className="finish-recording-button"
                        onClick={onSubmitAssignment}
                        style={{
                            transform: "translateX(40px)",
                        }}
                    >
                        Stop Recording
                    </button>
                )}
            </div>
            <div className="dots flex justify-center gap-2 mt-4">
                {props.data.length && (
                    <p>
                        {currentSlide + 1} out of {props.data.length}
                    </p>
                )}
            </div>
        </SSlider>
    );
}

export default Slider;
