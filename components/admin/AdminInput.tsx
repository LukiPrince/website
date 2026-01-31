"use client";

import { InputHTMLAttributes, TextareaHTMLAttributes } from "react";

interface AdminInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

interface AdminTextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

const inputStyles = `
  w-full px-4 py-3 rounded-xl text-sm
  bg-[rgba(255,255,255,0.5)]
  border border-[rgba(0,0,0,0.08)]
  outline-none
  transition-all duration-200
  placeholder:text-[var(--text-muted)]
  focus:border-[var(--accent)]
  focus:shadow-[0_0_0_3px_rgba(0,122,255,0.1)]
`;

export function AdminInput({ label, error, className = "", ...props }: AdminInputProps) {
  return (
    <div className="space-y-2">
      {label && (
        <label
          className="block text-sm font-medium"
          style={{ color: "var(--text-secondary)" }}
        >
          {label}
        </label>
      )}
      <input
        className={`${inputStyles} ${className}`}
        style={{ color: "var(--text-primary)" }}
        {...props}
      />
      {error && (
        <p className="text-sm text-[#ff3b30]">{error}</p>
      )}
    </div>
  );
}

export function AdminTextarea({ label, error, className = "", ...props }: AdminTextareaProps) {
  return (
    <div className="space-y-2">
      {label && (
        <label
          className="block text-sm font-medium"
          style={{ color: "var(--text-secondary)" }}
        >
          {label}
        </label>
      )}
      <textarea
        className={`${inputStyles} min-h-[120px] resize-y ${className}`}
        style={{ color: "var(--text-primary)" }}
        {...props}
      />
      {error && (
        <p className="text-sm text-[#ff3b30]">{error}</p>
      )}
    </div>
  );
}
