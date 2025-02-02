import React, { ReactNode } from "react";

interface ButtonProps {
  variant?: string;
  className?: string;
  onClick?: () => void;
  children: ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant,
  className,
  children,
  onClick,
}) => {
  const baseClass = "px-4 py-2 rounded-full transition-all";
  const variantClass =
    variant === "outline"
      ? "border border-gray-500 text-gray-700"
      : variant === "ghost"
      ? "bg-transparent text-gray-700"
      : variant === "selected"
      ? "bg-[#0ACF83] text-white" 
      : "bg-[#0ACF83] text-white";

  return (
    <button className={`${baseClass} ${variantClass} ${className}`} onClick={onClick}>
      {children}
    </button>
  );
};