"use client"
import { signup, type SignupState } from "@/src/actions/authActions"
import Link from "next/link"
import { useActionState } from "react"

const initialState : SignupState = {}

export default function CreateAccount(){
    const [state, formAction, isPending] = useActionState(signup, initialState)
    return(
        <>
        <h1>LOGO</h1>
        <form className="flex flex-col" action={formAction}>
            <h1>Créer un compte !</h1>

            <label htmlFor="pseudo">Pseudo</label>
            {/* On génère les messages d'erreurs */}
            {state.errors?.pseudo && (
                <p className="text-red-500 text-sm">{state.errors.pseudo[0]}</p>
            )}
            <input name="pseudo" type="text" placeholder="ex: Superman38" required/>

            <label htmlFor="firstname">Prénom</label>
             {state.errors?.firstname && (
                <p className="text-red-500 text-sm">{state.errors.firstname[0]}</p>
            )}
            <input name="firstname" type="text" placeholder="ex: Clark" required/>

            <label htmlFor="lastname">Nom de famille</label>
            {state.errors?.lastname && (
                <p className="text-red-500 text-sm">{state.errors.lastname[0]}</p>
            )}
            <input type="text" name="lastname" placeholder="ex: Kent" required/>

            <label htmlFor="email">Email</label>
             {state.errors?.email && (
                <p className="text-red-500 text-sm">{state.errors.email[0]}</p>
            )}
            <input type="email" name="email" placeholder="clark.kent@gmail.com" required/>

            <label htmlFor="password">Mot de Passe</label>
             {state.errors?.password && (
                <p className="text-red-500 text-sm">{state.errors.password[0]}</p>
            )}
            <input type="password" name="password" placeholder="ex: iAmSuperman" required/>

            {/* <label htmlFor="confirmedPassword">Confirmation de Mot de Passe</label>
            <input type="text" name="confirmedPassword" placeholder="Doit être identique à votre mot de passe" /> */}

            {/* <Link href="/login"> */}
            <button type="submit">
                {isPending ? "Chargement..." : "Créer mon compte"}
            </button>
            {/* </Link> */}
        </form>
        </>
    )
}