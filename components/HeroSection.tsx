import { Airplane, WeightScaleIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
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

				<div className="mx-auto mt-16 max-w-5xl rounded-xl border border-slate-200 bg-white/50 p-2 shadow-2xl backdrop-blur-sm">
					<div className="rounded-lg border border-slate-100 bg-white p-4 md:p-8">
						<div className="flex flex-col items-end justify-between gap-8 md:flex-row">
							<div className="w-full text-left">
								<div className="mb-2 flex justify-between font-bold text-[10px] text-slate-400 uppercase tracking-widest">
									<span>Carry-on Limit (7.0kg)</span>
									<span className="text-primary">5.2kg Packed</span>
								</div>
								<div className="h-3 w-full overflow-hidden rounded-full bg-slate-100">
									<div className="h-full w-[74%] rounded-full bg-primary shadow-[0_0_15px_rgba(0,85,150,0.3)]" />
								</div>
							</div>
							<div className="flex gap-2">
								<div className="flex h-10 w-10 items-center justify-center rounded-md border border-slate-100 bg-slate-50">
									<HugeiconsIcon icon={Airplane} className="text-slate-400" />
								</div>
								<div className="flex h-10 w-10 items-center justify-center rounded-md border border-slate-100 bg-slate-50">
									<HugeiconsIcon
										icon={WeightScaleIcon}
										className="text-slate-400"
									/>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};
