import { BodySoapIcon, Clothes, Laptop } from "@hugeicons/core-free-icons";

import { IconBadge } from "@/components/IconBadge";

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
  return <IconBadge icon={getIcon(category)} />;
};
