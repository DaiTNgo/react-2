import { IPassageDate } from "../types";
import * as S from "../styled/view";
interface Props {
    content: IPassageDate;
}

function Footer({ content }: Props) {
    return (
        <S.Footer className="flex items-center justify-between mt-auto">
            <div className="footer-left flex items-center justify-center">
                <img
                    style={{
                        height: 40,
                        width: 230,
                        objectFit: "contain",
                    }}
                    // src={content.programFooterImage}
                    src={
                        "https://static.assets.sadlierconnect.com/sc-content/javascript/phonics/assets/fpr/fpr_text.svg"
                    }
                    alt="footer resource"
                />
                <span />
                <p className="program-footer-name">{content.productLevel}</p>
            </div>

            <div className="footer-right">
                <p className="footer-copyright">
                    {content.copyright.replace("&copy;", "©")}
                </p>
            </div>
        </S.Footer>
    );
}

export default Footer;
