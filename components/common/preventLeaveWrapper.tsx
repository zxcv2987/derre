"use client";

import usePreventLeave from "@/utils/hooks/preventLeave/usePreventLeave";
import { useMemo } from "react";
import ConfirmLeaveModal from "./modal/ConfirmLeaveModal";

export default function PreventLeaveWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const { openModal: openLeaveModal, handlePopStateModalClose } =
    usePreventLeave();

  const LeaveModals = useMemo(
    () => (
      <ConfirmLeaveModal
        isOpen={openLeaveModal}
        onStay={handlePopStateModalClose}
        onLeave={() => window.history.back()}
      />
    ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [openLeaveModal]
  );

  return (
    <>
      {children}
      {LeaveModals}
    </>
  );
}
