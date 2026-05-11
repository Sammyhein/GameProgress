"use server"

import { auth } from "@/auth"
import { db } from "@/src/data/drizzle"
import { comments, opinions, userGames } from "@/src/data/schema"
import { and, eq } from "drizzle-orm"
import { revalidatePath } from "next/cache"
import { headers } from "next/headers"
import { addGameSchema } from "../data/validation/gamesValidation"

export type AddGameState={
    errors?: {
        progress?: string[]
        playedTime?: string[]
        scale ?: string[]
    }
    globalError?: string
}

export const addGame = async (gameId: number, progress: number, playedTime: number, scale: number): Promise<AddGameState> => {
    const session = await auth.api.getSession({ headers : await headers()})

    if(!session) throw new Error("Non connecté")

    const result = addGameSchema.safeParse({
        progress,
        playedTime,
        scale: !scale ? null : scale
    })

    if(!result.success){
        return {errors: result.error.flatten().fieldErrors}
    }

    await db.insert(userGames).values({
        userId: session.user.id,
        gameId,
        progress,
        playedTime,
        scale
    })

    revalidatePath("/search-game")
    return{}
}

export const removeGame = async (gameId: number) => {
    const session = await auth.api.getSession({ headers: await headers() })

    if(!session) throw new Error("Non connecté")

    // On récupère l'entrée userGames pour avoir son id
    const userGame = await db.query.userGames.findFirst({
    where: and(
      eq(userGames.userId, session.user.id),
      eq(userGames.gameId, gameId)
    )
    })

    if (!userGame) throw new Error("Jeu non trouvé dans ta bibliothèque")

    //On supprime les commentaires liés
    await db.delete(comments).where(eq(comments.userGamesId, userGame.id))

    //On supprime les opinios liées
    await db.delete(opinions).where(eq(opinions.userGamesId, userGame.id))

    //On supprime l'entrée userGames
    await db.delete(userGames).where(
        and(
            eq(userGames.userId, session.user.id),
            eq(userGames.gameId, gameId)
        )
    )

    revalidatePath("/search-game")
}

export const modifyGame = async (gameId: number, progress: number, playedTime: number, scale: number | null, currentPath: string): Promise<AddGameState> => {
    const session = await auth.api.getSession({ headers: await headers() })
    if (!session) throw new Error("Non connecté")

    const result = addGameSchema.safeParse({
        progress,
        playedTime,
        scale: !scale ? null : scale,
    })

    if(!result.success){
        return { errors: result.error.flatten().fieldErrors}
    }
    
    await db.update(userGames)
    .set({
      progress: result.data.progress,
      playedTime: result.data.playedTime,
      scale: result.data.scale,
    })
    .where(
      and(
        eq(userGames.userId, session.user.id),
        eq(userGames.gameId, gameId)
      )
    )

    revalidatePath(currentPath)
    return {}
}