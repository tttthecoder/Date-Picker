import { ReactNode } from "react";

export default function Button({
  icon,
  ...rest
}: {
  icon: ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      className="
        focus:ring-blue-300
        focus:ring-opacity-50
         text-gray-400
         rounded-sm
        transition
        duration-150
        ease-in-out
        shadow-md
        hover:shadow-lg"
      {...rest}
    >
      {icon}
    </button>
  );
}
