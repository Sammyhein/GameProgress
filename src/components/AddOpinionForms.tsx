"use client"
import { usePathname } from "next/navigation";
import { addNegativeOpinion, addPositiveOpinion, AddOpinionState } from "../actions/gamesJournalActions";
import { useActionState } from "react";

const initialState : AddOpinionState = {}

export function AddPositiveOpinionForm({gameId}: {gameId: number}){
    const pathname= usePathname()
    const [state, formAction, isPending] = useActionState(addPositiveOpinion.bind(null, gameId, pathname), initialState)
    return(
        <form  className="flex flex-col" action={formAction}>
            {state.errors?.opinion && (
                <p className="text-red-500 text-sm">{state.errors.opinion[0]}</p>
            )}
            {state.globalError && (
                <p className="text-red-500 text-sm">{state.globalError}</p>
            )}
            <input name="opinion" type="text" placeholder="Nouvel opinion" required/>

            <button type="submit" disabled={isPending}>
                {isPending ? "Ajout..." : "Ajouter"}
            </button>
        </form>
    )
}

export function AddNegativeOpinionForm({gameId}: {gameId: number}){
    const pathname= usePathname()
    const [state, formAction, isPending] = useActionState(addNegativeOpinion.bind(null, gameId, pathname), initialState)
    return(
        <form  className="flex flex-col" action={formAction}>
            {state.errors?.opinion && (
                <p className="text-red-500 text-sm">{state.errors.opinion[0]}</p>
            )}
            {state.globalError && (
                <p className="text-red-500 text-sm">{state.globalError}</p>
            )}
            <input name="opinion" type="text" placeholder="Nouvel opinion" required/>

            <button type="submit" disabled={isPending}>
                {isPending ? "Ajout..." : "Ajouter"}
            </button>
        </form>
    )
}