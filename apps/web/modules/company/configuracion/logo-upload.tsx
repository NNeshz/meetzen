"use client";

import type React from "react";

import { useState } from "react";
import { Upload } from "lucide-react";
import Image from "next/image";

interface LogoUploadProps {
  onChange: (value: string) => void;
  value?: string;
}

export function LogoUpload({ onChange, value }: LogoUploadProps) {
  const [logoPreview, setLogoPreview] = useState<string | null>(value || null);

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setLogoPreview(result);
        onChange(result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="relative h-32 w-32 rounded-full border-2 border-dashed border-muted-foreground/50 flex items-center justify-center overflow-hidden mx-auto cursor-pointer hover:border-primary transition-colors">
      {logoPreview ? (
        <Image
          src={logoPreview || "/placeholder.svg"}
          alt="Logo preview"
          fill
          className="object-cover"
        />
      ) : (
        <Upload className="h-10 w-10 text-muted-foreground" />
      )}
      <input
        type="file"
        accept="image/*"
        onChange={handleLogoUpload}
        className="absolute inset-0 opacity-0 cursor-pointer"
      />
    </div>
  );
}
