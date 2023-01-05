//@ts-nocheck
import React from "react";
import { TableProps } from "../types";

function Table<T>({ dataSource, columns }: TableProps<T>) {
    const { th, td } = ((_data, _columns) => {
        const th = [];
        const td = [];
        _columns.forEach((cl, index) => {
            th.push(
                <div
                    style={{
                        width: cl.width ? cl.width : "auto",
                        flexGrow: cl.width ? 0 : 1,
                        textAlign: cl.align,
                    }}
                    className="text-center"
                >
                    <div>
                        {typeof cl["title"] === "function"
                            ? cl["title"]()
                            : cl["title"]}
                    </div>
                </div>
            );
        });
        _data.forEach((rc, _index) => {
            const _td = _columns.map((cl, index) => {
                return (
                    <div
                        key={index}
                        style={{
                            width: cl.width,
                            textAlign: cl.align,
                            alignSelf: index == 0 ? "self-end" : "",
                            // marginInline: cl.align == "center" ? "auto" : "",
                            flexGrow: cl.width ? 0 : 1,
                        }}
                        className={`text-center p-0 ${
                            cl.align == "center" ? "flex items-center" : ""
                        }`}
                    >
                        <div
                            className={`flex ${
                                index !== 0 ? "items-center" : ""
                            }
                            ${cl.align == "center" ? "justify-center" : ""}
                             gap-2
                             w-full
                             `}
                        >
                            {cl.render
                                ? cl.render(rc, _index, _data)
                                : rc[cl["dataIndex"]]}
                        </div>
                    </div>
                );
            });
            td.push(
                <div
                    className={"flex items-center"}
                    style={{
                        height: 60,
                        borderBottom: "1px solid rgb(172, 172, 172)",
                        paddingRight: 30,
                    }}
                >
                    {_td}
                </div>
            );
        });
        return { th, td };
    })(dataSource, columns);

    return (
        <div className="w-full">
            <div>
                <div
                    className={"flex"}
                    style={{ padding: "0px 30px 0px 20px" }}
                >
                    {th}
                </div>
            </div>
            <div
                style={{
                    outline: "2px solid rgb(172, 172, 172)",
                    paddingLeft: 20,
                    paddingBottom: 10,
                }}
            >
                {td}
            </div>
        </div>
    );
}

export default Table;
