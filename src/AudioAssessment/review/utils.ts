import { ResponseDefault } from "../view/type";

export const getResultData = (data: ResponseDefault) => {
    try {
        return data.studentAssignment.gradingResults;
    } catch (err) {
        return [];
    }
};
