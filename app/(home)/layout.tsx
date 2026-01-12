import { Header } from "@/components/Header";

export default function HomeLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<section>
			<Header />
			<main className="mx-auto flex flex-col items-center justify-center px-4 pt-6 lg:pt-12">
				{children}
			</main>
		</section>
	);
}
