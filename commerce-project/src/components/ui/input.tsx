import React from "react";

export const Input: React.FC<{ placeholder?: string; className?: string; onClick?: () => void }> = ({
  placeholder,
  className,
  onClick,
}) => (
  <input
    type="text"
    placeholder={placeholder}
    className={`p-2 border border-gray-300 rounded-md ${className}`}
    onClick={onClick}
  />
);