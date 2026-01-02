import { HugeiconsIcon } from "@hugeicons/react";
import { Badge } from "../ui/badge";
import { Flight } from "@hugeicons/core-free-icons";

interface HeaderProps {
  limit: number;
  itemsCount?: number;
}
export const Header = ({ limit, itemsCount }: HeaderProps) => {
  return (
    <div className="bg-primary p-4 text-white flex justify-between items-center rounded-md">
      <h1 className="text-3xl font-bold">
        Tokyo Trip <HugeiconsIcon icon={Flight} className="inline-block mr-2" />
      </h1>

      <div>
        <Badge className="bg-white text-[#FF4F00] font-semibold">
          {itemsCount} Items · {limit / 1000} kg Limit
        </Badge>
      </div>
    </div>
  );
};
