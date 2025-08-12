// app.tsx
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SnackbarProvider } from "notistack";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { CreateRoom } from "@/pages/room/create-room";
import { RecordRoomAudio } from "@/pages/room/record-room-audio";
import { Room } from "@/pages/room/room";
import { AppLayout } from "./layouts-app";

export function App() {
	const queryClient = new QueryClient();

	return (
		<QueryClientProvider client={queryClient}>
			<SnackbarProvider maxSnack={3} autoHideDuration={5000}>
				<BrowserRouter>
					<Routes>
						<Route element={<AppLayout />}>
							<Route index element={<CreateRoom />} />
							<Route path="/room/:roomId" element={<Room />} />
							<Route path="/room/:roomId/audio" element={<RecordRoomAudio />} />
						</Route>
					</Routes>
				</BrowserRouter>
			</SnackbarProvider>
		</QueryClientProvider>
	);
}
