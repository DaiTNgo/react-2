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
                <h3 className={"text-[4.1rem] text-[#df7229] font-semibold"}>
                    Finished?
                </h3>
            </div>

            <p className={"text-[2.9rem] text-[#000000]"}>
                Click the Submit button to send your recording to your teacher.
            </p>
            <S.ButtonSubmit
                onClick={
                    loading
                        ? noop
                        : () => {
                              setLoading(true);
                              onSubmit();
                          }
                }
                className={`mt-8 flex items-center gap-4 ${
                    loading ? "opacity-50" : ""
                }`}
            >
                Submit
                <If condition={loading}>
                    <Then>
                        <Loading width={15} height={15} />
                    </Then>
                </If>
            </S.ButtonSubmit>
        </div>
    );
}

export default ModalSubmit;
