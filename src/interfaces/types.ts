import { InferSelectModel } from "drizzle-orm"
import { games, userGames } from "../data/schema"


export type UserGameWithGame = InferSelectModel<typeof userGames> & {
  game: InferSelectModel<typeof games>
}