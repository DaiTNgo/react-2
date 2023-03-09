import React, { memo } from "react";
import "./Volumn.scss";

function IconVolume({
    width = 25,
    height = 25,
    fill,
    active,
}: {
    height?: number;
    width?: number;
    fill?: string;
    active?: boolean;
}) {
    if (active) {
        return (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                // xmlns:xlink="http://www.w3.org/1999/xlink"
                width="50px"
                height="50px"
                viewBox="0 0 65.925 65.925"
            >
                <defs>
                    <filter
                        id="Path_721"
                        x="0"
                        y="0"
                        width="65.925"
                        height="65.925"
                        filterUnits="userSpaceOnUse"
                    >
                        {/*<feOffset dy="1" input="SourceAlpha" />*/}
                        <feGaussianBlur stdDeviation="3" result="blur" />
                        <feFlood floodOpacity="0.161" />
                        <feComposite operator="in" in2="blur" />
                        <feComposite in="SourceGraphic" />
                    </filter>
                </defs>
                <g id="audio_on_icn" transform="translate(9 8)">
                    <g
                        id="Group_2202"
                        data-name="Group 2202"
                        transform="translate(-126 -1145)"
                    >
                        <g
                            transform="matrix(1, 0, 0, 1, 117, 1137)"
                            filter="url(#Path_721)"
                        >
                            <path
                                id="Path_721-2"
                                data-name="Path 721"
                                d="M23.962,0A23.962,23.962,0,1,1,0,23.962,23.962,23.962,0,0,1,23.962,0Z"
                                transform="translate(9 8)"
                                fill="#fff"
                            />
                        </g>
                    </g>
                    <g id="AudioIcon_active" transform="translate(11 14)">
                        <path
                            id="Path_39"
                            data-name="Path 39"
                            d="M329.187,302.394l-7.072-4.307h-5.777v-8.324h5.777l7.072-4.523Z"
                            transform="translate(-316.338 -283.654)"
                            fill="#390"
                        />
                        <path
                            id="Path_40"
                            data-name="Path 40"
                            d="M333.75,288.27s4.542,5.77,0,10.491"
                            transform="translate(-316.338 -283.654)"
                            fill="none"
                            stroke="#390"
                            strokeLinecap="round"
                            strokeMiterlimit="10"
                            strokeWidth="2"
                        />
                        <path
                            id="Path_41"
                            data-name="Path 41"
                            d="M338.841,283.654s7.315,9.873,0,18.742"
                            transform="translate(-316.338 -283.654)"
                            fill="none"
                            stroke="#390"
                            strokeLinecap="round"
                            strokeMiterlimit="10"
                            strokeWidth="2"
                        />
                    </g>
                </g>
            </svg>
        );
    }
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            // xmlns:xlink="http://www.w3.org/1999/xlink"
            width="50px"
            height="50px"
            viewBox="0 0 65.925 65.925"
        >
            <defs>
                <filter
                    id="Path_721"
                    x="0"
                    y="0"
                    width="65.925"
                    height="65.925"
                    filterUnits="userSpaceOnUse"
                >
                    {/*<feOffset dy="1" input="SourceAlpha" />*/}
                    <feGaussianBlur stdDeviation="3" result="blur" />
                    <feFlood floodOpacity="0.161" />
                    <feComposite operator="in" in2="blur" />
                    <feComposite in="SourceGraphic" />
                </filter>
            </defs>
            <g id="audio_off_icn" transform="translate(9 8)">
                <g
                    id="Group_2201"
                    data-name="Group 2201"
                    transform="translate(-126 -1145)"
                >
                    <g
                        transform="matrix(1, 0, 0, 1, 117, 1137)"
                        filter="url(#Path_721)"
                    >
                        <path
                            id="Path_721-2"
                            data-name="Path 721"
                            d="M23.962,0A23.962,23.962,0,1,1,0,23.962,23.962,23.962,0,0,1,23.962,0Z"
                            transform="translate(9 8)"
                            fill="#fff"
                        />
                    </g>
                </g>
                <path
                    id="Path_1686"
                    data-name="Path 1686"
                    d="M614.166,839.4l-7.072-4.307h-5.777v-8.324h5.777l7.072-4.523Z"
                    transform="translate(-585.317 -807.249)"
                    fill="#999"
                />
            </g>
        </svg>
    );
}

export default IconVolume;
