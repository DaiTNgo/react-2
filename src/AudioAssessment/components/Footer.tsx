import { IPassageDate } from "../types";
import * as S from "../styled/view";
interface Props {
  content: IPassageDate;
}

function Footer({ content }: Props) {
  return (
    <S.Footer className="flex items-center justify-between mt-auto">
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
    </S.Footer>
  );
}

export default Footer;
