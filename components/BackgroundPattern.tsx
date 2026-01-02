export const BackgroundPattern = () => {
  return (
    <div className="absolute inset-0 -z-10 h-full w-full bg-white overflow-hidden">
      {/* Dot Matrix (Technical feel) */}
      <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:20px_20px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_60%,transparent_100%)]" />

      {/* Hero Glow: Using your "Primary" Aero Blue */}
      <div className="absolute -top-[10%] left-1/2 -translate-x-1/2 h-[600px] w-[1000px] rounded-full bg-primary/5 blur-[120px]" />

      {/* Top Border "Flight Line" */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
    </div>
  );
};
