"use client";

import usePreventLeave from "@/utils/hooks/preventLeave/usePreventLeave";
import { useMemo } from "react";
import Modal from "./modal/composition/ModalRoot";

export default function PreventLeaveWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const { openModal, handlePopStateModalClose } = usePreventLeave();

  const LeaveModals = useMemo(
    () => (
      <Modal.Root onClose={handlePopStateModalClose} isOpen={openModal}>
        <Modal.Title>작성중인 내용이 삭제됩니다.</Modal.Title>
        <Modal.ActionsContainer>
          <Modal.Action onClick={handlePopStateModalClose}>
            계속하기
          </Modal.Action>
          <Modal.Action onClick={() => window.history.back()}>
            나가기
          </Modal.Action>
        </Modal.ActionsContainer>
      </Modal.Root>
    ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [openModal]
  );

  return (
    <>
      {children}
      {LeaveModals}
    </>
  );
}
