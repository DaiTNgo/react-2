import styled from "styled-components";

export const Div = styled.div`
    background-color: #fff;
    border-radius: 8px;

    .layout-container {
        padding: 0 60px 20px;
    }
`;

export const Container = styled.div`
    padding: 20px 60px;
    p {
        margin: 0;
    }

    .audio-directions {
        font-size: 24px;
        font-weight: 500;
    }

    .direction-wrapper {
        font-size: 18px;

        b {
            font-weight: 700;
        }
    }

    .wrapper {
        width: 670px;
        margin-inline: auto;
    }
    .fpr__directions {
        margin-bottom: 1rem;
    }
    .fpr-audio {
        margin-bottom: 2rem;
        &__title {
            font-size: 3rem;
        }
    }
`;
