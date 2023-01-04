import { ResponseDefault } from "../types";

export const getResultData = (
    data: ResponseDefault & { gradingResults: any[] }
) => {
    try {
        return data.gradingResults;
    } catch (err) {
        return [];
    }
};
