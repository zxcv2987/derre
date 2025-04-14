import Portal from "./Portal";

export default function ConfirmLeaveModal({
  isOpen,
  onLeave,
  onStay,
}: {
  isOpen: boolean;
  onStay: () => void;
  onLeave: () => void;
}) {
  console.log(onLeave);
  if (!isOpen) return null;
  return (
    <>
      <Portal onClose={onStay} isOpen={isOpen}>
        <div className="flex flex-col gap-4">
          <p className="py-2 font-bold  text-zinc-700">
            작성중인 내용이 삭제됩니다.
          </p>
          <div className="flex flex-row gap-2">
            <button
              type="button"
              onClick={onStay}
              className="w-full btn py-2 cursor-pointer font-bold"
            >
              계속하기
            </button>
            <button
              onClick={onLeave}
              className="w-full disabled-btn py-2 cursor-pointer font-bold"
            >
              나가기
            </button>
          </div>
        </div>
      </Portal>
    </>
  );
}
