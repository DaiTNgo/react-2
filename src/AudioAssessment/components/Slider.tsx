import React, {useRef, useState} from 'react';
import { SSlider} from '../styled';
// import {Carousel, SSlider} from '../styled';
// import {CarouselRef} from 'antd/lib/carousel';

interface Props {
    data: any[];
}

function Slider(props: Props) {
    const refCarousel = useRef<CarouselRef>(null);
    const [currentSlide, setCurrentSlide] = useState(0);

    const onChange = (currentSlide: number) => {
        setCurrentSlide(currentSlide);
    };

    const handlePrevious = () => {
        refCarousel.current?.prev();
    };

    const handleNext = () => {
        refCarousel.current?.next();
    };

    const showArrowPrevious = currentSlide !== 0;
    const showArrowNext = currentSlide !== props.data.length - 1;

    return (
        <SSlider className="">
            <h4 className="text-center slider-title">title</h4>
            <div className="slider-wrapper flex items-center justify-center">
                {props.data && props.data.length > 0 && (
                    <>
                        <button
                            onClick={handlePrevious}
                            className="audio-btn audio-btn-previous"
                            style={{
                                visibility: showArrowPrevious ? 'visible' : 'hidden',
                            }}
                        >
                            <ArrowLeftIcon widths={40} height={30} />
                        </button>
                        <Carousel afterChange={onChange} ref={refCarousel}>
                            {props.data.map((item: any, index: number) => {
                                return (
                                    <div
                                        key={index}
                                        className="flex items-center justify-center inline-block text-center word-assessment"
                                        style={{
                                            width: 100,
                                            height: 100,
                                        }}
                                    >
                                        {item}
                                    </div>
                                );
                            })}
                        </Carousel>

                        <button
                            onClick={handleNext}
                            className="audio-btn audio-btn-next"
                            style={{
                                visibility: showArrowNext ? 'visible' : 'hidden',
                            }}
                        >
                            <ArrowRightIcon height={30} />
                        </button>
                    </>
                )}
            </div>
        </SSlider>
    );
}

export default Slider;
