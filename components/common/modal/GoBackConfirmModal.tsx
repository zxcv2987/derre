"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Modal from "./composition/ModalRoot";

export default function GoBackConfirmModal({ href }: { href?: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const hrefString = href ? href : "/";
  return (
    <button onClick={() => setIsOpen(true)} className="cursor-pointer">
      ‹
      {isOpen && (
        <Modal.Root onClose={() => setIsOpen(false)} isOpen={isOpen}>
          <Modal.Title>작성중인 내용이 삭제됩니다.</Modal.Title>
          <Modal.ActionsContainer>
            <Modal.Action onClick={() => setIsOpen(false)}>
              계속하기
            </Modal.Action>
            <Modal.Action onClick={() => router.replace(`${hrefString}`)}>
              나가기
            </Modal.Action>
          </Modal.ActionsContainer>
        </Modal.Root>
      )}
    </button>
  );
}
