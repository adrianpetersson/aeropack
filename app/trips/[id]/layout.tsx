export default function TripLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return <section className="mx-auto h-screen max-w-4xl">{children}</section>;
}
