"use client";

import React from "react";
import { cn } from "@/lib/utils";

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;
type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

const fieldClassName =
  "w-full rounded-xl border border-[#fdf1e1]/20 bg-[#fdf1e1]/[0.06] px-4 py-3 text-sm text-[#fdf1e1] placeholder:text-[#fdf1e1]/40 transition focus:border-[#fdf1e1]/50 focus:bg-[#fdf1e1]/10 focus:outline-none";

export function Input({ className, ...props }: InputProps) {
  return <input className={cn(fieldClassName, className)} {...props} />;
}

export function Textarea({ className, ...props }: TextareaProps) {
  return <textarea className={cn(fieldClassName, "min-h-32 resize-none", className)} {...props} />;
}
