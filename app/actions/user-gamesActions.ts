"use server"

import { auth } from "@/auth"
import { db } from "@/src/data/drizzle"
import { userGames } from "@/src/data/schema"
import { and, eq } from "drizzle-orm"
import { revalidatePath } from "next/cache"
import { headers } from "next/headers"

export const addGame = async (gameId: number, progress: number, playedTime: number, scale: string) => {
    const session = await auth.api.getSession({ headers : await headers()})

    if(!session) throw new Error("Non connecté")

    await db.insert(userGames).values({
        userId: session.user.id,
        gameId,
        progress,
        playedTime,
        scale
    })

    revalidatePath("/search-game")
}

export const removeGame = async (gameId: number) => {
    const session = await auth.api.getSession({ headers: await headers() })

    if(!session) throw new Error("Non connecté")

    await db.delete(userGames).where(
        and(
            eq(userGames.userId, session.user.id),
            eq(userGames.gameId, gameId)
        )
    )

    revalidatePath("/search-game")
}