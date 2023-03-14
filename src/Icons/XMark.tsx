import React from "react";
import { IPropsIcon } from "../AudioAssessment/types";
import { StatusMachine } from "../enums/status-machine";

function XMark({
    width,
    height,
    status = StatusMachine.IDLE,
    onClick = () => {},
}: Partial<
    IPropsIcon & {
        status?: StatusMachine;
        onClick: () => void;
    }
>) {
    return (
        <div>
            <svg
                fill="black"
                width={width}
                height={height}
                viewBox="-5.6 -5.6 67.20 67.20"
                xmlns="http://www.w3.org/2000/svg"
                strokeWidth={6}
                stroke={
                    status == StatusMachine.CORRECT ||
                    status == StatusMachine.IDLE
                        ? "#ccc"
                        : "#f00"
                }
                onClick={onClick}
                className={"cursor-pointer"}
            >
                <g>
                    <path d="M 10.0234 43.0234 C 9.2266 43.8203 9.2031 45.1797 10.0234 45.9766 C 10.8438 46.7734 12.1797 46.7734 13.0000 45.9766 L 28.0000 30.9766 L 43.0000 45.9766 C 43.7969 46.7734 45.1563 46.7969 45.9766 45.9766 C 46.7734 45.1562 46.7734 43.8203 45.9766 43.0234 L 30.9531 28.0000 L 45.9766 13.0000 C 46.7734 12.2031 46.7969 10.8437 45.9766 10.0469 C 45.1328 9.2266 43.7969 9.2266 43.0000 10.0469 L 28.0000 25.0469 L 13.0000 10.0469 C 12.1797 9.2266 10.8203 9.2031 10.0234 10.0469 C 9.2266 10.8672 9.2266 12.2031 10.0234 13.0000 L 25.0234 28.0000 Z" />
                </g>
            </svg>
        </div>
    );
}

export default XMark;
