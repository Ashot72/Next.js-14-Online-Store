"use client";

import { useFormStatus } from "react-dom";
import { Button } from "@nextui-org/react";

interface FormButtonProps {
  children: React.ReactNode;
  variant?: "light" | "bordered" | "solid";
  color?: "default" | "primary";
  size?: "sm" | "md";
}

export default function FormButton(
  { children, variant = "light", color = "default", size = "md" }:
    FormButtonProps,
) {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      variant={variant}
      color={color}
      size={size}
      isLoading={pending}
    >
      {children}
    </Button>
  );
}
