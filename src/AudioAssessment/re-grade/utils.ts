import { ResponseDefault } from "../view/type";

export const getResultData = (
    data: ResponseDefault & { gradingResults: any[] }
) => {
    try {
        return data.gradingResults;
    } catch (err) {
        return [];
    }
};
