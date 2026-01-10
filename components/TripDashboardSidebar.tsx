import { Airplane01FreeIcons } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import type * as React from "react";
import {
	Sidebar,
	SidebarContent,
	SidebarGroup,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/components/ui/sidebar";
import { UserPackingLists } from "./dashboard/UserPackingLists";
import { Badge } from "./ui/badge";

const data = {
	navMain: [
		{
			title: "My trips",
			url: "#",
			items: [
				{
					title: "Installation",
					url: "#",
				},
				{
					title: "Project Structure",
					url: "#",
				},
			],
		},
	],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
	return (
		<Sidebar variant="floating" {...props}>
			<SidebarHeader>
				<SidebarMenu>
					<SidebarMenuItem>
						<SidebarMenuButton
							size="lg"
							render={
								<div>
									<div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
										<HugeiconsIcon
											icon={Airplane01FreeIcons}
											className="size-4"
										/>
									</div>
									<div className="flex flex-col gap-0.5 leading-none">
										<span className="font-medium">Aeropack</span>
										<Badge variant="outline">v1.0.0</Badge>
									</div>
								</div>
							}
						/>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarHeader>
			<SidebarContent>
				<SidebarGroup>
					<SidebarMenu className="gap-2">
						{data.navMain.map((item) => (
							<SidebarMenuItem key={item.title}>
								<SidebarMenuButton
									render={
										<a href={item.url} className="font-medium">
											{" "}
											{item.title}
										</a>
									}
								/>

								<UserPackingLists />
							</SidebarMenuItem>
						))}
					</SidebarMenu>
				</SidebarGroup>
			</SidebarContent>
		</Sidebar>
	);
}
