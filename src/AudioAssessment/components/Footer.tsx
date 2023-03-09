import { IPassageDate } from "../types";
import * as S from "../styled/view";
import Logo from "../../Icons/logo";
interface Props {
    content: IPassageDate;
}
const getLevel = (level: string) => {
    const textLevel = level.split(" ")[1];

    switch (textLevel) {
        case "A":
            return 0;
        case "B":
            return 1;
        case "C":
            return 2;
        case "D":
            return 3;
        case "E":
            return 4;
        case "F":
            return 5;
        case "G":
            return 6;
        default:
            return 0;
    }
};
function Footer({ content }: Props) {
    return (
        <S.Footer className="flex items-center justify-between mt-auto">
            <div className="footer-left flex items-center justify-center">
                <Logo level={getLevel(content.productLevel)} />
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
