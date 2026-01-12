"use client";

import { signIn } from "@/lib/auth-client";
import { Button } from "./ui/button";

export const Header = () => {
	const onSignInClick = async () => {
		const { data, error } = await signIn.social({
			provider: "google",

			callbackURL: "/trips",
			errorCallbackURL: "/error",
		});
		console.log("Sign-in data:", data, "Error:", error);
	};

	return (
		<header className="flex h-16 w-full items-center border-b px-4 lg:px-10">
			<nav className="flex w-full items-center justify-between">
				<span className="font-bold text-xl">AeroPack</span>
				<div className="space-x-4">
					<Button size="lg" onClick={onSignInClick}>
						Sign In
					</Button>
				</div>
			</nav>
		</header>
	);
};
