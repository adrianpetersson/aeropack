"use client";

import { useState } from "react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../ui/dialog";
import { Plus } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { addItemToListAction } from "@/actions/items";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Spinner } from "../../ui/spinner";

export function AddCustomItemDialog({
  listId,
  initialName,
}: {
  listId: string;
  initialName?: string;
}) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState(initialName || "");
  const [weight, setWeight] = useState("");
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: addItemToListAction,
    onSuccess: () => {
      // 2. Refresh the trip data so the progress bar moves
      queryClient.invalidateQueries({ queryKey: ["trip", listId] });
      toast.success(`${name} added to your bag!`);
      setOpen(false); // Close modal
      setName("");
      setWeight("");
    },
    onError: () => {
      toast.error("Failed to add item. Please try again.");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !weight) return;

    mutate({
      listId,
      name,
      weightG: parseInt(weight),
      category: "misc",
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <HugeiconsIcon icon={Plus} className="w-4 h-4 mr-2" /> Add Custom
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Custom Gear</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 pt-4">
          <div className="space-y-2">
            <Label>Item Name</Label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Vintage Camera"
              required
            />
          </div>
          <div className="space-y-2">
            <Label>Weight (grams)</Label>
            <Input
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              placeholder="0"
              required
            />
          </div>
          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending ? <Spinner /> : null}
            {isPending ? "Saving..." : "Save to Packing List"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
