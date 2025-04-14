import { createPortal } from "react-dom";
import React from "react";

export default function Portal({
  isOpen,
  onClose,
  children,
  modalRef,
}: {
  setIsModalOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  isOpen: boolean;
  onClose: () => void;
  children?: React.ReactNode;
  modalRef?: React.RefObject<HTMLDivElement | null>;
}) {
  if (!isOpen) return null;

  const modalRoot = document.getElementById("modal");
  if (!modalRoot) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      ref={modalRef}
    >
      <div
        onClick={() => onClose()}
        className="absolute inset-0 bg-zinc-700 opacity-10"
      ></div>
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative h-auto rounded-xl bg-white p-4"
      >
        {children}
      </div>
    </div>,
    modalRoot
  );
}
