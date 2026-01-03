import {
  Field,
  FieldContent,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldDescription,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ListItems } from "@/db/types";
import * as z from "zod";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateItemAction, addItemToListAction } from "@/actions/items";
import { categories } from "@/constants";
import { is } from "drizzle-orm";

interface UpdateItemFormProps {
  item?: ListItems;
  listId: string;
  onSuccess: () => void;
  onCancel: () => void;
  initialName?: string;
  variant?: "update" | "create";
}

const updateItemFormSchema = z.object({
  name: z
    .string()
    .min(2, "Item name must be at least 2 characters.")
    .max(32, "Item name too long, try shortening it."),
  category: z.enum(categories.map((cat) => cat.value)),
  quantity: z.coerce
    .number<number>()
    .max(100, "You cannot pack more than 100 of an item."),
  //TODO: Add weight validation based on trip limit
  weight: z.coerce
    .number<number>()
    .max(50000, "Item weight cannot exceed 50kg."),
});

export const UpdateItemForm = ({
  item,
  listId,
  onSuccess,
  onCancel,
  initialName = "",
  variant = "update",
}: UpdateItemFormProps) => {
  const queryClient = useQueryClient();
  const isUpdateMode = !!item;
  const isCreateMode = variant === "create";

  const {
    formState: { isDirty },
    control,
  } = useForm<z.infer<typeof updateItemFormSchema>>({
    resolver: zodResolver(updateItemFormSchema),
    defaultValues: {
      name: item?.name || initialName,
      category: item?.category || "misc",
      quantity: item?.quantity || 1,
      weight: item?.weightG || 0,
    },
  });

  const { mutate: updateItem, isPending: isUpdating } = useMutation({
    mutationFn: updateItemAction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["trip", listId] });
      toast.success("Item updated successfully!");
      onSuccess();
    },
    onError: (error) => {
      toast.error("Failed to update item. Please try again.");
      console.error("Update item error:", error);
    },
  });

  const { mutate: createItem, isPending: isCreating } = useMutation({
    mutationFn: addItemToListAction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["trip", listId] });
      toast.success("Item added to your bag!");
      onSuccess();
    },
    onError: () => {
      toast.error("Failed to add item. Please try again.");
    },
  });

  const isPending = isUpdating || isCreating;

  const onSubmit: SubmitHandler<z.infer<typeof updateItemFormSchema>> = (
    data
  ) => {
    if (isUpdateMode && item) {
      updateItem({
        ...data,
        itemId: item.id,
        listId,
      });
    } else {
      createItem({
        listId,
        name: data.name,
        category: data.category,
        weightG: data.weight,
      });
    }
  };

  return (
    <form
      className={`w-full flex flex-col gap-4 ${
        isCreateMode
          ? ""
          : "border border-dashed p-3 sm:p-4 bg-blue-50/30 rounded-lg"
      }`}
      id="update-item-form"
      onSubmit={control.handleSubmit(onSubmit)}
    >
      <div
        className={`w-full ${
          isCreateMode
            ? "flex flex-col gap-4"
            : "grid grid-cols-1 lg:grid-cols-2 gap-4"
        }`}
      >
        <FieldGroup
          className={`flex items-stretch gap-3 ${
            isCreateMode ? "flex-col" : "flex-col sm:flex-row"
          }`}
        >
          <Controller
            name="name"
            control={control}
            render={({ field, fieldState }) => (
              <Field
                className="flex-2 min-w-0"
                data-invalid={fieldState.invalid}
              >
                <FieldLabel
                  className="text-[10px] font-bold tracking-wider text-slate-400 uppercase"
                  htmlFor="item-name"
                >
                  Name
                </FieldLabel>
                <Input
                  {...field}
                  id="item-name"
                  aria-invalid={fieldState.invalid}
                  placeholder="e.g. Hiking Boots"
                  autoComplete="off"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name="category"
            control={control}
            render={({ field, fieldState }) => (
              <Field
                className={`flex-1 min-w-0 ${
                  isCreateMode ? "" : "sm:max-w-40"
                }`}
                data-invalid={fieldState.invalid}
              >
                <FieldContent>
                  <FieldLabel
                    className="text-[10px] font-bold tracking-wider text-slate-400 uppercase"
                    htmlFor="ItemCategory"
                  >
                    Category
                  </FieldLabel>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </FieldContent>
                <Select
                  name={field.name}
                  value={field.value}
                  onValueChange={field.onChange}
                  items={categories}
                  defaultValue={item?.category || "other"}
                >
                  <SelectTrigger
                    aria-invalid={fieldState.invalid}
                    id="ItemCategory"
                  >
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {categories.map((item) => (
                        <SelectItem key={item.value} value={item.value}>
                          {item.label}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </Field>
            )}
          />
        </FieldGroup>

        <FieldGroup className="flex flex-row items-end justify-between gap-3">
          <Controller
            name="weight"
            control={control}
            render={({ field, fieldState }) => (
              <Field className="flex-1 " data-invalid={fieldState.invalid}>
                <FieldLabel
                  className="text-[10px] font-bold tracking-wider text-slate-400 uppercase"
                  htmlFor="item-weight"
                >
                  Weight (g)
                </FieldLabel>
                {}
                {isCreateMode && (
                  <FieldDescription>
                    You can skip adding weight if unsure and update it later.
                  </FieldDescription>
                )}
                <Input
                  {...field}
                  id="item-weight"
                  type="number"
                  aria-invalid={fieldState.invalid}
                  placeholder="2000"
                  autoComplete="off"
                  className="tabular-nums font-mono"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name="quantity"
            control={control}
            render={({ field, fieldState }) => (
              <Field className="w-20 sm:w-24" data-invalid={fieldState.invalid}>
                <FieldLabel
                  className="text-[10px] font-bold tracking-wider text-slate-400 uppercase"
                  htmlFor="item-quantity"
                >
                  Qty
                </FieldLabel>
                <Input
                  {...field}
                  id="item-quantity"
                  type="number"
                  aria-invalid={fieldState.invalid}
                  placeholder="1"
                  autoComplete="off"
                  className="tabular-nums font-mono"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </FieldGroup>
      </div>

      <div
        className={`flex justify-end gap-2 ${
          isCreateMode ? "pt-2" : "pt-2 border-t border-slate-200/50"
        }`}
      >
        <Button
          onClick={onCancel}
          variant="secondary"
          type="button"
          size="sm"
          className="min-w-20"
          disabled={isPending}
        >
          Cancel
        </Button>
        <Button
          disabled={(isUpdateMode && !isDirty) || isPending}
          type="submit"
          size="sm"
          className="min-w-20"
        >
          {isPending ? "Saving..." : isUpdateMode ? "Update" : "Add Item"}
        </Button>
      </div>
    </form>
  );
};
