import { ReactNode } from "react";

type ColumnsType<T> = {
    title: string;
    dataIndex: Omit<keyof T, "key">;
    key: any;
    width?: string | number;
    render?: (record: T) => ReactNode;
};

interface RcTableProps<T> {}

interface RecordType {}

export interface TableProps<RecordType> {
    dataSource: RecordType[];
    columns: ColumnsType<RecordType>[];
}