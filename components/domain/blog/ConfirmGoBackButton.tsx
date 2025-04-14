"use client";

import ConfirmLeaveModal from "@/components/common/modal/ConfirmLeaveModal";
import useModal from "@/utils/hooks/useModal";
import { useRouter } from "next/navigation";

export default function ConfirmGoBackButton({ href }: { href?: string }) {
  const { isOpen, close, open } = useModal();
  const router = useRouter();
  const hrefString = href ? href : "/";
  return (
    <button onClick={open} className="cursor-pointer">
      ‹
      {isOpen && (
        <ConfirmLeaveModal
          isOpen={isOpen}
          onLeave={() => {
            router.replace(`${hrefString}`);
          }}
          onStay={close}
        />
      )}
    </button>
  );
}
