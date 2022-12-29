import { truncate } from "lodash";
import styled, { css } from "styled-components";

export const ModalContainer = styled.div`
    width: 500px;
    height: 200px;
    background-color: #fff;
    border: 1px solid #ccc;
    border-top: 8px solid #3579c1;
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
        background-color: #ccc;
        border-radius: 50%;
        display: grid;
        place-content: center;
        font-size: 20px;
    }
`;

export const RecordContainer = styled.div`
    background-color: rgb(111, 111, 111);
    display: flex;
    gap: 10px;
    border-radius: 99999px;
    padding: 4px;
    align-items: center;
    width: max-content;
    min-width: 200px;
    margin: 40px auto;
    cursor: pointer;
    user-select: none;
    .micro-container {
        background-color: #fff;
        width: 50px;
        height: 50px;
        display: grid;
        place-content: center;
        border-radius: 50%;
    }
    .record-container {
        color: #fff;
        font-size: 24px;
        font-weight: 500;
    }
`;

export const RecordingContainer = styled.div`
    display: inline-block;
    .micro-container {
        top: 45;
        left: -60;
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
            gap: 10;
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

export const Button = styled.button<{ loading?: boolean }>`
    color: white;
    background-color: rgb(75, 135, 71);
    padding: 2px 12px;
    border-radius: 10px;
    cursor: pointer;
    ${({ loading }) => {
        if (!loading)
            return css`
                .loader {
                    display: none;
                }
            `;
        return css`
            opacity: 0.5;
            .loader {
                display: inline-block;
                vertical-align: middle;
                position: relative;
                margin-left: 10px;
            }

            @keyframes loader1 {
                from {
                    transform: rotate(0);
                }
                to {
                    transform: rotate(360deg);
                }
            }
            @keyframes loader1-center {
                from {
                    box-shadow: 0 0 0 10px #6532d2; /* background color */
                }
                to {
                    box-shadow: 0 0 0 5px #6532d2; /* background color */
                }
            }
            .loader1 {
                transform-origin: center;
                animation: loader1 1s linear infinite;
            }
        `;
    }}
`;
