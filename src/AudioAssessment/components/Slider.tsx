import { SSlider } from "../styled/view";
import { useStoreSlider } from "../store/slider";
import { MutableRefObject, useEffect } from "react";
import { IconArrowLeft } from "../../Icons/ArrowLeft";
import { IconArrowRight } from "../../Icons/ArrowRight";
import { useAudioAssessmentContext } from "../ContextAudioAssessment";
import IconHelp from "../../Icons/Help";

interface Props {
    data: any[];
    isStarting?: boolean;
    stopped?: MutableRefObject<boolean>;
    needShowWord?: boolean;
    onSubmitAssignment?: () => void;
    onLastSlide?: () => void;
}

function Slider({
    isStarting = false,
    needShowWord = true,
    stopped,
    onSubmitAssignment,
    onLastSlide,
    ...props
}: Props) {
    const { currentSlide, increaseSlide, decreaseSlide, changeSlide } =
        useStoreSlider();

    const { data } = useAudioAssessmentContext();

    useEffect(() => {
        if (
            isStarting &&
            data.submissionMetadata?.index &&
            data.submissionMetadata?.index !== -1
        ) {
            changeSlide(data.submissionMetadata?.index);
        }
    }, [data, isStarting]);

    const handlePrevious = () => {
        decreaseSlide();
    };

    const handleNext = () => {
        increaseSlide();
    };

    const showArrowPrevious = currentSlide !== 0;
    const showArrowNext = currentSlide !== props.data.length - 1;

    useEffect(() => {
        if (currentSlide === props.data.length - 1 && onLastSlide) {
            onLastSlide();
        }
    }, [currentSlide, props.data]);

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
            <div className="flex items-center justify-center">
                <button
                    onClick={handlePrevious}
                    className={`${
                        showArrowPrevious ? "visible" : "invisible"
                    } audio-btn`}
                >
                    <IconArrowLeft />
                </button>

                {renderSlideData()}

                <button
                    onClick={needShowWord ? handleNext : () => {}}
                    className={`${
                        showArrowNext ? "visible" : "invisible"
                    } audio-btn ${
                        currentSlide === props.data.length - 1 && isStarting
                            ? "hidden"
                            : ""
                    } ${needShowWord ? "" : "opacity-50"}`}
                    disabled={!needShowWord}
                >
                    <IconArrowRight />
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
