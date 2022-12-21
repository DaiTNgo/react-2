import React from "react";
import { SLayout } from "../styled";

interface Props {
    children?: React.ReactNode;
    footer?: React.ReactNode;
    header?: React.ReactNode;
}
function Layout({ children, footer, header }: Props) {
    return (
        <SLayout>
            {header && header}
            <div className="layout-container flex flex-col justify-between">
                <div style={{}}>{children && children}</div>
                {footer && footer}
            </div>
        </SLayout>
    );
}

export default Layout;
