import {
  Field,
  FieldContent,
  FieldError,
  FieldGroup,
  FieldLabel,
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
import { updateItemAction } from "@/actions/items";

interface UpdateItemFormProps {
  item: ListItems;
  onCancel: () => void;
}

const categories = [
  { label: "Clothing", value: "clothing" },
  { label: "Toiletries", value: "toiletries" },
  { label: "Tech", value: "tech" },
  { label: "Other", value: "other" },
];

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

export const UpdateItemForm = ({ item, onCancel }: UpdateItemFormProps) => {
  const queryClient = useQueryClient();
  const {
    formState: { isDirty },
    control,
  } = useForm<z.infer<typeof updateItemFormSchema>>({
    resolver: zodResolver(updateItemFormSchema),
    defaultValues: {
      name: item.name,
      category: item.category,
      quantity: item.quantity,
      weight: item.weightG,
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: updateItemAction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["trip", item.listId] });
      toast.success(`${item.name} updated in your bag!`);
    },
    onError: () => {
      toast.error("Failed to update item. Please try again.");
    },
  });

  const onSubmit: SubmitHandler<z.infer<typeof updateItemFormSchema>> = (
    data
  ) => {
    mutate({ ...data, itemId: item.id, listId: item.listId });
  };

  return (
    <form
      className="w-full flex flex-col gap-4 border border-dashed p-3 sm:p-4 bg-blue-50/30 rounded-lg"
      id="update-item-form"
      onSubmit={control.handleSubmit(onSubmit)}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 w-full">
        <FieldGroup className="flex flex-col sm:flex-row items-stretch gap-3">
          <Controller
            name="name"
            control={control}
            render={({ field, fieldState }) => (
              <Field
                className="flex-1 min-w-0"
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
                className="flex-1 min-w-0 sm:max-w-40"
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
                  defaultValue={item.category}
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

        <FieldGroup className="flex flex-row items-stretch gap-3 lg:justify-end">
          <Controller
            name="weight"
            control={control}
            render={({ field, fieldState }) => (
              <Field
                className="flex-1 sm:max-w-35"
                data-invalid={fieldState.invalid}
              >
                <FieldLabel
                  className="text-[10px] font-bold tracking-wider text-slate-400 uppercase"
                  htmlFor="item-weight"
                >
                  Weight (g)
                </FieldLabel>
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

      <div className="flex justify-end gap-2 pt-2 border-t border-slate-200/50">
        <Button
          onClick={onCancel}
          variant="secondary"
          type="button"
          size="sm"
          className="min-w-20"
        >
          Cancel
        </Button>
        <Button
          disabled={!isDirty || isPending}
          type="submit"
          size="sm"
          className="min-w-20"
        >
          Save
        </Button>
      </div>
    </form>
  );
};
