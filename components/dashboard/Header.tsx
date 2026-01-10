import { Airplane } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import type { PackingListWithItems } from "@/db/types";
import { gramsToKg } from "@/utils/format.utils";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Progress, ProgressLabel } from "../ui/progress";
import { SidebarTrigger } from "../ui/sidebar";
import { TripSettings } from "./TripSettings";

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
		<section className="flex flex-col space-y-4 rounded-md text-white">
			<div className="flex items-center justify-between rounded-md bg-primary p-4">
				<div className="flex items-center space-x-4">
					<SidebarTrigger />
					<h1 className="font-bold text-3xl">{trip.title} </h1>
				</div>

				<TripSettings trip={trip} />
			</div>

			<Card className="border-4 border-slate-200 shadow-md md:border-10">
				<CardContent className="border-slate-100 md:p-4">
					<div className="flex w-full items-end justify-between space-x-3">
						<Progress
							className={`w-full pb-2 ${getWeightProgressColor(percentage)}`}
							value={percentage}
						>
							<ProgressLabel className="text-primary">
								{gramsToKg(totalWeight)} Packed
							</ProgressLabel>
							<ProgressLabel className="ml-auto text-slate-400">
								Carry-on Limit {gramsToKg(limit)}{" "}
							</ProgressLabel>
						</Progress>
						<Button
							size="lg"
							className="group relative overflow-hidden bg-blue-600 transition-all hover:bg-blue-700 hover:shadow-lg active:scale-95"
						>
							<span className="flex items-center gap-2">
								Ready for Takeoff
								<HugeiconsIcon
									icon={Airplane}
									className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
								/>
							</span>
						</Button>
					</div>
				</CardContent>
			</Card>
		</section>
	);
};
