"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function ImageFileInput({
  name,
  labelName,
  isRequired,
}: {
  name: string;
  labelName: string;
  isRequired?: boolean;
}) {
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const reset = () => {
    setImageUrl(null);
  };
  useEffect(() => {
    return () => {
      if (imageUrl) {
        URL.revokeObjectURL(imageUrl);
      }
      removeEventListener("reset", reset);
    };
  }, [imageUrl]);

  return (
    <div className="flex flex-col gap-2 justify-center items-center w-full ">
      <input
        id={name}
        name={name}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) {
            const url = URL.createObjectURL(file);
            setImageUrl(url);
          } else {
            setImageUrl(null);
          }
        }}
        ref={(input) => {
          input?.form?.addEventListener("reset", reset);
        }}
      />

      <label
        htmlFor={name}
        className=" relative cursor-pointer w-full h-32 bg-zinc-100 rounded-md flex items-center justify-center"
      >
        <div className="text-3xl font-bold text-zinc-400">+</div>
        {imageUrl && (
          <Image
            fill
            src={imageUrl}
            alt="preview"
            className="w-full h-32 object-cover rounded-md bg-white"
          />
        )}
      </label>

      <label className="labelTitle text-zinc-500 block">
        {labelName}
        {isRequired && <span className="text-red-500">*</span>}
      </label>
    </div>
  );
}
