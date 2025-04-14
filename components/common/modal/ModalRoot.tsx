import { createPortal } from "react-dom";
import React from "react";
import ModalTitle from "./ModalTitle";
import ModalContent from "./ModalContent";
import ModalActionsContainer from "./ModalActionsContainer";
import ModalAction from "./ModalAction";

function ModalRoot({
  isOpen,
  onClose,
  children,
}: {
  setIsModalOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  isOpen: boolean;
  onClose: () => void;
  children?: React.ReactNode;
}) {
  if (!isOpen) return null;

  const modalRoot = document.getElementById("modal");
  if (!modalRoot) return null;

  return createPortal(
    <ModalContext.Provider value={{ isOpen, onClose }}>
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          className="absolute inset-0 bg-zinc-700 opacity-10"
        />
        <div
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-md rounded-xl bg-white shadow-lg"
        >
          {children}
        </div>
      </div>
    </ModalContext.Provider>,
    modalRoot
  );
}

interface ModalContextType {
  isOpen: boolean;
  onClose: () => void;
}

const ModalContext = React.createContext<ModalContextType | null>(null);

// Modal 컴포넌트와 하위 컴포넌트들을 담을 객체
interface ModalComposition {
  Root: typeof ModalRoot;
  Title: typeof ModalTitle;
  Content: typeof ModalContent;
  ActionsContainer: typeof ModalActionsContainer;
  Action: typeof ModalAction;
}

const Modal: ModalComposition = {
  Root: ModalRoot,
  Title: ModalTitle,
  Content: ModalContent,
  ActionsContainer: ModalActionsContainer,
  Action: ModalAction,
};

export default Modal;
