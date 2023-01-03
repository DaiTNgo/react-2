//@ts-nocheck
import React from "react";
import { TableProps } from "../types";

function Table<T>({ columns, dataSource }: TableProps<T>) {
    const { th, td } = ((_data, _columns) => {
        const th = [];
        const td = [];
        _columns.forEach((cl, index) => {
            th.push(
                <th
                    style={{
                        width: cl.width,
                        textAlign: cl.align,
                    }}
                    className="text-center"
                >
                    <div
                        style={{
                            marginLeft: index == 0 ? 20 : 0,
                        }}
                    >
                        {cl["title"]}
                    </div>
                </th>
            );
        });
        _data.forEach((rc) => {
            const _td = _columns.map((cl, index) => {
                return (
                    <td
                        style={{
                            width: cl.width,
                            paddingTop: 16,
                            textAlign: cl.align,
                        }}
                        className="text-center p-0"
                    >
                        <div
                            style={{
                                borderBottom: "1px solid",
                                marginLeft: index == 0 ? 20 : 0,
                                marginBottom: 10,
                            }}
                            className={"flex items-center justify-center gap-2"}
                        >
                            {cl.render ? cl.render(rc) : rc[cl["dataIndex"]]}
                        </div>
                    </td>
                );
            });
            td.push(
                <tr
                    style={{
                        verticalAlign: "bottom",
                    }}
                >
                    {_td}
                </tr>
            );
        });
        return { th, td };
    })(dataSource, columns);
    return (
        <table className="w-full">
            <thead>
                <tr>{th}</tr>
            </thead>
            <tbody
                style={{
                    outline: "1px solid",
                }}
            >
                {td}
            </tbody>
        </table>
    );
}

export default Table;
