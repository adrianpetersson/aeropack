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
				"flex h-10 w-10 items-center justify-center rounded-md border border-slate-100 bg-slate-50",
				className,
			)}
		>
			<HugeiconsIcon icon={icon} className="text-slate-400" />
		</div>
	);
};
