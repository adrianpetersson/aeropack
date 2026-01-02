import { BackgroundPattern } from "@/components/BackgroundPattern";
import { CreatePackingList } from "@/components/create/CreatePackingList";
import { HeroSection } from "@/components/HeroSection";

export default function Page() {
  return (
    <div className="mx-auto flex flex-col items-center justify-center">
      {/* <ComponentExample /> */}
      <HeroSection />
      <BackgroundPattern/>
      <CreatePackingList />
    </div>
  );
}
