import React, {useState} from 'react';
import {SSlider} from '../styled';
// import {Carousel, SSlider} from '../styled';
// import {CarouselRef} from 'antd/lib/carousel';

interface Props {
    title: string;
    data: any[];
}

function Slider(props: Props) {
    // const refCarousel = useRef<CarouselRef>(null);
    const [currentSlide, setCurrentSlide] = useState(0);

    const onChange = (currentSlide: number) => {
        setCurrentSlide(currentSlide);
    };

    const handlePrevious = () => {
        // refCarousel.current?.prev();
        setCurrentSlide(currentSlide - 1);
    };

    const handleNext = () => {
        setCurrentSlide(currentSlide + 1);
        // refCarousel.current?.next();
    };

    const showArrowPrevious = currentSlide !== 0;
    const showArrowNext = currentSlide !== props.data.length - 1;

    return (
        <SSlider className="">
            <h4 className="text-center slider-title py-4">{props.title}</h4>
            <div className="slider-wrapper flex items-center justify-center">
                <button onClick={handlePrevious}
                        className={`${
                            showArrowPrevious ? 'visible' : 'invisible'
                        }
                        mx-4
                      audio-btn
                        `}
                >Previous
                </button>
                {props.data && props.data.length > 0 && (
                    <div
                        className={'word-assessment'}
                    >
                        {
                            props.data.find((item, index) => {
                                return (index === currentSlide)
                            })
                        }


                        {/*<button*/}
                        {/*    onClick={handlePrevious}*/}
                        {/*    className="audio-btn audio-btn-previous"*/}
                        {/*    style={{*/}
                        {/*        visibility: showArrowPrevious ? 'visible' : 'hidden',*/}
                        {/*    }}*/}
                        {/*>*/}
                        {/*    <ArrowLeftIcon widths={40} height={30} />*/}
                        {/*</button>*/}
                        {/*<Carousel afterChange={onChange} ref={refCarousel}>*/}
                        {/*    {props.data.map((item: any, index: number) => {*/}
                        {/*        return (*/}
                        {/*            <div*/}
                        {/*                key={index}*/}
                        {/*                className="flex items-center justify-center inline-block text-center word-assessment"*/}
                        {/*                style={{*/}
                        {/*                    width: 100,*/}
                        {/*                    height: 100,*/}
                        {/*                }}*/}
                        {/*            >*/}
                        {/*                {item}*/}
                        {/*            </div>*/}
                        {/*        );*/}
                        {/*    })}*/}
                        {/*</Carousel>*/}

                        {/*<button*/}
                        {/*    onClick={handleNext}*/}
                        {/*    className="audio-btn audio-btn-next"*/}
                        {/*    style={{*/}
                        {/*        visibility: showArrowNext ? 'visible' : 'hidden',*/}
                        {/*    }}*/}
                        {/*>*/}
                        {/*    <ArrowRightIcon height={30} />*/}
                        {/*</button>*/}
                    </div>
                )}
                <button onClick={handleNext}
                        className={`${
                            showArrowNext ? 'visible' : 'invisible'

                        }
                            audio-btn
                        mx-4`}

                >Next
                </button>
            </div>
        </SSlider>
    );
}

export default Slider;
