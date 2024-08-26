import { ReactNode } from "react";

interface CustomButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: ReactNode;
}

export default function Button({
  icon,
  children,
  className,
  ...rest
}: CustomButtonProps) {
  return (
    <button
      {...rest}
      className="
      
        transition
        duration-150
        ease-in-out
        shadow-md
        bg-slate-300
        w-8 h-8
        text-gray-600
         hover:scale-105 active:scale-95
         focus:outline-none focus:ring-4 focus:ring-blue-200 focus:ring-opacity-50
        flex items-center justify-center
        rounded-lg
        hover:shadow-lg"
    >
      {icon}
    </button>
  );
}
