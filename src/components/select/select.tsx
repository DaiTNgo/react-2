import React, { MutableRefObject, useRef, useState } from "react";
import styles from "./select.module.scss";
import { className } from "../../helper";
import { useOnClickOutside } from "../../hooks/useClickOutSide";

export interface ISelectOption {
    label: string;
    value: number;
    key: number;
}

type Props = {
    options: ISelectOption[];
    onClick: (value: ISelectOption) => void;
    selected: ISelectOption;
};

function Select({ options, onClick, selected }: Props) {
    const [showDropdown, setShowDropdown] = React.useState(false);

    const refSelect = useRef<HTMLDivElement>(null);

    useOnClickOutside(refSelect, () => {
        setShowDropdown(false);
    });

    return (
        <div className={"relative flex items-center"} ref={refSelect}>
            <div
                className={className(styles.Select, "flex items-center")}
                onClick={() => setShowDropdown(!showDropdown)}
            >
                <div>
                    <p className={"select-none"}>{selected.label}</p>
                    <div
                        className={`${styles["fpr-arrow"]}
                        ${
                            showDropdown
                                ? styles["fpr-arrow-up"]
                                : styles["fpr-arrow-down"]
                        }
                    `}
                    >
                        <div />
                    </div>
                </div>
            </div>
            <div>
                {showDropdown && (
                    <div
                        className={"absolute top-full inset-0"}
                        style={{
                            height: 100,
                            overflowY: "auto",
                            border: "1px solid #3579c1",
                            borderTop: "none",
                        }}
                    >
                        {options.map((item) => (
                            <div
                                key={item.key}
                                className={className(
                                    styles["select-item"],
                                    "cursor-pointer"
                                )}
                                style={{
                                    padding: "6px 0",
                                    paddingLeft: 10,
                                }}
                                onClick={() => {
                                    onClick(item);
                                    setShowDropdown(false);
                                }}
                            >
                                {item.label}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Select;
