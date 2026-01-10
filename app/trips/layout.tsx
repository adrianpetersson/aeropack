import { SidebarWrapper } from "@/components/dashboard/SidebarWrapper";

export default function TripLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<section>
			<SidebarWrapper>{children}</SidebarWrapper>
		</section>
	);
}
