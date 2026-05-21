"use server"

import { auth } from "@/auth"
import { db } from "@/src/data/drizzle"
import { comments, opinions, userGames } from "@/src/data/schema"
import { and, eq } from "drizzle-orm"
import { revalidatePath } from "next/cache"
import { headers } from "next/headers"
import { addCommentSchema, addOpinionSchema } from "../data/validation/gamesValidation"

export type AddCommentState={
    errors?: {
        comment?: string[]
    }
    globalError?:string
}

export type AddOpinionState={
    errors?:{
        opinion?:string[]
    }
    globalError?: string
    success?: boolean
}

//----------COMMENTS ACTIONS---------- 
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


//----------OPINION ACTIONS----------
export const addPositiveOpinion =  async(gameId: number, currentPath : string , prevState: AddOpinionState, formData: FormData): Promise<AddOpinionState> =>{
    const opinion = formData.get("opinion") as string
    
    const session = await auth.api.getSession({ headers : await headers()})

    if(!session) throw new Error("Non connecté")
    
    const result = addOpinionSchema.safeParse({
        opinion
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

    await db.insert(opinions).values({
        userGamesId: userGame.id,
        isPositive: true,
        opinion: result.data.opinion
    })

    revalidatePath(currentPath)
    return{ success : true}
} 

export const addNegativeOpinion =  async(gameId: number, currentPath : string , prevState: AddOpinionState, formData: FormData): Promise<AddOpinionState> =>{
    const opinion = formData.get("opinion") as string
    
    const session = await auth.api.getSession({ headers : await headers()})

    if(!session) throw new Error("Non connecté")
    
    const result = addOpinionSchema.safeParse({
        opinion
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

    await db.insert(opinions).values({
        userGamesId: userGame.id,
        isPositive: false,
        opinion: result.data.opinion
    })

    revalidatePath(currentPath)
    return{ success : true }
} 

export const removeOpinion = async(opinionId : number, currentPath: string) => {
    const session = await auth.api.getSession({ headers: await headers() })

    if(!session) throw new Error("Non connecté")

    await db.delete(opinions).where(
        eq(opinions.id, opinionId)
    )

    revalidatePath(currentPath)
}