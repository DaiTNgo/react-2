import React from "react";
import Volumn from "../../../Icons/Volumn";
interface Props {
    onSubmit: () => void;
}
function ModalSubmit({ onSubmit }: Props) {
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
                <Volumn fill={"rgb(153,153,153)"} />
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
            <button
                style={{
                    color: "white",
                    backgroundColor: "rgb(75,135,71)",
                    padding: "2px 12px",
                    borderRadius: 10,
                    cursor: "pointer",
                }}
                onClick={onSubmit}
            >
                Submit
            </button>
        </div>
    );
}

export default ModalSubmit;
