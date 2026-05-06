"use client"
import { signin, type SigninState } from "@/src/actions/authActions"
import Link from "next/link"
import { useActionState } from "react"

const initialState: SigninState = {}

export default function Login(){
    const [state, formAction, isPending] = useActionState(signin, initialState)
    return(
        <>
        <h1>LOGO</h1>
        <form className="flex flex-col" action={formAction}>
            <h1>Connectez-vous !</h1>

            {/* Pour les erreurs */}
            {state.globalError && (
                <p className="text-red-500 text-sm">{state.globalError}</p>
            )}

            <label htmlFor="email">Adresse Mail</label>
            <input name ="email" type="text" placeholder="ex: prenom@gmail.com" required/>
            <label htmlFor="password">Mot de Passe</label>
            <input name="password" type="password" placeholder="ex: motdepassesecret" required/>

            <button type="submit">
                {isPending ? "Connexion ..." : "Confirmer"}
            </button>


            <p>Vous n'avez pas encore de compte ? <Link href="/create-account"><span className="text-blue-300">Créer un compte</span></Link></p>
        </form>
        </>
    )
}