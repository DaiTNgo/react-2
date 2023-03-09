import React from "react";
import * as S from "../styled";
import Volume from "../../../components/Volume";
import srcAudioAllow from "../../../../assets/audio/allow.mp3";

interface Props {
    onAllow: (isAllow: boolean) => void;
}

function ModalAllowAudio({ onAllow }: Props) {
    // @ts-ignore
    return (
        <div
            style={{
                width: 450,
                backgroundColor: "#fff",
                border: "3px solid rgb(42,100,148)",
                borderRadius: 30,
                display: "grid",
                position: "relative",
                padding: "10px 60px",
                placeItems: "center",
            }}
        >
            <div className={"flex items-center gap-1"}>
                <div className={"cursor-pointer"}>
                    <Volume src={srcAudioAllow} />
                </div>
                <h3 className={"text-[3rem] text-[#2a6494]"}>Allow Audio</h3>
            </div>
            <p className={"text-center text-[2rem] text-[#4b4848]"}>
                We will record your assignment.
                <br />
                Please select{" "}
                <span
                    className={"text-[#2a6494] cursor-pointer underline"}
                    onClick={() => onAllow(true)}
                >
                    Allow
                </span>{" "}
                to let SadlierConnect use your mic for recording on this
                browser.
            </p>
            <div className={"flex gap-6 mt-6"}>
                <S.Button
                    onClick={() => onAllow(false)}
                    className={`flex items-center gap-4 cursor-pointer`}
                    variant={"secondary"}
                >
                    Don't Allow
                </S.Button>
                <S.Button
                    onClick={() => onAllow(true)}
                    className={`flex items-center gap-4 cursor-pointer`}
                >
                    Allow
                </S.Button>
            </div>
        </div>
    );
}

export default ModalAllowAudio;
