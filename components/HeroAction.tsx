"use client";

import { startTransition, useState } from "react";
import { createPackingListAction } from "@/actions/packing-lists";
import { CreatePackingListInput } from "./create/CreatePackingListInput";

export const HeroAction = () => {
	const [tripName, setTripName] = useState("");

	const handleCreateTrip = () => {
		startTransition(async () => {
			await createPackingListAction(tripName);
		});
	};

	return (
		<div className="mt-10">
			<CreatePackingListInput
				onChange={(e) => setTripName(e.target.value)}
				value={tripName}
				onClickHandler={handleCreateTrip}
				disabled={tripName.trim().length === 0}
			/>
			<p className="mt-4 font-bold text-slate-400 text-tiny uppercase tracking-widest md:text-xs">
				No account required to start • Free for ultralight enthusiasts
			</p>
		</div>
	);
};
