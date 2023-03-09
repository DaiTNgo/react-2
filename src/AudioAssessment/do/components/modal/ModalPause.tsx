import React, { useRef, useState } from "react";
import * as S from "../styled";
import { Loading } from "../../../components/Loading";
import { If, Then } from "react-if";
import { noop } from "lodash";
import IconVolume from "../../../../Icons/IconVolume";
import srcAudioPause from "../../../../assets/audio/press_resume.mp3";
import Volume from "../../../components/Volume";
interface Props {
    onResume: () => void;
    onSave: () => void;
}
function ModalPause({ onResume, onSave }: Props) {
    const [loading, setLoading] = useState(false);
    const audioResumeRef = useRef();

    const handleSave = () => {
        setLoading(true);
        onSave();
    };
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
                    <Volume src={srcAudioPause} />
                </div>
                <h3 className={"text-[3rem] text-[#2a6494]"}>Paused</h3>
            </div>
            <p className={"text-center text-[2rem] text-[#4b4848]"}>
                You've paused your recording.
                <br />
                Press the "Resume" button bellow to Resume recording.
            </p>
            <div className={"flex gap-6 mt-6"}>
                <S.Button
                    onClick={loading ? noop : onResume}
                    className={`flex items-center gap-4 cursor-pointer ${
                        loading ? "cursor-default" : ""
                    }`}
                    variant={"secondary"}
                >
                    Resume Recording
                </S.Button>
                <S.Button
                    onClick={loading ? noop : handleSave}
                    className={`flex items-center gap-4 cursor-pointer ${
                        loading ? "opacity-50 cursor-default" : ""
                    }`}
                >
                    Save and Exit
                    <If condition={loading}>
                        <Then>
                            <Loading width={15} height={15} />
                        </Then>
                    </If>
                </S.Button>
            </div>
        </div>
    );
}

export default ModalPause;
