"use client";

import useModal from "@/utils/hooks/useModal";
import clsx from "clsx";
import { useEffect, useState } from "react";
interface DropDownProps<T extends { id: string | number; name: string }> {
  name: string;
  options: T[];
  defaultValue?: string | number;
  placeholder?: string;
  onChange?: (option: T) => void;
}

export default function DropDown<
  T extends { id: string | number; name: string }
>({
  name,
  options,
  defaultValue,
  placeholder = "선택해주세요",
  onChange,
}: DropDownProps<T>) {
  const { setIsOpen, isOpen, modalRef } = useModal();

  const [selected, setSelected] = useState<T | null>(() => {
    if (defaultValue !== undefined && options.length > 0) {
      return options.find((option) => option.id === defaultValue) || null;
    }
    return null;
  });

  useEffect(() => {
    if (selected && onChange) {
      onChange(selected);
    }
  }, [selected, onChange]);

  useEffect(() => {
    if (defaultValue !== undefined && options.length > 0) {
      const defaultOption = options.find(
        (option) => option.id === defaultValue
      );
      if (defaultOption) {
        setSelected(defaultOption);
      }
    }
  }, [defaultValue, options]);

  return (
    <div ref={modalRef} className="relative w-full">
      <input type="hidden" name={name} value={selected?.id || ""} />

      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="input cursor-pointer bg-zinc-100 text-left flex flex-row justify-between items-center text-zinc-700"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        {selected ? (
          selected.name
        ) : (
          <span className="text-zinc-400">{placeholder}</span>
        )}
        <span className="text-zinc-400 transform transition-transform duration-200 inline-block">
          {isOpen ? "▲" : "▼"}
        </span>
      </button>

      {isOpen && (
        <div
          role="listbox"
          tabIndex={0}
          className="absolute z-10 mt-2 w-full bg-white rounded-lg shadow-lg border-zinc-200 border max-h-60 overflow-auto"
        >
          {options.length === 0 ? (
            <div className="px-4 py-2 text-zinc-400">옵션이 없습니다</div>
          ) : (
            options.map((option) => (
              <div
                key={option.id.toString()}
                role="option"
                aria-selected={selected?.id === option.id}
                onClick={() => {
                  setSelected(option);
                  setIsOpen(false);
                }}
                className={clsx(
                  "px-4 py-2 cursor-pointer hover:bg-zinc-100",
                  selected?.id === option.id
                    ? "bg-zinc-100 text-orange-500 font-medium"
                    : "text-zinc-700"
                )}
              >
                {option.name}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
