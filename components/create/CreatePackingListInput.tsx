"use client";

import { Airplane, ArrowRight02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import {
	InputGroup,
	InputGroupAddon,
	InputGroupButton,
	InputGroupInput,
} from "@/components/ui/input-group";

interface CreatePackingListInputProps
	extends React.ComponentProps<typeof InputGroupInput> {
	onClickHandler: () => void;
	disabled?: boolean;
}

export const CreatePackingListInput = ({
	onClickHandler,
	disabled,
	...props
}: CreatePackingListInputProps) => {
	return (
		<div className="flex w-full items-center justify-center">
			<InputGroup className="h-13!">
				<InputGroupAddon align="inline-start">
					<HugeiconsIcon icon={Airplane} />
				</InputGroupAddon>
				<InputGroupInput
					className="text-base!"
					placeholder="Where are you headed?"
					{...props}
				/>

				<InputGroupAddon align="inline-end">
					<InputGroupButton
						onClick={onClickHandler}
						size="sm"
						className="h-10 bg-brightOrange px-3 font-semibold text-stone-50"
						variant="secondary"
						disabled={disabled}
					>
						Start Packing <HugeiconsIcon icon={ArrowRight02Icon} />
					</InputGroupButton>
				</InputGroupAddon>
			</InputGroup>
		</div>
	);
};
