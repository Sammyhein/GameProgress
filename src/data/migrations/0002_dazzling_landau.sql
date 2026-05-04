CREATE TABLE "comments" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_games_id" integer NOT NULL,
	"date" timestamp DEFAULT now() NOT NULL,
	"comment" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "opinions" (
	"id" serial PRIMARY KEY NOT NULL,
	"is_positive" boolean NOT NULL,
	"opinion" varchar(100) NOT NULL,
	"user_games_id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "user_games" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"game_id" integer NOT NULL,
	"progress" integer NOT NULL,
	"played_time" integer NOT NULL,
	"scale" text NOT NULL
);
--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "pseudo" text NOT NULL;--> statement-breakpoint
ALTER TABLE "comments" ADD CONSTRAINT "comments_user_games_id_user_games_id_fk" FOREIGN KEY ("user_games_id") REFERENCES "public"."user_games"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "opinions" ADD CONSTRAINT "opinions_user_games_id_user_games_id_fk" FOREIGN KEY ("user_games_id") REFERENCES "public"."user_games"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_games" ADD CONSTRAINT "user_games_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_games" ADD CONSTRAINT "user_games_game_id_games_id_game_fk" FOREIGN KEY ("game_id") REFERENCES "public"."games"("id_game") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user" ADD CONSTRAINT "user_pseudo_unique" UNIQUE("pseudo");