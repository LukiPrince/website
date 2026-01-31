"use client";

import { ReactNode } from "react";

interface AdminButtonProps {
  children: ReactNode;
  onClick?: () => void;
  type?: "button" | "submit";
  variant?: "primary" | "secondary" | "danger" | "ghost";
  disabled?: boolean;
  className?: string;
}

export function AdminButton({
  children,
  onClick,
  type = "button",
  variant = "primary",
  disabled = false,
  className = "",
}: AdminButtonProps) {
  const baseStyles = "px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed";

  const variantStyles = {
    primary:
      "bg-gradient-to-b from-[#007aff] to-[#0066d6] text-white shadow-[0_2px_8px_rgba(0,122,255,0.3)] hover:shadow-[0_4px_16px_rgba(0,122,255,0.4)]",
    secondary:
      "bg-[rgba(255,255,255,0.72)] text-[var(--accent)] border border-[rgba(0,0,0,0.06)] backdrop-blur-xl hover:bg-[rgba(255,255,255,0.9)]",
    danger:
      "bg-gradient-to-b from-[#ff3b30] to-[#d63030] text-white shadow-[0_2px_8px_rgba(255,59,48,0.3)] hover:shadow-[0_4px_16px_rgba(255,59,48,0.4)]",
    ghost:
      "text-[var(--text-secondary)] hover:text-[var(--accent)] hover:bg-[rgba(0,122,255,0.05)]",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
    >
      {children}
    </button>
  );
}
