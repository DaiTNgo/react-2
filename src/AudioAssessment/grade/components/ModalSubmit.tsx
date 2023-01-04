import React, { useState } from "react";
import IconVolume from "../../../Icons/Volume";
import * as S from "./styled";

interface Props {
    onSubmit: () => void;
}
function ModalSubmit({ onSubmit }: Props) {
    const [loading, setLoading] = useState(false);
    return (
        <div
            style={{
                width: 450,
                height: 200,
                backgroundColor: "#fff",
                border: "3px solid rgb(42,100,148)",
                borderRadius: 30,
                display: "grid",
                position: "relative",
                padding: "10px 60px",
                placeItems: "center",
            }}
        >
            <div
                style={{
                    position: "absolute",
                    top: 10,
                    left: 10,
                }}
            >
                <IconVolume fill={"rgb(153,153,153)"} />
            </div>
            <h3
                style={{
                    fontSize: 30,
                    color: "rgb(42,100,148)",
                }}
            >
                Finished?
            </h3>
            <p
                style={{
                    fontSize: 20,
                    color: "#4b4848",
                }}
            >
                Click the Submit button to send your recording to your teacher.
            </p>
            <S.Button
                onClick={() => {
                    setLoading(true);
                    onSubmit();
                }}
                className="flex items-center"
                loading={loading}
            >
                Submit
                <div className="loader loader1">
                    <Loading />
                </div>
            </S.Button>
        </div>
    );
}

export default ModalSubmit;

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
