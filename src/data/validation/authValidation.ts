import { z } from "zod"

export const signupSchema = z.object({
    pseudo: z.string("Le pseudo doit être une chaine de caractère").trim().min(2,"Le pseudo doit être un minimum de 2 caractère"),
    firstname: z.string("Le prénom doit être une chaine de caractère"),
    lastname: z.string("Le nom doit être une chaine de caractère"),
    email: z.email("Vous devez écrire un email valide. Ex: prenom.nom@gmail.com"),
    password: z.string().min(8,"Le mot de passe doit être à un minimum de 8 caractères")
})