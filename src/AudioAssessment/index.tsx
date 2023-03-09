import { lazy, ReactNode, Suspense, useState } from "react";
import { ResourceLayoutEnum } from "../enums/layout";
import { AudioAssessmentContext } from "./ContextAudioAssessment";
import { ResponseDefault } from "./view/type";
import { useObserverHeight } from "./hooks/useObserverHeight";
import { ACTION_POST_MESSAGE } from "../enums/action";
import { sendToParent } from "../helper";
import { useListenPostMessage } from "./hooks/useListenPostMessage";
import { Loading } from "./components/Loading";

const DoAssessment = lazy(() => import("./do"));
const ViewResource = lazy(() => import("./view"));
const GradeAssessment = lazy(() => import("./grade"));
const ReGrade = lazy(() => import("./re-grade"));
const Review = lazy(() => import("./review"));

const FallBack = () => {
    return (
        <div className={"w-full h-screen bg-white grid place-items-center"}>
            <Loading />
        </div>
    );
};

function AudioAssessment() {
    const [scale, setScale] = useState(1);
    const [data, setData] = useState<ResponseDefault | null>(
        new ResponseDefault()
    );
    const [urlRecordStudent, setUrlRecordStudent] = useState("");
    const [layout, setLayout] = useState<ResourceLayoutEnum>(
        ResourceLayoutEnum.VIEW_RESOURCE
    );

    const handlePrint = () => {
        window.print();
    };

    useListenPostMessage((event) => {
        // console.log("FPR:::Send message from parent", event.data);
        if (!event.data) return;

        if (/changeScale/i.test(event.data as unknown as string)) {
            // @ts-ignore
            const textScale = event.data.match(/changeScale=(.*)/i)[1];
            setScale(textScale);
        }

        //@ts-ignore
        switch (event.data) {
            //@ts-ignore
            case ACTION_POST_MESSAGE.FPR_PRINT:
                handlePrint();
                break;
            default:
                break;
        }

        switch (event.data.action) {
            case ACTION_POST_MESSAGE.FPR_RESP_DATA:
                if (event.data.body.response) {
                    setData(event.data.body.response);
                }

                if (event.data.body.layout) {
                    setLayout(event.data.body.layout);
                }

                setUrlRecordStudent(event.data.body.urlRecordStudent || "");

                break;
            case ACTION_POST_MESSAGE.FPR_RESP_SYNC_AUDIO:
                setUrlRecordStudent(event.data.body.urlRecordStudent);
                break;
            case ACTION_POST_MESSAGE.FPR_CHANGE_STUDENT:
                setUrlRecordStudent(event.data.body.urlRecordStudent || "");

                if (event.data.body.response) {
                    setData(event.data.body.response);
                }
                break;
            case ACTION_POST_MESSAGE.FPR_PRINT:
                handlePrint();
                break;
            default:
                break;
        }
    });

    useObserverHeight((height) => {
        sendToParent({ action: ACTION_POST_MESSAGE.FPR_HEIGHT, resp: height });
    });

    const component = new Map<ResourceLayoutEnum, ReactNode>([
        [ResourceLayoutEnum.VIEW_RESOURCE, <ViewResource />],
        [ResourceLayoutEnum.DO_ASSIGNMENT, <DoAssessment />],
        [ResourceLayoutEnum.GRADING, <GradeAssessment />],
        [ResourceLayoutEnum.REGRADING, <ReGrade />],
        [ResourceLayoutEnum.REVIEW_ASSIGNMENT, <Review />],
    ]);

    const render = (layout: ResourceLayoutEnum) => {
        return component.get(layout);
    };

    if (!data) {
        return <FallBack />;
    }

    return (
        <AudioAssessmentContext.Provider
            value={{
                data,
                urlRecordStudent,
                layout,
            }}
        >
            <div
                style={{
                    transform: `scale(${scale})`,
                    transformOrigin: `${
                        scale < 1 ? "top center" : "top left"
                    } `,
                }}
            >
                <Suspense fallback={<FallBack />}>{render(layout)}</Suspense>
            </div>
        </AudioAssessmentContext.Provider>
    );
}

export default AudioAssessment;
