import Link from "next/link";

export default function NotFound() {
	return (
		<div className="flex flex-col items-center justify-center gap-4 py-20">
			<h2>Not Found</h2>
			<p>Could not find requested resource</p>
			<span className="font-mono text-9xl">404</span>
			<Link href="/">Return Home</Link>
		</div>
	);
}
