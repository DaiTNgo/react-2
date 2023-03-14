import React from "react";
import { IPropsIcon } from "../AudioAssessment/types";
import { StatusMachine } from "../enums/status-machine";

function Check({
    fill = "#fff",
    width = 80,
    height = 80,
    status = StatusMachine.IDLE,
    onClick = () => {},
}: Partial<
    IPropsIcon & {
        fillBorder: string;
        onClick: () => void;
        status: StatusMachine;
    }
>) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 26.17 30.95"
            height={height}
            width={width}
            version="1.1"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            xmlSpace="preserve"
            onClick={onClick}
            className="cursor-pointer"
        >
            <g>
                <g>
                    <path
                        fill={status == StatusMachine.CORRECT ? "#393" : fill}
                        stroke={"#999"}
                        strokeMiterlimit={10}
                        fillRule={"evenodd"}
                        d="M23.6.8A3.56,3.56,0,0,0,19,2.53L10.78,20.3,7.14,14.58A3.63,3.63,0,0,0,2.2,13.45,3.46,3.46,0,0,0,1,18.28L7.73,28.8a3.62,3.62,0,0,0,3.62,1.61,3.52,3.52,0,0,0,3.41-2L25.36,5.34A3.41,3.41,0,0,0,23.6.8Z"
                    />
                </g>
            </g>
        </svg>
    );
}

export default Check;
