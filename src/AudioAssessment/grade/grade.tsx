import { useModalContext } from "../../context/ModalContext";
import Check from "../../Icons/Check";
import Volumn from "../../Icons/Volumn";
import XMark from "../../Icons/XMark";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Layout from "../components/Layout";
import { useAudioAssessmentContext } from "../ContextAudioAssessment";
import { SIndex } from "../styled/view";
import { ResponseDefault } from "./type";
import { getContentHeaderFooter, getDirections, getListWord } from "./utils";
import Table from "../../components/table";

const dataSource = [
    {
        key: "1",
        name: "Mike",
        age: 32,
        address: "10 Downing Street",
    },
    {
        key: "2",
        name: "John",
        age: 42,
        address: "10 Downing Street",
    },
];
const columns = [
    {
        title: "Short Vowels",
        dataIndex: "name",
        key: "name",
        // width: "200px", //20%
        width: "20%",
        align: "left",
    },
    {
        title: "Correct/Incorrect",
        dataIndex: "age",
        key: "age",
        // width: "600px",
        width: "60%",
        align: "center",
        render: (record: any) => {
            return (
                <>
                    <Check height={40} width={40} status={"correct"} />
                    <XMark height={40} status={"correct"} />
                </>
            );
        },
    },
    {
        title: "Comments",
        dataIndex: "address",
        key: "address",
        // width: "200px",
        width: "20%",
        align: "center",
    },
];

function GradeAssessment() {
    const { data, studentAssignmentId } = useAudioAssessmentContext();

    const listWord = getListWord(data as ResponseDefault);
    const componentDirection = getDirections(data as ResponseDefault);
    const contentHeaderFooter = getContentHeaderFooter(data as ResponseDefault);

    console.log("listWord", listWord);
    return (
        <SIndex>
            <Layout
                footer={<Footer content={contentHeaderFooter} />}
                header={<Header content={contentHeaderFooter} />}
            >
                <div className="flex items-start gap-1">
                    <div
                        dangerouslySetInnerHTML={{
                            __html: componentDirection,
                        }}
                    />
                </div>
                <audio controls src={data.audioRecordedUrl}></audio>

                <Table dataSource={dataSource} columns={columns} />
            </Layout>
        </SIndex>
    );
}

export default GradeAssessment;
