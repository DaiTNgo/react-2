import { VIEW_GRADE } from "../../enums/view-grade";

export class ResponseDefault extends Response {
    assignment = {
        assignmentId: 972717,
        name: "Assessment: Cumulative Assessment: Fluency Check",
        surveyImplementOption: "SELF_GUIDED_ASSESSMENT",
        assessmentPeriod: "BEGINNING_OF_YEAR_ASSESSMENT_PERIOD",
    };
    submissionMetadata = {
        index: -1,
        pause: false,
        t: -1,
    };
    resource = {
        resourceId: 352100,
        title: "Cumulative Assessment: Fluency Check",
        resourceBrand: "ISE",
        phonicsSurveyType: "SURVEYFLUENCY",
        phonicsAssessmentType: VIEW_GRADE.COMPREHENSIVE_PHONICS_SURVEY, //"Fluency Check",
        toc: {
            programTOCId: 7641,
            name: "Assessment",
        },
        assignableResource: false,
        audioAssessment: true,
    };

    studentAssignment = {
        studentId: 730248,
        firstName: "stu1",
        lastName: "stu1",
        studentAssignmentId: 14757041,
        audioRecordedUrl:
            "https://assets.sadlierconnect.com/cqa/AudioAssessment/730248/14757041_audio_recorded.wav?Expires=1673498300&Signature=bXEGAgC~-nW1823qlwq6dZ4sDULwZa3XlxKQFf7NxlNLSi8eKh58n0i02zf~o~hxb8B4nWtjGmYBApNXx705R-a-I4P2ZJHG13yQiLVmFdzC3rfN0WOdjdiO67cuXqAGMurlXLGKU3bz2fXUlyDLPAlHldEY8BJXHDbN5OsLYNfGPSD6CBeGIqoPPRihOR~OHtpPoAaCnQ9LlCbnom0v8-ogXHuOAlP55uZfx4Do2zUCIs~C2N8daR~IsuXi2sZTYFyl-Bf9pbqE9KzQTEy72PTIVqbMpvopk4HE-310wi6FNXn-Lgvg3BAaJtaxqE5OdJ~IUDsiWnQPrrQXzrO8Lg__&Key-Pair-Id=APKAJLNAMKK3PO57GWDA",
        comments: "",
        speedScore: -1,
        accuracyScore: 0,
        fluencyScore: 0,
        totalScore: -1,
        gradingResults: [
            {
                word: "diot",
                correct: "incorrect",
                accuracy: "idle",
                fluency: "idle",
                comment: "N/A",
            },
            {
                word: "spoud",
                correct: "incorrect",
                accuracy: "idle",
                fluency: "idle",
                comment: "N/A",
            },
            {
                word: "clar",
                correct: "incorrect",
                accuracy: "idle",
                fluency: "idle",
                comment: "N/A",
            },
            {
                word: "foy",
                correct: "incorrect",
                accuracy: "idle",
                fluency: "idle",
                comment: "N/A",
            },
            {
                word: "jern",
                correct: "incorrect",
                accuracy: "idle",
                fluency: "idle",
                comment: "N/A",
            },
            {
                word: "moof",
                correct: "incorrect",
                accuracy: "idle",
                fluency: "idle",
                comment: "N/A",
            },
            {
                word: "lurst",
                correct: "incorrect",
                accuracy: "idle",
                fluency: "idle",
                comment: "N/A",
            },
            {
                word: "porth",
                correct: "incorrect",
                accuracy: "idle",
                fluency: "idle",
                comment: "N/A",
            },
            {
                word: "stook",
                correct: "incorrect",
                accuracy: "idle",
                fluency: "idle",
                comment: "NULL",
            },
            {
                word: "flirch",
                correct: "incorrect",
                accuracy: "idle",
                fluency: "idle",
                comment: "undefined",
            },
        ],
        phonicsAssessmentResponseId: 69,
    };

    questionBean = {
        listQuestion: [
            {
                questionSetPassageXML:
                    '<div class="direction-wrapper">\n<div class="direction-title">\n<div class="flash-card-audio">\n<audio src="/content/audios/DL_Survey.mp3"></audio>\n</div>\n<b>Directions:</b></div>\n\n<p class="direction-content">Select Record to begin.<br />\nRead the word aloud.<br />\nSelect the arrow to read the next word.<br />\nSelect Stop Recording when you finish the assessment. Then, select Submit to submit your recording to your teacher.</p>\n</div>',
                questionJsonObject: {
                    contents: ["lat", "lat", "lat", "lat", "lat", "lat"],
                },
            },
        ],
    };

    gradingResults = [];
    speedScore = 0;

    passageData = {
        programTocName: "",
        resourceTitle: "",
        productLevel: "",
        programFooterImage: "",
        tocBackgroundImage: "",
        copyright:
            "Copyright &copy; 2021 William H. Sadlier, Inc. All rights reserved.",
    };
}

export interface IPassageDate {
    programTocName: string;
    resourceTitle: string;
    productLevel: string;
    programFooterImage: string;
    tocBackgroundImage: string;
    copyright: string;
}
