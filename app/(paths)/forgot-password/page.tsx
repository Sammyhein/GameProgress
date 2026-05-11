"use client"

import { forgotPassword, type ForgotPasswordState } from "@/src/actions/authActions"
import { useActionState } from "react"

const initialState: ForgotPasswordState = {}

export default function ForgotPassword(){
    const [state, formAction, isPending] = useActionState(forgotPassword, initialState)

    if(state.success){
        return(
            <p>Si cet email existe, tu recevras un lien de réinitialisation dans quelques minutes.</p>

        )
    }

    return(
        <form action={formAction} className="flex flex-col">
            <h1>Mot de passe oublié</h1>
            <label htmlFor="email">Adresse email</label>
            {state.globalError && (
                <p className="text-red-500 text-sm">{state.globalError}</p>
            )}
            <input type="email" name="email" placeholder="ex: clark.kent@gmail.com" required/>
            <button type="submit" disabled={isPending}>
                {isPending ? "Envoi..." : "Envoyer le lien"}
            </button>
        </form>
    )
}