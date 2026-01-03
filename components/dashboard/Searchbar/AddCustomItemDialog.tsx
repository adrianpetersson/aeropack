"use client";

import { useState } from "react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
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
      queryClient.invalidateQueries({ queryKey: ["trip", listId] });
      toast.success(`${name} added to your bag!`);
      setOpen(false);
      setName("");
      setWeight("");
    },
    onError: () => {
      toast.error("Failed to add item. Please try again.");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) return;

    mutate({
      listId,
      name,
      weightG: weight ? parseInt(weight) : 0,
      category: "misc",
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Button variant="outline" size="sm">
          <HugeiconsIcon icon={Plus} className="w-4 h-4 mr-2" /> Add Custom
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Custom Gear</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="pt-4">
          <FieldGroup className="space-y-4">
            <Field>
              <FieldLabel htmlFor="custom-item-name">Item Name</FieldLabel>
              <Input
                id="custom-item-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Hiking Boots"
                required
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="custom-item-weight">
                Weight (grams)
              </FieldLabel>
              <FieldDescription>
                If unsure, you can skip the weight input and estimate later.
              </FieldDescription>
              <Input
                id="custom-item-weight"
                type="number"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                placeholder="0"
              />
            </Field>
          </FieldGroup>
          <Button
            type="submit"
            className="w-full mt-6"
            disabled={!name || isPending}
          >
            {isPending ? <Spinner /> : null}
            {isPending ? "Saving..." : "Save to Packing List"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
