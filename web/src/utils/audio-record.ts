export const isRecordingSupported =
	!!navigator.mediaDevices &&
	typeof navigator.mediaDevices.getUserMedia === "function" &&
	typeof window.MediaRecorder === "function";

export async function createRecorder(
	onDataAvailable: (blob: Blob) => void,
	onStop?: () => void,
): Promise<MediaRecorder> {
	const audioStream = await navigator.mediaDevices.getUserMedia({
		audio: {
			echoCancellation: true,
			noiseSuppression: true,
			sampleRate: 44_100,
		},
	});

	const recorder = new MediaRecorder(audioStream, {
		mimeType: "audio/webm",
		audioBitsPerSecond: 64_000,
	});

	recorder.ondataavailable = (event) => {
		if (event.data.size > 0) {
			onDataAvailable(event.data);
		}
	};

	recorder.onstop = () => {
		onStop?.();
	};

	return recorder;
}
