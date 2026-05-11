import {betterAuth} from "better-auth";
import {drizzleAdapter} from "better-auth/adapters/drizzle";
import { db } from "./src/data/drizzle"; // Change l'import en fonction de TON projet
import * as schema from "@/src/data/schema"; // Change l'import en fonction de TON projet
import {nextCookies} from "better-auth/next-js";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY)

export const auth = betterAuth({
    emailAndPassword: {
        enabled: true, // On active les comptes par email et mot de passe
        sendResetPassword: async({user, url}) => {
          await resend.emails.send({
            from: "GameProgress <onboarding@resend.dev>",
            to: user.email,
            subject: "Réinitialisation de ton mot de passe",
            html: `<p>Clique sur ce lien pour réinitialiser ton mot de passe :</p><a href="${url}">${url}</a>`,
          })
        }
    },
    database: drizzleAdapter(db, {
        provider: "pg",
        schema, // Ajoute ton schéma de DB
    }),
    plugins: [nextCookies()], // ⚠️ Permet de sauvegarder les cookies better-auth dans l'appli next

    user: {
    additionalFields: {
      firstname: {
        type: "string",
        required: true,
      },
      pseudo: {
        type: "string",
        required: true,
      },
      lastname: {
        type:"string",
        required: true,
      }
    }
  }
});