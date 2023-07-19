import { twMerge } from "tailwind-merge";

interface IBadgeProps {
  children: React.ReactNode | React.ReactNode[];
  className?: string;
  type?: "error" | "info" | "warning" | "success" | "default";
}

const typeColors = {
  error: "bg-red-500 text-red-500 border-red-600/30 border",
  info: "bg-blue-500 text-blue-500 border-blue-600/30 border",
  warning: "bg-yellow-500 text-yellow-500 border-yellow-600/30 border",
  success: "bg-green-500 text-green-500 border-green-600/30 border",
  default: "bg-gray-500 text-white/80 border-white/30 border"
};

const Badge = (props: IBadgeProps) => {
  const { children, className, type = "default" } = props;

  const colorClass = typeColors[type];

  return (
    <div className={twMerge(`${colorClass} px-3 py-1 rounded-full bg-opacity-40 w-fit text-sm`, className)}>
      {children}
    </div>
  );
};

export default Badge;
