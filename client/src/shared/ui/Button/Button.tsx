import { FC, ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  className?: string;
}

const Button: FC<ButtonProps> = ({ children, className = "" }) => {
  return (
    <button
      className={
        "cursor-pointer rounded-3xl bg-primary p-3 font-bold text-white " +
        className
      }
    >
      {children}
    </button>
  );
};

export default Button;
