import Link from "next/link";
import { Button } from "./ui/button";

export const Header = () => {
	return (
		<header className="flex h-16 w-full items-center border-b px-2 lg:px-10">
			<nav className="flex w-full items-center justify-between">
				<span>Aeropack</span>
				<div>
					<Button
						size="lg"
						render={
							<Link href="/login" className="mr-4">
								Login
							</Link>
						}
					/>
					<Link href="/signup" className="btn-primary">
						Sign Up
					</Link>
				</div>
			</nav>
		</header>
	);
};
