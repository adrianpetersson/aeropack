import { Badge } from "@/components/ui/badge";
import { HeroAction } from "./HeroAction";

export const HeroSection = () => {
	return (
		<section className="flex flex-col items-center justify-center text-center">
			<Badge
				variant="secondary"
				className="mb-6 rounded-full border-primary/20 bg-primary/5 px-4 py-1 text-primary"
			>
				v1.0 — Now with AI Weight Estimation
			</Badge>

			<h1 className="max-w-4xl font-bold text-5xl text-slate-900 tracking-tight lg:text-7xl">
				Master the art of <span className="text-primary">Ultralight</span>{" "}
				travel.
			</h1>

			<p className="mt-6 text-lg text-slate-600">
				AeroPack helps you track every gram, bypass carry-on limits, and
				organize your gear with precision. Stop guessing, start weighing.
			</p>
			<HeroAction />
		</section>
	);
};
