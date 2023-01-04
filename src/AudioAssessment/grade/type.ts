import { IPassageDate } from "../types";
import { VIEW_GRADE } from "../../enums/view-grade";

export interface Response {
    currentQuestion: null;
    currentIndex: number;
    hasTECRCU: boolean;
    hasPunctuation: boolean;
    toolSetList: [];
    groupIndex: null;
    presenterMode: boolean;
    showListView: boolean;
    showConnotation: boolean;
    showSelfCheckButtons: boolean;
    applicationSettingMap: {
        enable_create_assignment: "Enable";
    };
    questionBean: {
        maxSize: 4;
        current: 1;
        total: 1;
        prev: boolean;
        next: boolean;
        last: boolean;
        presenterMode: boolean;
        offset: 5;
        toIndex: 1;
        fromIndex: 1;
        listQuestion: [
            {
                questionId: 2999112;
                questionNumber: 1;
                questionXml: '<?xml version="1.0" encoding="UTF-8"?>\n<root circle="" underline="" inPassage="boolean" x="" y="" pDirection=""\n    puzzleNumber="" puncMark="" acceptOne=""><question><![CDATA[<div class="question-questionStem question-questionStem-1-column">\n<div class="question-stem-content">\n<div begin="1" cid="FPR_g1_cps_as1_q1_ans01" ctype="Audio_Record" qname="a1"><word>lat</word> <word>ped</word> <word>sib</word> <word>mog</word> <word>vun</word> <word>fim</word> <word>hep</word> <word>yot</word> <word>rud</word> <word>cag</word></div>\n</div>\n</div>]]></question><direction><![CDATA[]]></direction><direction4Print><![CDATA[]]></direction4Print><epilog></epilog><showOptionLabel>boolean</showOptionLabel><scrambleOption>boolean</scrambleOption></root>\n';
                questionPregeneratedHtml: '<table border="0" width="100%" style="table-layout:fixed;" id="question_table_1" class=" "><tr><td class="question_number" style="" questionLabel="1" link2Question="">1.&nbsp;</td><td class="question_description"><div class="question-questionStem question-questionStem-1-column">\n<div class="question-stem-content">\n<div begin="1" cid="FPR_g1_cps_as1_q1_ans01" ctype="Audio_Record" qname="a1"><word>lat</word> <word>ped</word> <word>sib</word> <word>mog</word> <word>vun</word> <word>fim</word> <word>hep</word> <word>yot</word> <word>rud</word> <word>cag</word></div>\n</div>\n</div></td></tr></table>';
                answerCount: -1;
                correctAnswerNumber: -1;
                correctAnswer: '{"comps":[{"id":"FPR_g1_cps_as1_q1_ans01","value":"","type":"Audio_Record"}]}';
                correctAnswerHTML: "Answer will vary.";
                questionPoolId: -1;
                maxScore: 1;
                questionSetPassageId: 532425;
                questionSetPassageXML: '<div class="direction-wrapper">\n<div class="direction-title">\n<div class="flash-card-audio">\n<audio src="/content/audios/DL_Survey.mp3"></audio>\n</div>\n<b>Directions:</b></div>\n\n<p class="direction-content">Select Record to begin.<br />\nRead the word aloud.<br />\nSelect the arrow to read the next word.<br />\nSelect Stop Recording when you finish the assessment. Then, select Submit to submit your recording to your teacher.</p>\n</div>';
                questionType: "TE";
                gridableType: "";
                assessmentId: null;
                responseScore: null;
                originalScore: null;
                lastModifiedScore: null;
                rubric: "";
                problemSolution: "";
                rubricRules: "";
                scoringFormula: "";
                toolset: "";
                webDOK: "";
                correctAsIs: boolean;
                questionUid: "5e0103cb-cf68-4eb1-a615-ce2e527fc611";
                questionNumCssClass: "";
                questionNumCssStyle: "";
                toolsetList: [];
                renderRule: "";
                words: "";
                connotation: "";
                reportingRule: "";
                hideLabelRule: boolean;
                printPregeneratedHtmlContent: "";
                wordMeaning: "";
                labelSchema: "";
                labelSchemaCustom: "";
                hasAlgorithm: boolean;
                hasMoved: boolean;
                scoreList: null;
                teacherComment: null;
                responseId: null;
                isSkippedAnswer: boolean;
                isMaster: null;
                hint1: "";
                hint2: "";
                hint3: "";
                hint4: "";
                screenId: 0;
                screenElementId: 0;
                feedback: "";
                originalFeedback: "";
                componentGradingRules: "";
                autoScoreTE: boolean;
                answerQuestionPid: "";
                baseQuestionId: -1;
                isLastQuestionSetInList: null;
                needConvertToIse: null;
                label: null;
                isSkiped: boolean;
                smp: "";
                questionIdsGroup: [];
                multipartQuestions: [];
                studentQuestionNumber: 0;
                standards: [];
                parentLink: -1;
                collaboration: "";
                wordMapContent: "";
                wordMapUri: "";
                resourceTitle: null;
                programTocName: null;
                programTocId: null;
                questionJson: '{"contents":["lat","ped","sib","mog","vun","fim","hep","yot","rud","cag"]}';
                questionJsonObject: {
                    contents: [
                        "lat",
                        "ped",
                        "sib",
                        "mog",
                        "vun",
                        "fim",
                        "hep",
                        "yot",
                        "rud",
                        "cag"
                    ];
                };
                questionSetPassageXml: '<div class="direction-wrapper">\n<div class="direction-title">\n<div class="flash-card-audio">\n<audio src="/content/audios/DL_Survey.mp3"></audio>\n</div>\n<b>Directions:</b></div>\n\n<p class="direction-content">Select Record to begin.<br />\nRead the word aloud.<br />\nSelect the arrow to read the next word.<br />\nSelect Stop Recording when you finish the assessment. Then, select Submit to submit your recording to your teacher.</p>\n</div>';
                autoScore: boolean;
            }
        ];
        question: null;
        originalIndex: 0;
        optionDisplayOrder: null;
        totalQuestionAndPart: 1;
    };
    programCssClass: null;
    headerPassage: '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "//www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">\r\n<html>\r\n<head>\r\n    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">\r\n    <meta http-equiv="X-UA-Compatible" content="IE=8" />\r\n    <title></title>\r\n    <link rel="stylesheet"         href="//static.assets.sadlierconnect.com/sc-content/javascript/games/vw-achieve-v1.9/v1.3/css/styles_v1.43.css">\r\n    <link rel="stylesheet"         href="//static.assets.sadlierconnect.com/sc-content/javascript/games/vw-achieve-v1.9/v1.3/css/jquery.mCustomScrollbar.css">\r\n\r\n    <script type=\'text/javascript\' src="//static.assets.sadlierconnect.com/sc-content/javascript/games/jquery-1.8.3.min.js"></script>\r\n    <link rel="stylesheet"        href="//static.assets.sadlierconnect.com/sc-content/javascript/jquery-ui/themes/cloud/jquery-ui-1.10.0.custom.css">\r\n    <script type=\'text/javascript\' src="//static.assets.sadlierconnect.com/sc-content/javascript/jquery-ui/jquery-ui-1.10.0.custom.js"></script>\r\n    <script type=\'text/javascript\' src="//static.assets.sadlierconnect.com/sc-content/javascript/games/vw-achieve-v1.9/v1.3/js_v1.4/jquery.mobile.custom.min.js"></script>\r\n\r\n    <script type=\'text/javascript\' src="//static.assets.sadlierconnect.com/sc-content/javascript/games/vw-achieve-v1.9/v1.3/js_v1.4/jquery.mCustomScrollbar.min_v1.0.js"></script>\r\n    <script type=\'text/javascript\' src="//static.assets.sadlierconnect.com/sc-content/javascript/games/vw-achieve-v1.9/v1.3/js_v1.4/jquery.mousewheel.min.js"></script>\r\n    <script type=\'text/javascript\' src="//static.assets.sadlierconnect.com/sc-content/javascript/games/vw-achieve-v1.9/v1.3/js_v1.4/main_v1.12.js"></script>\r\n    <script type=\'text/javascript\' src="//static.assets.sadlierconnect.com/sc-content/javascript/games/vw-achieve-v1.9/v1.3/js_v1.4/fpre_audio_assessment_v1.5.js"></script>\r\n    <link rel="stylesheet"         href="//static.assets.sadlierconnect.com/sc-content/javascript/games/vw-achieve-v1.9/v1.3/css/fpre_v1.3.css">\r\n\r\n    <script type="text/javascript">\r\n        \r\n    </script>\r\n    \r\n</head>\r\n\r\n<body class="from-phonics-to-reading english-language-arts part-a-short-vowels  assessment level-a default">\r\n\r\n<div id="dhtmlwindowholder">\r\n    <span style="display: none;">.</span>\r\n</div>\r\n\r\n<div id="innerreader" style="display: none;">\r\n\r\n    <div style="float: left; width: 20px; background-color: rgb(170, 170, 170); height: 100%;">&nbsp;</div>\r\n\r\n    <div style="float: right; width: 20px; background-color: rgb(170, 170, 170); height: 100%;">&nbsp;</div>\r\n\r\n</div>\r\n\r\n<div class="ui-droppable" id="container" style="display: block;">\r\n    <div id="pagecontainer">\r\n        <div class="boxshadow" id="page">\r\n            <div id="title" class="withline no_lesson_title">\r\n                <div class="toc_name">Assessment</div>\r\n                <div class="resource_title">Part A: Short Vowels</div>\r\n            </div>\r\n            <div id="content">\r\n                <div id="reservedAreaStudentNameScore">&nbsp;</div>\r\n                <div class="resource_title"></div>\r\n                <div class="resource_desc">Part A: Short Vowels</div>\r\n                \r\n\r\n                ';
    footerPassage: '\r\n            </div>\r\n\r\n            <div class="clearfloat" style="height: 1px; overflow: hidden;">&nbsp;</div>\r\n            <div class="resourceFooterSection">\r\n                <div class="program_info">\r\n                    <span class="program_footer_image"></span>\r\n                    <span class="gray_separator"></span>\r\n                    <span class="program_footer_name">Level A</span>\r\n                </div>\r\n                <div class="footer_copyright">\r\n                    Copyright &copy; by William H. Sadlier, Inc. All rights reserved.\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n<script type=\'text/javascript\' src=\'//static.assets.sadlierconnect.com/sc-content/javascript/games/vw-achieve-v1.9/plugins/jquery.ba-postmessage.min.js\'></script>\r\n<script type=\'text/javascript\' src=\'//static.assets.sadlierconnect.com/sc-content/javascript/games/vw-achieve-v1.9/plugins/one.js\'></script>\r\n<script type=\'text/javascript\' src="//static.assets.sadlierconnect.com/sc-content/javascript/games/vw-achieve-v1.9/plugins/crossdomain_v1.1.js"></script>\r\n\r\n</body>\r\n</html>';
    assessmentId: 126569;
    assessmentViewISE: boolean;
    assessmentView: boolean;
    ciuresource: boolean;
    passageData: IPassageDate;
    resource: {
        resourceId: 348881;
        title: "Part A: Short Vowels";
    };
}

