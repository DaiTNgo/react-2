import React, { ReactNode } from "react";
import "./global.scss";
type Props = {
    children: ReactNode;
};

function Global({ children }: Props) {
    return <div>{children}</div>;
}

export default Global;
