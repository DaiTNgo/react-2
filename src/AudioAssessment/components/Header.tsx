import { useState } from "react";
import * as S from "../styled/view";
import { IPassageDate } from "../types";

interface Props {
  content: IPassageDate;
}

function Header({ content }: Props) {
  const [loadImg, setLoadImg] = useState(true);
  return (
    <S.Header className="flex">
      <div className="header-container">
        {loadImg && <div className="header-img" />}
        <img
          alt="background header"
          src={content.tocBackgroundImage}
          onLoad={() => {
            setLoadImg(false);
          }}
        />
        <div className="header-title-container">
          <p className="header-title">{content.programTocName}</p>
          {/* <p className="header-subtitle">{content.resourceTitle}</p> */}
        </div>
      </div>
    </S.Header>
  );
}

export default Header;
