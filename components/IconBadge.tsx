import { HugeiconsIcon, type IconSvgElement } from "@hugeicons/react";
import { cn } from "@/lib/utils";

export const IconBadge = ({
  icon,
  className,
}: {
  icon: IconSvgElement;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "h-10 w-10 rounded-md bg-slate-50 flex items-center justify-center border border-slate-100",
        className
      )}
    >
      <HugeiconsIcon icon={icon} className="text-slate-400" />
    </div>
  );
};
