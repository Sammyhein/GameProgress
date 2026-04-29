import { pgTable, serial, text, foreignKey, integer, boolean, timestamp, index } from "drizzle-orm/pg-core"
import { sql , relations} from "drizzle-orm"

//Tables
export const category = pgTable("category", {
    idCategory: serial("id_category").primaryKey().notNull(),
    name: text().notNull(),
});

export const gamesCategory = pgTable("games_category", {
    idCategory: integer("id_category"),
    idGame: integer("id_game"),
}, (table) => [
    foreignKey({
            columns: [table.idCategory],
            foreignColumns: [category.idCategory],
            name: "games_category_id_category_fkey"
        }),
    foreignKey({
            columns: [table.idGame],
            foreignColumns: [games.idGame],
            name: "games_category_id_game_fkey"
        }),
]);

export const games = pgTable("games", {
    idGame: serial("id_game").primaryKey().notNull(),
    name: text().notNull(),
    releaseYear: integer("release_year"),
    previousGame: text("previous_game"),
    nextGame: text("next_game"),
    description: text(),
    imageUrl: text("image_url"),
    parentalGuidance: integer("parental_guidance"),
    freeToPlay: boolean("free_to_play"),
    companyName: text("company_name"),
    online: boolean(),
    multiplayer: boolean(),
    videoUrl: text("video_url"),
});

export const platforms = pgTable("platforms", {
    idPlatform: serial("id_platform").primaryKey().notNull(),
    name: text().notNull(),
});

export const gamesPlatforms = pgTable("games_platforms", {
    idPlatform: integer("id_platform"),
    idGame: integer("id_game"),
}, (table) => [
    foreignKey({
            columns: [table.idPlatform],
            foreignColumns: [platforms.idPlatform],
            name: "games_platforms_id_platform_fkey"
        }),
    foreignKey({
            columns: [table.idGame],
            foreignColumns: [games.idGame],
            name: "games_platforms_id_game_fkey"
        }),
]);

//Tables BetterAuth

export const user = pgTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("email_verified").default(false).notNull(),
  image: text("image"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
});

export const session = pgTable(
  "session",
  {
    id: text("id").primaryKey(),
    expiresAt: timestamp("expires_at").notNull(),
    token: text("token").notNull().unique(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
    ipAddress: text("ip_address"),
    userAgent: text("user_agent"),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
  },
  (table) => [index("session_userId_idx").on(table.userId)],
);

export const account = pgTable(
  "account",
  {
    id: text("id").primaryKey(),
    accountId: text("account_id").notNull(),
    providerId: text("provider_id").notNull(),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    accessToken: text("access_token"),
    refreshToken: text("refresh_token"),
    idToken: text("id_token"),
    accessTokenExpiresAt: timestamp("access_token_expires_at"),
    refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
    scope: text("scope"),
    password: text("password"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
  },
  (table) => [index("account_userId_idx").on(table.userId)],
);

export const verification = pgTable(
  "verification",
  {
    id: text("id").primaryKey(),
    identifier: text("identifier").notNull(),
    value: text("value").notNull(),
    expiresAt: timestamp("expires_at").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
  },
  (table) => [index("verification_identifier_idx").on(table.identifier)],
);

//Relations

export const gamesCategoryRelations = relations(gamesCategory, ({one}) => ({
    category: one(category, {
        fields: [gamesCategory.idCategory],
        references: [category.idCategory]
    }),
    game: one(games, {
        fields: [gamesCategory.idGame],
        references: [games.idGame]
    }),
}));

export const categoryRelations = relations(category, ({many}) => ({
    gamesCategories: many(gamesCategory),
}));

export const gamesRelations = relations(games, ({many}) => ({
    gamesCategories: many(gamesCategory),
    gamesPlatforms: many(gamesPlatforms),
}));

export const gamesPlatformsRelations = relations(gamesPlatforms, ({one}) => ({
    platform: one(platforms, {
        fields: [gamesPlatforms.idPlatform],
        references: [platforms.idPlatform]
    }),
    game: one(games, {
        fields: [gamesPlatforms.idGame],
        references: [games.idGame]
    }),
}));

export const platformsRelations = relations(platforms, ({many}) => ({
    gamesPlatforms: many(gamesPlatforms),
}));

//Relations BetterAuth

export const userRelations = relations(user, ({ many }) => ({
  sessions: many(session),
  accounts: many(account),
}));

export const sessionRelations = relations(session, ({ one }) => ({
  user: one(user, {
    fields: [session.userId],
    references: [user.id],
  }),
}));

export const accountRelations = relations(account, ({ one }) => ({
  user: one(user, {
    fields: [account.userId],
    references: [user.id],
  }),
}));