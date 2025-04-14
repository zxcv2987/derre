"use client";

import useModal from "@/utils/hooks/useModal";
import clsx from "clsx";
import { useState } from "react";

export default function DropDown({
  name,
  options,
}: {
  name: string;
  options: { id: number; name: string }[];
}) {
  const { setIsOpen, isOpen, modalRef } = useModal();
  const [selected, setSelected] = useState(options[0]);

  return (
    <div ref={modalRef} className="relative w-full">
      <input type="hidden" name={name} value={selected.id} />

      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="input cursor-pointer bg-zinc-100 text-left flex flex-row justify-between items-center text-zinc-700"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        {selected.name}
        <span>‣</span>
      </button>

      {isOpen && (
        <div
          role="listbox"
          tabIndex={0}
          className="absolute z-10 mt-2 w-full bg-zinc-100 rounded-lg shadow-lg border-zinc-200 border max-h-60 overflow-auto"
        >
          {options.map((option) => (
            <div
              key={option.name}
              role="option"
              aria-selected={selected.name === option.name}
              onClick={() => {
                setSelected(option);
                setIsOpen(false);
              }}
              className={clsx(
                "px-4 py-2 cursor-pointer hover:bg-zinc-200",
                selected.name === option.name && "bg-zinc-200"
              )}
            >
              {option.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
