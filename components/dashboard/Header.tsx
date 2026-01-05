import { Airplane } from "@hugeicons/core-free-icons";
import type { PackingListWithItems } from "@/db/types";
import { gramsToKg } from "@/utils/format.utils";
import { IconBadge } from "../IconBadge";
import { Card, CardContent } from "../ui/card";
import { Progress, ProgressLabel } from "../ui/progress";

interface HeaderProps {
	trip: PackingListWithItems;
}

const getWeightProgressColor = (percentage: number): string => {
	if (percentage < 70) return "text-green-500";
	if (percentage < 90) return "text-amber-500";
	return "text-red-500";
};

export const Header = ({ trip }: HeaderProps) => {
	const packedItemsWeight = trip.items
		.filter((item) => !item.isWorn)
		.reduce((acc, item) => acc + item.weightG * item.quantity, 0);
	const totalWeight = packedItemsWeight + trip.bagWeightG;
	const limit = trip.maxWeightG;
	const percentage = Math.min((totalWeight / limit) * 100, 100);

	return (
		<div className="flex flex-col space-y-4 rounded-md text-white">
			<div className="rounded-md bg-primary p-4">
				<h1 className="font-bold text-3xl">{trip.title} </h1>
			</div>

			<Card className="border-4 border-slate-200 shadow-md md:border-10">
				<CardContent className="border-slate-100 md:p-4">
					<div className="flex w-full items-end justify-between space-x-3">
						<Progress
							className={`w-full pb-3 ${getWeightProgressColor(percentage)}`}
							value={percentage}
						>
							<ProgressLabel className="text-primary">
								{gramsToKg(totalWeight)} Packed
							</ProgressLabel>
							<ProgressLabel className="ml-auto text-slate-400">
								Carry-on Limit {gramsToKg(limit)}{" "}
							</ProgressLabel>
						</Progress>
						<IconBadge className="hidden md:flex" icon={Airplane} />
					</div>
				</CardContent>
			</Card>
		</div>
	);
};
