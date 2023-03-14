import * as S from "../styled/view";
import { useAudioAssessmentContext } from "../ContextAudioAssessment";

function Header() {
    const { data } = useAudioAssessmentContext();
    const title = `${data.passageData?.programTocName}: ${data.resource?.title}`;

    const REGERX = /<[^>]*>(.*)<[^>]*>/g;
    const subTitle = REGERX.exec(data.resource?.title ?? "")?.[1];

    return (
        <S.Header>
            <h1 className="header-title">{title}</h1>
            <p>{subTitle}</p>
        </S.Header>
    );
}

export default Header;
