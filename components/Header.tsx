"use client";

import Link from "next/link";
import { signIn, useSession } from "@/lib/auth-client";
import { Button } from "./ui/button";

export const Header = () => {
	const { data: session } = useSession();
	const onSignInClick = async () => {
		const { data, error } = await signIn.social({
			provider: "google",

			callbackURL: "/trips",
			errorCallbackURL: "/error",
		});
		console.log("Sign-in data:", data, "Error:", error);
	};

	return (
		<header className="flex h-16 w-full items-center border-b px-2 lg:px-10">
			<nav className="flex w-full items-center justify-between">
				<span>Aeropack</span>
				<div className="space-x-4">
					{session?.user ? (
						<span>Welcome, {session.user.name}</span>
					) : (
						<Button size="lg" onClick={onSignInClick}>
							Sign In
						</Button>
					)}
					<Link href="/signup" className="btn-primary">
						Sign Up
					</Link>
				</div>
			</nav>
		</header>
	);
};