export class ResponseDefault extends Response {
    resource = {
        resourceId: 348881,
        title: "Part A: Short Vowels",
        phonicsAssessmentType: VIEW_GRADE.HIGH_FREQUENCY_WORD,
    };

    questionBean = {
        listQuestion: [
            {
                questionSetPassageXML:
                    '<div class="direction-wrapper">\n<div class="direction-title">\n<div class="flash-card-audio">\n<audio src="/content/audios/DL_Survey.mp3"></audio>\n</div>\n<b>Directions:</b></div>\n\n<p class="direction-content">Select Record to begin.<br />\nRead the word aloud.<br />\nSelect the arrow to read the next word.<br />\nSelect Stop Recording when you finish the assessment. Then, select Submit to submit your recording to your teacher.</p>\n</div>',
                questionJsonObject: {
                    contents: [
                        "lat",
                        "ped",
                        "sib",
                        "mog",
                        "vun",
                        "fim",
                        "hep",
                        "yot",
                        "rud",
                        "cag",
                    ],
                },
            },
        ],
    };

    passageData = {
        programTocName: "",
        resourceTitle: "",
        productLevel: "",
        programFooterImage: "",
        tocBackgroundImage: "",
        copyright:
            "Copyright &copy; 2021 William H. Sadlier, Inc. All rights reserved.",
        phonicsAssessmentType: VIEW_GRADE.HIGH_FREQUENCY_WORD,
    };
}
