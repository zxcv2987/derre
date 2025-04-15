"use client";

import { deletePostAction } from "@/actions/blog";
import { MoreIcon } from "@/assets/icons";
import Modal from "@/components/common/modal/composition/ModalRoot";
import { BlogResponseType } from "@/types/response";
import useModal from "@/utils/hooks/useModal";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function PostActionButton({ post }: { post: BlogResponseType }) {
  const { isOpen, open, close, modalRef } = useModal();
  const [confrimOpen, setConfrimOpen] = useState(false);
  const router = useRouter();

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    close();
    const id = post.id.toString();
    router.push(`/blog/edit/${id}`);
  };

  const handleDelete = async (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setConfrimOpen(true);
  };

  return (
    <div className="relative">
      <button
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
          open();
        }}
        className="p-2 rounded-full cursor-pointer"
      >
        <MoreIcon />
      </button>

      {confrimOpen && (
        <Modal.Root isOpen={confrimOpen} onClose={() => setConfrimOpen(false)}>
          <Modal.Title>삭제하시겠습니까?</Modal.Title>
          <Modal.ActionsContainer>
            <Modal.Action onClick={() => setConfrimOpen(false)}>
              취소
            </Modal.Action>
            <Modal.Action
              onClick={async () => {
                await deletePostAction(post.id.toString());
                setConfrimOpen(false);
                close();
              }}
              variant="danger"
            >
              삭제하기
            </Modal.Action>
          </Modal.ActionsContainer>
        </Modal.Root>
      )}
      {isOpen && (
        <div
          className="absolute flex flex-col gap-2 right-0 mt-1 w-32 rounded-md shadow-lg bg-white p-2 ring-opacity-5 z-10 border border-zinc-100"
          ref={modalRef}
        >
          <div className="py-1">
            <button
              onClick={handleEdit}
              className="w-full px-6 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 transition-colors rounded-md"
            >
              수정하기
            </button>
            <button
              onClick={handleDelete}
              className="w-full px-6 py-2 text-left text-sm text-red-600 hover:bg-gray-100 transition-colors rounded-md"
            >
              삭제하기
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
