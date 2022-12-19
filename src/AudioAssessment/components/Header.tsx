import React from 'react';
import { IPassageDate } from '..';
import * as S from '../styled';
interface Props {
    content: IPassageDate;
}
function Header({ content }: Props) {
    return (
        <S.Header className="flex">
            <div
                style={{
                    marginLeft: 'auto',
                    position: 'relative',
                }}
            >
                <img alt="background header view resource" src={content.tocBackgroundImage} />
                <div
                    style={{
                        top: '0',
                        right: '50%',
                        position: 'absolute',
                        color: 'white',
                        textAlign: 'center',
                        transform: 'translateX(50%)',
                        width: '100%',
                    }}
                >
                    <p className="header-title">{content.programTocName}</p>
                    <p className="header-subtitle">{content.resourceTitle}</p>
                </div>
            </div>
        </S.Header>
    );
}

export default Header;
