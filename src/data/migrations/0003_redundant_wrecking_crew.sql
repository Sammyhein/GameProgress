ALTER TABLE "user" RENAME COLUMN "name" TO "firstname";--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "lastname" text NOT NULL;