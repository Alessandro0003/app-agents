ALTER TABLE "audio_chunks" DROP CONSTRAINT "audio_chunks_room_id_rooms_id_fk";
--> statement-breakpoint
ALTER TABLE "audio_chunks" DROP COLUMN "room_id";