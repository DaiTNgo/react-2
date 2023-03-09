import React, { memo } from "react";

type Props = any;

function IconPause() {
    return (
        <div>
            <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
                <path d="M200 160C186.8 160 176 170.8 176 184v144C176 341.3 186.8 352 200 352S224 341.3 224 328v-144C224 170.8 213.3 160 200 160zM312 160C298.8 160 288 170.8 288 184v144c0 13.25 10.75 24 24 24s24-10.75 24-24v-144C336 170.8 325.3 160 312 160zM256 0C114.6 0 0 114.6 0 256s114.6 256 256 256s256-114.6 256-256S397.4 0 256 0zM256 464c-114.7 0-208-93.31-208-208S141.3 48 256 48s208 93.31 208 208S370.7 464 256 464z" />
            </svg>
        </div>
    );
}

export default IconPause;

export const IconPauseActive = memo(function () {
    return (
        <svg
            fill="#000000"
            width="50px"
            height="50px"
            viewBox="0 0 24 24"
            id="pause-circle"
            data-name="Flat Color"
            xmlns="http://www.w3.org/2000/svg"
            className="icon flat-color"
        >
            <g id="SVGRepo_bgCarrier" strokeWidth="0" />

            <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
            />

            <g id="SVGRepo_iconCarrier">
                <circle
                    id="primary"
                    cx="12"
                    cy="12"
                    r="10"
                    style={{
                        fill: "#df7229",
                    }}
                />

                <path
                    id="secondary"
                    d="M14,17a1,1,0,0,1-1-1V8a1,1,0,0,1,2,0v8A1,1,0,0,1,14,17Zm-4,0a1,1,0,0,1-1-1V8a1,1,0,0,1,2,0v8A1,1,0,0,1,10,17Z"
                    style={{
                        fill: "#ffffff",
                    }}
                />
            </g>
        </svg>
    );
});
export const IconPauseInActive = memo(function () {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            // xmlns:xlink="http://www.w3.org/1999/xlink"
            width="66px"
            height="66px"
            viewBox="0 0 66 66"
        >
            <defs>
                <filter
                    id="Ellipse_69"
                    x="0"
                    y="0"
                    width="66"
                    height="66"
                    filterUnits="userSpaceOnUse"
                >
                    {/*<feOffset dy="1" input="SourceAlpha" />*/}
                    <feGaussianBlur stdDeviation="3" result="blur" />
                    <feFlood floodOpacity="0.251" />
                    <feComposite operator="in" in2="blur" />
                    <feComposite in="SourceGraphic" />
                </filter>
            </defs>
            <g id="pause_off" transform="translate(9 8)">
                <g
                    transform="matrix(1, 0, 0, 1, -9, -8)"
                    filter="url(#Ellipse_69)"
                >
                    <circle
                        id="Ellipse_69-2"
                        data-name="Ellipse 69"
                        cx="24"
                        cy="24"
                        r="24"
                        transform="translate(9 8)"
                        fill="#fff"
                    />
                </g>
                <g
                    id="Group_1418"
                    data-name="Group 1418"
                    transform="translate(-405 -558)"
                >
                    <rect
                        id="Rectangle_584"
                        data-name="Rectangle 584"
                        width="8"
                        height="20"
                        rx="4"
                        transform="translate(419 572)"
                        fill="#df7229"
                    />
                    <rect
                        id="Rectangle_585"
                        data-name="Rectangle 585"
                        width="8"
                        height="20"
                        rx="4"
                        transform="translate(431 572)"
                        fill="#df7229"
                    />
                </g>
            </g>
        </svg>
    );
});
