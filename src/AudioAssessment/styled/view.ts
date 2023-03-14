import styled from "styled-components";

export const SSlider = styled.div`
    --width-dot: 10px;
    --height-dot: 10px;

    .audio-btn {
        padding: 10px;
        min-width: 160px;
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
    .header-title {
        font-size: 32px;
        margin-bottom: 40px;
        font-weight: 600;
        padding-left: 1rem;
    }
`;

export const Footer = styled.div`
    margin-top: 60px;
    font-family: "Roboto", sans-serif;
    font-weight: 300;

    .footer-copyright {
        font-size: 14px;
        color: #000000;
        float: right;
        margin-right: 36px;
        height: 26px;
        margin-top: 14px;
    }

    .program-footer-name {
        --space: 6px;
        color: #000000;
        font-size: 2rem;
        border-left: 1px solid #666666;
        padding-left: var(--space);
        margin-left: var(--space);
    }
`;
