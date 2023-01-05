import React, { useState } from "react";
import IconVolume from "../../../Icons/Volume";
import * as S from "./styled";
import { Button } from "../../../components/button";

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
            <Button
                onClick={() => {
                    setLoading(true);
                    onSubmit();
                }}
                className="flex items-center"
                loading={loading}
            >
                Submit
            </Button>
        </div>
    );
}

export default ModalSubmit;
