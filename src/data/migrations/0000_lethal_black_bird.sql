CREATE TABLE "category" (
	"id_category" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "games" (
	"id_game" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"release_year" integer,
	"previous_game" text,
	"next_game" text,
	"description" text,
	"image_url" text,
	"parental_guidance" integer,
	"free_to_play" boolean,
	"company_name" text,
	"online" boolean,
	"multiplayer" boolean,
	"video_url" text
);
--> statement-breakpoint
CREATE TABLE "games_category" (
	"id_category" integer,
	"id_game" integer
);
--> statement-breakpoint
CREATE TABLE "games_platforms" (
	"id_platform" integer,
	"id_game" integer
);
--> statement-breakpoint
CREATE TABLE "platforms" (
	"id_platform" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL
);
--> statement-breakpoint
ALTER TABLE "games_category" ADD CONSTRAINT "games_category_id_category_fkey" FOREIGN KEY ("id_category") REFERENCES "public"."category"("id_category") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "games_category" ADD CONSTRAINT "games_category_id_game_fkey" FOREIGN KEY ("id_game") REFERENCES "public"."games"("id_game") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "games_platforms" ADD CONSTRAINT "games_platforms_id_platform_fkey" FOREIGN KEY ("id_platform") REFERENCES "public"."platforms"("id_platform") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "games_platforms" ADD CONSTRAINT "games_platforms_id_game_fkey" FOREIGN KEY ("id_game") REFERENCES "public"."games"("id_game") ON DELETE no action ON UPDATE no action;