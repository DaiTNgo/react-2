import React, { ReactNode, useState } from "react";
import styled, { css } from "styled-components";

type Props = {
    onClick: () => void;
    needLoading?: boolean;
    children: ReactNode;
    [k: string]: any;
};

function Button({ onClick, needLoading, children, ...props }: Props) {
    const [loading, setLoading] = useState(false);
    return (
        <MyButton
            loading={loading}
            onClick={() => {
                if (needLoading) setLoading(true);
                onClick();
            }}
            {...props}
        >
            {children}
            <div className="loader loader1">
                <Loading />
            </div>
        </MyButton>
    );
}

export { Button };

export const MyButton = styled.button<{ loading?: boolean }>`
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

function Loading() {
    return (
        <svg
            viewBox="0 0 1024 1024"
            focusable="false"
            data-icon="loading"
            width="1em"
            height="1em"
            fill="currentColor"
            aria-hidden="true"
        >
            <path d="M988 548c-19.9 0-36-16.1-36-36 0-59.4-11.6-117-34.6-171.3a440.45 440.45 0 00-94.3-139.9 437.71 437.71 0 00-139.9-94.3C629 83.6 571.4 72 512 72c-19.9 0-36-16.1-36-36s16.1-36 36-36c69.1 0 136.2 13.5 199.3 40.3C772.3 66 827 103 874 150c47 47 83.9 101.8 109.7 162.7 26.7 63.1 40.2 130.2 40.2 199.3.1 19.9-16 36-35.9 36z"></path>
        </svg>
    );
}
