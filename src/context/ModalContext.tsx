import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useState,
} from "react";

interface IModal {
  openModal: (modal: ReactNode, propsModal?: PropsModal) => void;
  destroyModal: () => void;
  isVisibleModal: boolean;
  children: ReactNode;
  propsModal: PropsModal;
}

interface PropsModal {
  closeMask: boolean;
}

export const ModalContext = createContext<IModal>(null as unknown as IModal);
ModalContext.displayName = "ModalContext";

export const useModalContext = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("Please add Provider ModalContext!!!");
  }

  return context;
};

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [propsModal, setPropsModal] = useState<PropsModal>({
    closeMask: false,
  });

  const [modal, setModal] = useState<ReactNode>(<></>);

  const openModal = useCallback((modal: ReactNode, props?: PropsModal) => {
    setModal(modal);
    setIsVisible(true);

    if (props) {
      setPropsModal(props);
    }
  }, []);

  const destroyModal = useCallback(() => {
    setIsVisible(false);
  }, []);

  return (
    <ModalContext.Provider
      value={{
        openModal,
        destroyModal,
        isVisibleModal: isVisible,
        children: modal,
        propsModal,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};
