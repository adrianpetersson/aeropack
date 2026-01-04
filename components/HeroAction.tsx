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
			<div className="relative group">
				{/* Subtle glow effect that follows the input */}
				<div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-sky-400/20 rounded-full blur opacity-25 group-focus-within:opacity-100 transition duration-1000"></div>

				<div className="relative flex items-center gap-2 bg-white p-2 rounded-full border border-slate-200 shadow-xl focus-within:border-primary/50 transition-all">
					<div className="pl-4 text-slate-400">
						<HugeiconsIcon icon={Airplane} size={20} />
					</div>

					<input
						placeholder="Name your trip (e.g., 'Trip to Japan')"
						className="flex-1 bg-transparent border-none outline-none text-slate-900 placeholder:text-slate-400 text-sm md:text-base"
						value={tripName}
						onChange={(e) => setTripName(e.target.value)}
					/>

					<Button
						onClick={handleCreateTrip}
						className="rounded-full px-6 h-10 md:h-12 font-semibold shadow-lg shadow-primary/20 transition-transform active:scale-95"
						disabled={!tripName}
					>
						Start Packing
						<HugeiconsIcon
							icon={ArrowRight02Icon}
							className="ml-2 w-4 h-4 md:w-5 md:h-5"
						/>
					</Button>
				</div>
			</div>

			<p className="mt-4 text-[10px] md:text-xs text-slate-400 uppercase tracking-widest font-bold">
				No account required to start • Free for ultralight enthusiasts
			</p>
		</div>
	);
};
