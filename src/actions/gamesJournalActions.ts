"use server"

import { auth } from "@/auth"
import { db } from "@/src/data/drizzle"
import { comments, userGames } from "@/src/data/schema"
import { and, eq } from "drizzle-orm"
import { revalidatePath } from "next/cache"
import { headers } from "next/headers"
import { addCommentSchema } from "../data/validation/gamesValidation"

export type AddCommentState={
    errors?: {
        comment?: string[]
    }
    globalError?:string
}

export const addComment = async (gameId: number, currentPath: string, prevState: AddCommentState, formData: FormData): Promise<AddCommentState> => {
    const comment = formData.get("comment") as string

    const session = await auth.api.getSession({ headers : await headers()})

    if(!session) throw new Error("Non connecté")

    const result = addCommentSchema.safeParse({
        comment
    })

    if(!result.success){
        return {errors: result.error.flatten().fieldErrors}
    }

    // On récupère l'entrée userGames pour avoir son id
    const userGame = await db.query.userGames.findFirst({
         where: and(
                    eq(userGames.userId, session.user.id),
                    eq(userGames.gameId, gameId)
                )
    })

    if (!userGame) throw new Error("Jeu non trouvé dans ta bibliothèque")

    await db.insert(comments).values({
        userGamesId: userGame.id,
        comment: result.data.comment
    })

    revalidatePath(currentPath)
    return{}
}

export const removeComment = async(commentId : number, currentPath: string) => {
    const session = await auth.api.getSession({ headers: await headers() })

    if(!session) throw new Error("Non connecté")

    await db.delete(comments).where(
        eq(comments.id, commentId)
    )

    revalidatePath(currentPath)
}