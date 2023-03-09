import * as S from "../styled/view";
import { useAudioAssessmentContext } from "../ContextAudioAssessment";

function Header() {
    const { data } = useAudioAssessmentContext();
    const title = data.resource?.title;

    return (
        <S.Header>
            <h1 className="header-title">{title}</h1>
        </S.Header>
    );
}

export default Header;
