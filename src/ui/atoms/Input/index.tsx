import clsx from "clsx";
import React from "react";

interface InputProps {
  id?: string;
  name: string;
  type?: "text" | "password" | "email" | "tel";
  value: string;
  onChange: (value: string) => void;
  isError?: boolean;
  isDirty?: boolean;
}

export default function Input({
  id,
  name,
  type = "text",
  value,
  onChange,
  isError,
  isDirty,
}: InputProps) {
  function onChangeHandler(e: React.ChangeEvent<HTMLInputElement>) {
    const newValue = e.target.value;
    onChange(newValue);
  }

  return (
    <input
      type={type}
      name={name}
      id={id}
      value={value}
      onChange={onChangeHandler}
      className={clsx("form-input", {
        error: !!isError && isDirty,
      })}
    />
  );
}
