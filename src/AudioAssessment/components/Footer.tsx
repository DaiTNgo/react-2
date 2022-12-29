import { IPassageDate } from "../types";
import "../styled/view.scss";
interface Props {
    content: IPassageDate;
}

function Footer({ content }: Props) {
    return (
        <div className={`flex items-center justify-between mt-auto footer`}>
            <div className="footer-left flex items-center justify-center">
                <img src={content.programFooterImage} alt="footer resource" />
                <span />
                <p className="program-footer-name">{content.productLevel}</p>
            </div>

            <div className="footer-right">
                <p className="footer-copyright">
                    {content.copyright.replace("&copy;", "©")}
                </p>
            </div>
        </div>
    );
}

export default Footer;
