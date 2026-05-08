import { z } from "zod"

export const addGameSchema = z.object({
    progress: z.number().min(0, "La progression ne peut pas être négative").max(100, "La progression ne peux pas dépasser 100%"),
    playedTime: z.number().min(0, "Le temps de jeu ne peut pas être négative"),
    scale: z.number().min(0, "La note ne peut pas être négative").max(10, "La note ne peux pas dépasser 10").nullable()
})

export const addCommentSchema = z.object({
    comment: z.string().min(1, "Écrivez un commentaire avant de l'ajouter")
})