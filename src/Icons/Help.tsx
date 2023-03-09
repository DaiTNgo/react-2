import * as React from "react";

function IconHelp(props: React.SVGProps<SVGSVGElement>) {
    const original_width = 26.337;
    const original_height = 26.366;

    const width = props.height
        ? (parseInt(props.height + "") * original_width) / original_height
        : original_width;
    const height = props.height ? props.height : original_height;

    return (
        <svg
            width={width}
            height={height}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
            viewBox="0 0 26.337 26.366"
        >
            <g transform="translate(0.77 0.75)">
                <g transform="translate(-1239.186 -14)">
                    <path
                        className="a"
                        style={{
                            fill: "none",
                            stroke: "#141414",
                            strokeLinecap: "round",
                            strokeLinejoin: "round",
                            strokeWidth: "1.5px",
                        }}
                        d="M12.436,0A12.418,12.418,0,0,0,.054,12.381a12.043,12.043,0,0,0,2.064,6.81L.054,24.041c-.206.413.206.825.722.722L5.626,22.8a12.043,12.043,0,0,0,6.81,2.064A12.433,12.433,0,0,0,12.436,0Z"
                        transform="translate(1239.186 14)"
                    />
                </g>
                <path
                    className="b"
                    style={{ fill: "#262626" }}
                    d="M1.772.886A.886.886,0,1,1,.886,0,.886.886,0,0,1,1.772.886Z"
                    transform="translate(11.521 17.725)"
                />
                <path
                    className="a"
                    style={{
                        fill: "none",
                        stroke: "#141414",
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: "1.5px",
                    }}
                    d="M3.6,9.749,3.487,7.312A3.583,3.583,0,0,0,6.974,3.656,3.51,3.51,0,0,0,3.487,0,3.51,3.51,0,0,0,0,3.656H.116A3.583,3.583,0,0,1,3.6,0,3.586,3.586,0,0,1,7.09,3.656,3.51,3.51,0,0,1,3.6,7.312Z"
                    transform="translate(8.861 6.204)"
                />
            </g>
        </svg>
    );
}

export default React.memo(IconHelp);
