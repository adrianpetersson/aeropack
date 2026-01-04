import { BodySoapIcon, Clothes, Laptop } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

const getIcon = (category: string) => {
	switch (category) {
		case "tech":
			return Laptop;
		case "clothing":
			return Clothes;
		case "toiletries":
			return BodySoapIcon;
		default:
			return Laptop;
	}
};
export const ItemIcon = ({ category }: { category: string }) => {
	return (
		<div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100 text-slate-600 group-hover:bg-primary/10 group-hover:text-primary transition-colors">
			<HugeiconsIcon icon={getIcon(category)} size={20} />
		</div>
	);
};
