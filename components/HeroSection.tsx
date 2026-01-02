import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { HugeiconsIcon } from "@hugeicons/react";
import Link from "next/link";
import {
  Airplane,
  ArrowRight02Icon,
  WeightScaleIcon,
} from "@hugeicons/core-free-icons";
import { HeroAction } from "./HeroAction";

export const HeroSection = () => {
  return (
    <section className="relative overflow-hidden pt-16 pb-24 lg:pt-32">
      {/* Subtlest background grid for that "engineering" feel */}
      <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:24px_24px]" />

      <div className="container mx-auto px-4 text-center">
        <Badge
          variant="secondary"
          className="mb-6 rounded-full px-4 py-1 border-primary/20 bg-primary/5 text-primary"
        >
          v1.0 — Now with AI Weight Estimation
        </Badge>

        <h1 className="mx-auto max-w-4xl text-5xl font-bold tracking-tight text-slate-900 lg:text-7xl">
          Master the art of <span className="text-primary">Ultralight</span>{" "}
          travel.
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-600">
          AeroPack helps you track every gram, bypass carry-on limits, and
          organize your gear with precision. Stop guessing, start weighing.
        </p>

        <HeroAction />
        {/* Hero Mockup: Showing the "Weight Limit" UX */}
        <div className="mt-16 mx-auto max-w-5xl rounded-xl border border-slate-200 bg-white/50 p-2 shadow-2xl backdrop-blur-sm">
          <div className="rounded-lg border border-slate-100 bg-white p-4 md:p-8">
            <div className="flex flex-col md:flex-row justify-between items-end gap-8">
              <div className="w-full text-left">
                <div className="flex justify-between mb-2 uppercase text-[10px] font-bold tracking-widest text-slate-400">
                  <span>Carry-on Limit (7.0kg)</span>
                  <span className="text-primary">5.2kg Packed</span>
                </div>
                <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-primary w-[74%] rounded-full shadow-[0_0_15px_rgba(0,85,150,0.3)]" />
                </div>
              </div>
              <div className="flex gap-2">
                <div className="h-10 w-10 rounded-md bg-slate-50 flex items-center justify-center border border-slate-100">
                  <HugeiconsIcon icon={Airplane} className="text-slate-400" />
                </div>
                <div className="h-10 w-10 rounded-md bg-slate-50 flex items-center justify-center border border-slate-100">
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
