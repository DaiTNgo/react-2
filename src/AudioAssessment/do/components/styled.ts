import styled, { css } from "styled-components";
export const ModalContainer = styled.div`
    --num-count-down: 3s;
    --width: 50px;
    --stroke-dasharray: 142px;

    width: 500px;
    height: 200px;
    background-color: #fff;
    border: 3px solid #2a6494;
    border-radius: 3rem;
    //border-top: 8px solid #3579c1;
    display: grid;
    place-content: center;
    place-items: center;

    .modal-title {
        font-size: 36px;
        color: #4b4848;
    }

    .count-down {
        width: 50px;
        height: 50px;
        background-color: white;
        border: 2px solid #ccc;
        border-radius: 50%;
        display: grid;
        place-content: center;
        font-size: 20px;
    }

    .countdown {
        position: relative;
        height: var(--width);
        width: var(--width);
    }

    .countdown-number {
        position: absolute;

        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);

        font-size: 20px;
        color: black;
    }

    svg {
        position: absolute;
        top: 0;
        right: 0;
        width: var(--width);
        height: var(--width);
        transform: rotateZ(-90deg);

        .circle-bar {
            stroke-dasharray: var(--stroke-dasharray);
            stroke-dashoffset: 0px;
            stroke-linecap: round;
            stroke-width: 3px;
            stroke: #2a6494;
            fill: none;
            animation: countdown-bar var(--num-count-down) linear 1;
        }

        .circle-thumb {
            stroke-dasharray: 0px;
            stroke-dashoffset: var(--stroke-dasharray);
            stroke-linecap: round;
            stroke-width: 2px;
            stroke: #ccc;
            fill: none;
            animation: circle-thumb var(--num-count-down) linear 1;
        }
    }

    @keyframes countdown-bar {
        from {
            stroke-dashoffset: 0;
        }
        to {
            stroke-dashoffset: var(--stroke-dasharray);
        }
    }
    @keyframes circle-thumb {
        from {
            stroke-dashoffset: var(--stroke-dasharray);
        }
        to {
            stroke-dashoffset: 0px;
        }
    }

    @keyframes rotate {
        from {
            transform: rotate(0);
        }
        to {
            transform: rotate(-360deg);
        }
    }
`;

export const ModalPermissionAudio = styled.div`
    width: 500px;
    height: 200px;
    background-color: #fff;
    border: 1px solid #ccc;
    border-top: 8px solid #3579c1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 0.8rem;
    .title {
        font-size: 2.4rem;
        margin-bottom: 1rem;
    }
    .btn-ok {
        border-radius: 4px;
        border: 1px solid gray;
        width: 100px;
        margin-inline: auto;
        margin-bottom: 10px;
    }
    .content {
        font-size: 2rem;
    }
`;

export const RecordContainer = styled.div`
    position: relative;

    display: flex;
    justify-content: center;
    align-items: center;

    border-radius: 99999px;

    width: max-content;
    min-width: 200px;
    margin: 40px auto;
    height: 50px;
    padding: 0.5rem;

    cursor: pointer;
    user-select: none;
    background-color: #2a6494;

    box-sizing: content-box;
    .micro-container {
        background-color: #fff;
        width: 50px;
        height: 50px;
        display: grid;
        place-content: center;
        border-radius: 50%;

        position: absolute;
        left: 0.5rem;
    }
    .record-container {
        color: #fff;
        font-size: 2.4rem;
        font-weight: 500;
    }
`;

export const RecordingContainer = styled.div`
    display: inline-block;
    .micro-container {
        top: 45px;
        left: -60px;
        position: absolute;
    }
    .loading-recording {
        display: grid;
        place-content: center;
        font-weight: 700;
    }

    .recording-container {
        padding: 10px 20px;
        background-color: #c7c7c7;
        border-radius: 10px;
        .recording-item-wrapper {
            display: flex;
            gap: 10px;
        }
        .recording-item {
            width: 10px;
            height: 40px;
            border-radius: 999999px;
            border: 1px solid black;
            background-color: white;
            &.active {
                background-color: gray;
            }
        }
    }
    .action-button {
        border: 1px solid;
        padding: 4px;
    }
`;

export const Button = styled.button<{
    variant?: "primary" | "secondary";
}>`
    color: white;
    background-color: ${({ variant }) => {
        if (variant === "secondary") {
            return "gray";
        }
        return "#3579c1";
    }};
    padding: 2px 12px;
    border-radius: 10px;
    //cursor: pointer;
`;
