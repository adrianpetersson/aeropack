"use client";

import { Airplane, ArrowRight02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { startTransition, useState } from "react";
import { createPackingListAction } from "@/actions/packing-lists";
import { Button } from "@/components/ui/button";

export const HeroAction = () => {
	const [tripName, setTripName] = useState("");

	const handleCreateTrip = () => {
		startTransition(async () => {
			await createPackingListAction(tripName);
		});
	};

	return (
		<div className="mx-auto mt-10 max-w-xl">
			<div className="group relative">
				{/* Subtle glow effect that follows the input */}
				<div className="absolute -inset-1 rounded-full bg-gradient-to-r from-primary/20 to-sky-400/20 opacity-25 blur transition duration-1000 group-focus-within:opacity-100"></div>

				<div className="relative flex items-center gap-2 rounded-full border border-slate-200 bg-white p-2 shadow-xl transition-all focus-within:border-primary/50">
					<div className="pl-4 text-slate-400">
						<HugeiconsIcon icon={Airplane} size={20} />
					</div>

					<input
						placeholder="Name your trip (e.g., 'Trip to Japan')"
						className="flex-1 border-none bg-transparent text-slate-900 text-sm outline-none placeholder:text-slate-400 md:text-base"
						value={tripName}
						onChange={(e) => setTripName(e.target.value)}
					/>

					<Button
						onClick={handleCreateTrip}
						className="h-10 rounded-full px-6 font-semibold shadow-lg shadow-primary/20 transition-transform active:scale-95 md:h-12"
						disabled={!tripName}
					>
						Start Packing
						<HugeiconsIcon
							icon={ArrowRight02Icon}
							className="ml-2 h-4 w-4 md:h-5 md:w-5"
						/>
					</Button>
				</div>
			</div>

			<p className="mt-4 font-bold text-[10px] text-slate-400 uppercase tracking-widest md:text-xs">
				No account required to start • Free for ultralight enthusiasts
			</p>
		</div>
	);
};
