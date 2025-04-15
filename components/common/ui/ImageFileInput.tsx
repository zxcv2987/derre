"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function ImageFileInput({
  name,
  labelName,
  isRequired,
  previewUrl,
}: {
  name: string;
  labelName: string;
  isRequired?: boolean;
  previewUrl?: string;
}) {
  const [imageUrl, setImageUrl] = useState<string | null>(previewUrl || null);
  const [isChanged, setIsChanged] = useState<boolean>(false);

  const reset = () => {
    setImageUrl(previewUrl || null);
    setIsChanged(false);
  };

  useEffect(() => {
    return () => {
      if (imageUrl && isChanged) {
        URL.revokeObjectURL(imageUrl);
      }
      removeEventListener("reset", reset);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imageUrl, isChanged, previewUrl]);

  useEffect(() => {
    if (previewUrl && !isChanged) {
      setImageUrl(previewUrl);
    }
  }, [previewUrl, isChanged]);

  return (
    <div className="flex flex-col gap-2 justify-center items-center w-full">
      <input
        id={name}
        name={name}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) {
            if (imageUrl && isChanged) {
              URL.revokeObjectURL(imageUrl);
            }
            const url = URL.createObjectURL(file);
            setImageUrl(url);
            setIsChanged(true);
          } else {
            setImageUrl(previewUrl || null);
            setIsChanged(false);
          }
        }}
        ref={(input) => {
          input?.form?.addEventListener("reset", reset);
        }}
      />

      <label
        htmlFor={name}
        className="relative cursor-pointer w-full h-32 bg-zinc-100 rounded-md flex items-center justify-center overflow-hidden"
      >
        {imageUrl ? (
          <Image
            fill
            src={imageUrl}
            alt="preview"
            className="w-full h-32 object-cover rounded-md bg-white"
          />
        ) : (
          <div className="text-3xl font-bold text-zinc-400">+</div>
        )}
      </label>

      <label className="labelTitle text-zinc-500 block">
        {labelName}
        {isRequired && <span className="text-red-500">*</span>}
      </label>
    </div>
  );
}
