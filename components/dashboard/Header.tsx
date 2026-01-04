import { Flight } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { gramsToKg } from "@/utils/format.utils";
import { Badge } from "../ui/badge";

interface HeaderProps {
	limit: number;
	itemsCount?: number;
	title: string;
}
export const Header = ({ limit, itemsCount, title }: HeaderProps) => {
	return (
		<div className="bg-primary p-4 text-white flex justify-between items-center rounded-md">
			<h1 className="text-3xl font-bold">
				{title} <HugeiconsIcon icon={Flight} className="inline-block mr-2" />
			</h1>

			<div>
				<Badge className="bg-white text-[#FF4F00] font-semibold">
					Limit: {gramsToKg(limit)} Items: {itemsCount}
				</Badge>
			</div>
		</div>
	);
};
