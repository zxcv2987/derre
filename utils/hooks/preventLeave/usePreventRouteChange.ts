import { NavigateOptions } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function usePreventRouteChange(allowRouteChange: boolean) {
  const router = useRouter();
  const [openModal, setOpenModal] = useState(false);
  const [pushData, setPushData] = useState<{
    href: string;
    options?: NavigateOptions;
  } | null>();
  const handleLeave = () => {
    setOpenModal(false);
    const { href, options } = pushData ?? {};
    if (href) {
      router.push(href, options);
    }
  };

  const handleClose = () => {
    setOpenModal(false);
  };

  // router 변경 방지
  useEffect(() => {
    const originalPush = router.push;

    const newPush = (
      href: string,
      options?: NavigateOptions | undefined
    ): void => {
      if (allowRouteChange) {
        originalPush(href, options);
        return;
      }
      setOpenModal(true);
      setPushData({ href, options });
    };

    router.push = newPush;

    return () => {
      router.push = originalPush;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allowRouteChange]);

  return {
    openModal,
    setOpenModal,
    handleLeave,
    handleClose,
  };
}
