"use client"

import { resetPassword, ResetPasswordState } from "@/src/actions/authActions"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { useActionState } from "react"

const initialState: ResetPasswordState = {}

export default function ResetPassword(){
    const searchParams = useSearchParams()
    const token = searchParams.get("token") ?? ""
    const pseudo = searchParams.get("pseudo") ?? ""
    const [state, formAction, isPending] = useActionState(resetPassword.bind(null, token), initialState)
    console.log(token)
    

    if(state.success){
        return(
            <>
                <p>Mot de passe réinitialisé avec succès !</p>
                <Link href="/login">Se connecter</Link>
            </>
        )
    }

    return(
        <form action={formAction} className="flex flex-col">
            <h1>Bonjour {pseudo} !</h1>
            <p>Tu es sur le point de changer de mot de passe. <br />Ne l'oublie pas cette fois-ci !</p>
            <label htmlFor="password">Nouveau mot de passe</label>
            {state.globalError && (
                <p className="text-red-500 text-sm">{state.globalError}</p>
            )}
            <input type="password" name="password" placeholder="Min. 8 caractères" required/>
            <button type="submit" disabled={isPending}>
                {isPending ? "Réinitialisation..." : "Confirmer"}
            </button>
        </form>
    )
}