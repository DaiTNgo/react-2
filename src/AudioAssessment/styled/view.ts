import styled from "styled-components";

export const SSlider = styled.div`
    --width-dot: 10px;
    --height-dot: 10px;

    .audio-btn {
        padding: 10px;
        //border: 1px solid #ccc;
        //border-radius: 10px;
        min-width: 160px;
        justify-content: center;

        &-previous {
        }

        &-next {
        }
    }

    .finish-recording-button {
        background-color: black;
        color: white;
        padding: 4px 14px;
        cursor: pointer;
        border-radius: 4px;
        min-width: 160px;
    }

    .dot-active {
        background-color: gray;
    }
    .dot-inactive {
        background-color: inherit;
    }

    .slick-slider {
        display: flex;
        align-items: center;
    }

    .slick-dots {
        top: calc(100% + 10px);
        height: 20px;
        gap: 10px;

        > li {
            border: 1px solid black;
            border-radius: 50%;
            width: var(--width-dot);
            height: var(--height-dot);

            &.slick-active {
                width: var(--width-dot);
                height: var(--height-dot);

                button {
                    background-color: gray;
                }
            }

            button {
                width: inherit;
                height: inherit;
                border-radius: inherit;
            }
        }
    }

    .slider-title {
        font-size: 32px;
        font-weight: 600;
    }

    .word-assessment {
        font-size: 48px;
        width: 300px;
        height: 200px;
        border: 1px solid #aeaeae;
        display: grid;
        place-content: center;
        user-select: none;
    }

    .btn-audio {
    }
`;

export const Header = styled.div`
    .header-container {
        margin-left: auto;
        position: relative;
        min-width: 1px;
        .header-img {
            width: 350px;
            height: 80px;
            background-color: green;
            border-bottom-left-radius: 30px;
        }

        .header-title-container {
            top: 0;
            position: absolute;
            color: white;
            text-align: center;
            width: 100%;
            z-index: 10;
        }

        .header-title {
            font-size: 20px;
            padding-top: 15px;
            font-weight: 700;
            color: #fff;
            font-family: "HelveticaNeue-Bold", "Roboto", sans-serif;
        }

        .header-subtitle {
            color: #a7d6f8;
            font-size: 16px;
        }
    }
`;

export const Footer = styled.div`
    margin-top: 60px;

    .footer-copyright {
        font-size: 13px;
        color: #666666;
        float: right;
        margin-right: 36px;
        height: 26px;
        margin-top: 14px;
    }

    .program-footer-name {
        --space: 6px;
        color: #666666;
        font-size: 15px;
        border-left: 1px solid #666666;
        padding-left: var(--space);
        margin-left: var(--space);
    }
`;
