import React, { useState } from 'react';
import { IPassageDate } from '..';
import * as S from '../styled';

interface Props {
  content: IPassageDate;
}

function Header({ content }: Props) {
  const [loadImg, setLoadImg] = useState(true);
  return (
    <S.Header className='flex'>
      <div
        style={{
          marginLeft: 'auto',
          position: 'relative',
          minWidth: 1,
        }}
      >
        {loadImg && (
          <div
            style={{
              width: 350,
              height: 80,
              backgroundColor: 'green',
              borderBottomLeftRadius: 30,
            }}
          />
        )}
        <img
          alt='background header'
          src={content.tocBackgroundImage}
          onLoad={() => {
            setLoadImg(false);
          }}
        />
        <div
          style={{
            top: '0',
            // right: '50%',
            position: 'absolute',
            // transform: 'translateX(50%)',
            color: 'white',
            textAlign: 'center',
            width: '100%',
            // position: 'relative',
            zIndex: 10,
          }}
        >
          <p className='header-title'>{content.programTocName}</p>
          <p className='header-subtitle'>{content.resourceTitle}</p>
        </div>
      </div>
    </S.Header>
  );
}

export default Header;
