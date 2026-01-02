import { Badge } from "../ui/badge";
import { CardHeader, CardTitle, CardFooter, Card } from "../ui/card";
import { ListItems } from "@/db/types";

export const ItemCard = ({ item }: { item: ListItems }) => {
  return (
    <Card key={item.id}>
      <CardHeader>
        <CardTitle>{item.name}</CardTitle>
      </CardHeader>
      <CardFooter className="flex justify-between items-center">
        <span className="font-mono">{item.weightG}g</span>
        <Badge variant="secondary">{item.category}</Badge>
      </CardFooter>
    </Card>
  );
};
