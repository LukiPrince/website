"use client";

import { ReactNode } from "react";

interface AdminCardProps {
  children: ReactNode;
  className?: string;
}

export function AdminCard({ children, className = "" }: AdminCardProps) {
  return (
    <div
      className={`p-6 rounded-2xl ${className}`}
      style={{
        background: "rgba(255, 255, 255, 0.72)",
        border: "1px solid rgba(0, 0, 0, 0.06)",
        backdropFilter: "blur(40px) saturate(150%)",
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.04)",
      }}
    >
      {children}
    </div>
  );
}
