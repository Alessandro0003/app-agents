import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SnackbarProvider } from "notistack";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { CreateRoom } from "./pages/room/create-room";
import { RecordRoomAudio } from "./pages/room/record-room-audio";
import { Room } from "./pages/room/room";

export function App() {
	const queryClient = new QueryClient();

	return (
		<QueryClientProvider client={queryClient}>
			<SnackbarProvider maxSnack={3} autoHideDuration={5000}>
				<BrowserRouter>
					<Routes>
						<Route element={<CreateRoom />} index />
						<Route element={<Room />} path="/room/:roomId" />
						<Route element={<RecordRoomAudio />} path="/room/:roomId/audio" />
					</Routes>
				</BrowserRouter>
			</SnackbarProvider>
		</QueryClientProvider>
	);
}
