import { Badge } from "@/components/ui/badge";
import { HeroAction } from "./HeroAction";

export const HeroSection = () => {
	return (
		<section className="relative overflow-hidden pt-16 pb-24 lg:pt-32">
			<div className="container mx-auto px-4 text-center">
				<Badge
					variant="secondary"
					className="mb-6 rounded-full border-primary/20 bg-primary/5 px-4 py-1 text-primary"
				>
					v1.0 — Now with AI Weight Estimation
				</Badge>

				<h1 className="mx-auto max-w-4xl font-bold text-5xl text-slate-900 tracking-tight lg:text-7xl">
					Master the art of <span className="text-primary">Ultralight</span>{" "}
					travel.
				</h1>

				<p className="mx-auto mt-6 max-w-2xl text-lg text-slate-600">
					AeroPack helps you track every gram, bypass carry-on limits, and
					organize your gear with precision. Stop guessing, start weighing.
				</p>
				<HeroAction />
			</div>
		</section>
	);
};
