import React from "react";
import "../styled/view.scss";
interface Props {
    children?: React.ReactNode;
    footer?: React.ReactNode;
    header?: React.ReactNode;
}
function Layout({ children, footer, header }: Props) {
    return (
        <div className="s-layout">
            {header && header}
            <div className="layout-container flex flex-col justify-between">
                <div style={{}}>{children && children}</div>
                {footer && footer}
            </div>
        </div>
    );
}

export default Layout;
