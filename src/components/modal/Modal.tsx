import styled from "styled-components";
import { useModalContext } from "../../context/ModalContext";

interface Props {
  isVisible: boolean;
}

function Modal() {
  const { children, isVisibleModal } = useModalContext();

  if (!isVisibleModal) return <></>;
  return (
    <Wrapper>
      <div className="absolute inset-0 z-10 h-screen bg-gray-300">
        <div className="relative z-20 grid place-content-center h-screen">
          {children}
        </div>
      </div>
    </Wrapper>
  );
}

export default Modal;

const Wrapper = styled.div`
  background-color: rgba(255, 255, 255, 0.8);
`;
