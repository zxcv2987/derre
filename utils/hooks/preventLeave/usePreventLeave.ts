import { useEffect, useRef, useState } from "react";

export default function usePreventLeave() {
  const [openModal, setOpenModal] = useState(false);
  const [isAllowLeave, setIsAllowLeave] = useState(false);

  // 뒤로가기, 새로고침, 페이지 이탈 방지
  const isFirstPopState = useRef(false);

  useEffect(() => {
    if (!isFirstPopState.current) {
      window.history.pushState(null, "", window.location.href);
      isFirstPopState.current = true;
    }
  }, []);

  const handlePopStateModalClose = () => {
    setOpenModal(false);
    window.history.pushState(null, "", window.location.href);
  };
  useEffect(() => {
    const handlePopState = () => {
      setOpenModal(true);
    };

    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      return "";
    };

    if (isAllowLeave) return;
    window.addEventListener("popstate", handlePopState);
    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("popstate", handlePopState);
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [openModal, isAllowLeave]);

  return {
    openModal,
    setOpenModal,
    handlePopStateModalClose,
    isAllowLeave,
    setIsAllowLeave,
  };
}
