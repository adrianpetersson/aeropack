import { headers } from "next/headers";
import { auth } from "@/lib/auth";

export const AccountSection = async () => {
	const session = await auth.api.getSession({
		headers: await headers(),
	});
	return (
		<section className="p-4 text-xs">
			<p className="text-blue-500 text-xs">Account:</p>
			<div className="flex flex-col overflow-hidden">
				<span>{session?.user?.name}</span>
				<span>{session?.user?.email}</span>
			</div>
		</section>
	);
};
