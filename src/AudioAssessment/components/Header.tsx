import { useState } from "react";
import { IPassageDate } from "../types";
import "../styled/view.scss";

interface Props {
    content: IPassageDate;
}

function Header({ content }: Props) {
    const [loadImg, setLoadImg] = useState(true);
    return (
        <div className="flex header">
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
        </div>
    );
}

export default Header;
