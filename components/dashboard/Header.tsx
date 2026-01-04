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
    <div className="  text-white flex flex-col space-y-4 rounded-md">
      <div className="bg-primary rounded-md p-4">
        <h1 className="text-3xl font-bold">{trip.title} </h1>
      </div>

      <Card className="border-slate-200 md:border-10 border-4 shadow-md">
        <CardContent className="border-slate-100 md:p-4">
          <div className="flex w-full justify-between items-end space-x-3">
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
            <IconBadge className="md:flex hidden" icon={Airplane} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
