import { useEffect, useState } from "react";
import { ResourceLayoutEnum } from "../enums/layout";
import { AudioAssessmentContext } from "./ContextAudioAssessment";
import DoAssessment from "./do";
import { ResponseDefault } from "./view/type";
import ViewResource from "./view";
import { useObserverHeight } from "./hooks/useObserverHeight";
import { ACTION_POST_MESSAGE } from "../enums/action";
import GradeAssessment from "./grade";
import ReGrade from "./re-grade";

function AudioAssessment() {
    const [data, setData] = useState<ResponseDefault | null>();

    const [studentAssignmentId, setStudentAssignmentId] = useState<
        number | undefined
    >(undefined);

    const [urlRecordStudent, setUrlRecordStudent] = useState("");

    const [layout, setLayout] = useState<ResourceLayoutEnum>(
        ResourceLayoutEnum.VIEW_RESOURCE
    );

    const [accessToken, setAccessToken] = useState("");

    const [location, setLocation] = useState("");

    useEffect(() => {
        const fn = (event: any) => {
            console.log("FPR:::Send message from parent", event.data);
            if (!event.data) return;

            console.log(
                "FPR::: offsetHeight",
                document.documentElement.offsetHeight
            );
            switch (event.data.action) {
                case ACTION_POST_MESSAGE.FPR_RESP_DATA:
                    if (event.data.body.response) {
                        setData(event.data.body.response);
                    }

                    if (event.data.body.layout) {
                        setLayout(event.data.body.layout);
                    }

                    if (event.data.body.accessToken) {
                        setAccessToken(event.data.body.accessToken);
                    }

                    if (event.data.body.response.studentAssignmentId) {
                        setStudentAssignmentId(
                            event.data.body.response.studentAssignmentId
                        );
                    }

                    if (event.data.body.location) {
                        setLocation(event.data.body.location);
                    }

                    if (event.data.body.urlRecordStudent) {
                        setUrlRecordStudent(event.data.body.urlRecordStudent);
                    }

                    break;
                case ACTION_POST_MESSAGE.FPR_RESP_SYNC_AUDIO:
                    setUrlRecordStudent(event.data.body.urlRecordStudent);
                    break;
                default:
                    break;
            }
        };
        window.addEventListener("message", fn);
        return () => {
            window.removeEventListener("message", fn);
        };
    }, []);

    useObserverHeight();

    if (!data) {
        return (
            <div
                style={{
                    width: "100%",
                    height: "500px",
                    backgroundColor: "#fff",
                }}
            >
                Loading...
            </div>
        );
    }

    const Component = (() => {
        switch (layout) {
            case ResourceLayoutEnum.VIEW_RESOURCE:
                return <ViewResource />;
            case ResourceLayoutEnum.DO_ASSIGNMENT:
                return <DoAssessment />;
            case ResourceLayoutEnum.GRADING:
                return <GradeAssessment />;
            case ResourceLayoutEnum.REGRADING:
                return <ReGrade />;
            default:
                break;
        }
    })();

    return (
        <AudioAssessmentContext.Provider
            value={{
                data,
                studentAssignmentId,
                accessToken,
                location,
                urlRecordStudent,
            }}
        >
            {Component}
        </AudioAssessmentContext.Provider>
    );
}

export default AudioAssessment;
