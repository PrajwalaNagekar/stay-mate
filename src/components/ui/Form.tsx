import type { FormHTMLAttributes } from "react";

interface FormProps extends FormHTMLAttributes<HTMLFormElement> {
  children: React.ReactNode;
}

export default function Form({
  children,
  className = "",
  ...props
}: FormProps) {
  return (
    <form
      className={`space-y-5 ${className}`}
      {...props}
    >
      {children}
    </form>
  );
}