import React, { useState } from "react";
import * as S from "../styled";
import { Loading } from "../../../components/Loading";
import { If, Then } from "react-if";
import { noop } from "lodash";
import Volume from "../../../components/Volume";
import srcAudioFinished from "../../../../assets/audio/click_button.mp3";

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
            <div className={"flex items-center gap-1"}>
                <div className={"cursor-pointer"}>
                    <Volume src={srcAudioFinished} />
                </div>
                <h3 className={"text-[3rem] text-[#2a6494]"}>Finished?</h3>
            </div>

            <p
                style={{
                    fontSize: 20,
                    color: "#4b4848",
                }}
            >
                Click the Submit button to send your recording to your teacher.
            </p>
            <S.Button
                onClick={
                    loading
                        ? noop
                        : () => {
                              setLoading(true);
                              onSubmit();
                          }
                }
                className={`flex items-center gap-4 ${
                    loading ? "opacity-50" : ""
                }`}
            >
                Submit
                <If condition={loading}>
                    <Then>
                        <Loading width={15} height={15} />
                    </Then>
                </If>
            </S.Button>
        </div>
    );
}

export default ModalSubmit;
