// components/sidebar/app-sidebar.tsx
import {
	ChevronRight,
	MessageCircleQuestion,
	MoreHorizontal,
} from "lucide-react";
import * as React from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import {
	Sidebar,
	SidebarContent,
	SidebarGroup,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarRail,
	SidebarTrigger,
	useSidebar, // 👈 importar o hook
} from "@/components/ui/sidebar";
import { useGetRoom, useGetRoomQuestions } from "@/modules/room/hooks/queries";
import { Button } from "../ui/button";

export function AppSidebar() {
	const { state } = useSidebar();

	const { data: rooms, isLoading } = useGetRoom({});

	const [openRoomId, setOpenRoomId] = React.useState<string | null>(null);

	const { data: questions = [], isFetching: loadingOpen } = useGetRoomQuestions(
		{ roomId: openRoomId ?? undefined, limit: 5 },
	);
	const location = useLocation();
	const navigate = useNavigate();

	React.useEffect(() => {
		const m = location.pathname.match(/\/room\/([^/]+)/);
		if (m?.[1]) setOpenRoomId(m[1]);
	}, [location.pathname]);

	return (
		<>
			{/* Trigger flutuante: aparece quando NÃO está expandido */}
			{state !== "expanded" && (
				<SidebarTrigger
					aria-label="Abrir sidebar"
					className="
            fixed left-2 top-4 z-50
            grid h-9 w-9 place-items-center
            hover:bg-accent
						text-base cursor-pointer
          "
				/>
			)}

			<Sidebar collapsible="icon" className="border-r">
				<SidebarContent>
					<SidebarGroup>
						<SidebarHeader className="bg-background-foreground flex items-center justify-between ml-50 ">
							{/* Trigger do cabeçalho: aparece quando expandido */}
							<SidebarTrigger
								aria-label="Fechar sidebar"
								size="sm"
								className="text-base cursor-pointer"
							/>
						</SidebarHeader>

						<SidebarGroupLabel>Salas</SidebarGroupLabel>

						<SidebarMenu>
							{isLoading && (
								<SidebarMenuItem>
									<div className="h-10 w-full animate-pulse rounded-md bg-muted" />
								</SidebarMenuItem>
							)}

							{rooms?.map((room) => {
								const isOpen = openRoomId === room.id;
								const showMore = (room.questionsCount ?? 0) > 5;

								return (
									<React.Fragment key={room.id}>
										<SidebarMenuItem>
											<SidebarMenuButton
												onClick={() => setOpenRoomId(isOpen ? null : room.id)}
												className="justify-between"
												title={room.name}
											>
												<div className="flex items-center gap-2">
													<MessageCircleQuestion className="h-4 w-4" />
													<span className="truncate">{room.name}</span>
												</div>
												<div className="ml-2 flex items-center gap-2">
													<span className="rounded-full bg-muted px-2 py-0.5 text-xs">
														{room.questionsCount ?? 0}
													</span>
													<ChevronRight
														className={`h-4 w-4 transition-transform ${isOpen ? "rotate-90" : ""}`}
													/>
												</div>
											</SidebarMenuButton>
										</SidebarMenuItem>

										{isOpen && (
											<ul className="mb-2 ml-8 space-y-1">
												{loadingOpen && (
													<li className="h-4 w-28 animate-pulse rounded bg-muted" />
												)}
												{questions.map((q) => (
													<li key={q.id}>
														<Button
															variant="ghost"
															className="w-full justify-start text-left text-sm text-muted-foreground hover:text-foreground"
															onClick={() =>
																navigate(`/room/${room.id}#q-${q.id}`)
															}
															title={q.question}
														>
															{q.question.length > 48
																? q.question.slice(0, 48) + "…"
																: q.question}
														</Button>
													</li>
												))}
												{showMore && (
													<li>
														<NavLink
															to={`/room/${room.id}`}
															className="inline-flex items-center gap-1 text-xs text-primary hover:underline"
														>
															<MoreHorizontal className="h-3.5 w-3.5" />
															Ver mais
														</NavLink>
													</li>
												)}
											</ul>
										)}
									</React.Fragment>
								);
							})}
						</SidebarMenu>
					</SidebarGroup>
				</SidebarContent>

				{/* Mantém a trilha clicável quando colapsada */}
				<SidebarRail />
			</Sidebar>
		</>
	);
}
