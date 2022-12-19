import React from 'react';
import { SLayout } from '../styled';

interface Props {
    children: React.ReactNode;
    footer: React.ReactNode;
    header: React.ReactNode;
}
function Layout({ children, footer, header }: Props) {
    return (
        <SLayout>
            {header}
            <div className="layout-container">
                <div>{children}</div>
                {footer}
            </div>
        </SLayout>
    );
}

export default Layout;
