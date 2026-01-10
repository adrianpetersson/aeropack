import { BackgroundPattern } from "@/components/BackgroundPattern";

import { HeroSection } from "@/components/HeroSection";

export default function Page() {
	return (
		<div className="mx-auto flex flex-col items-center justify-center">
			<HeroSection />
			<BackgroundPattern />
		</div>
	);
}
