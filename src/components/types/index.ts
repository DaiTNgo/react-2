import { ReactNode } from "react";

type ColumnsType<T> = {
    title: string | Function;
    dataIndex: Omit<keyof T, "key">;
    key: any;
    width?: string | number;
    render?: (record: T, index: number, dataSource: T[]) => ReactNode;
};

interface RcTableProps<T> {}

interface RecordType {}

export interface TableProps<RecordType> {
    dataSource: RecordType[];
    columns: ColumnsType<RecordType>[];
}
