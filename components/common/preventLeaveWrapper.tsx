"use client";

import usePreventLeave from "@/utils/hooks/preventLeave/usePreventLeave";
import { useRouter } from "next/navigation";
import Modal from "@/components/common/modal/composition/ModalRoot";
import { useEffect } from "react";
export default function PreventLeaveWrapper({
  children,
  isSuccess,
}: {
  children: React.ReactNode;
  isSuccess: boolean;
}) {
  const { openModal, handlePopStateModalClose, setIsAllowLeave, setOpenModal } =
    usePreventLeave();
  const router = useRouter();
  useEffect(() => {
    setIsAllowLeave(isSuccess);
    setOpenModal(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess]);
  return (
    <>
      <Modal.Root onClose={handlePopStateModalClose} isOpen={openModal}>
        <Modal.Title>작성중인 내용이 삭제됩니다.</Modal.Title>
        <Modal.ActionsContainer>
          <Modal.Action onClick={handlePopStateModalClose} variant="primary">
            계속하기
          </Modal.Action>
          <Modal.Action onClick={() => router.back()}>나가기</Modal.Action>
        </Modal.ActionsContainer>
      </Modal.Root>
      {children}
    </>
  );
}
