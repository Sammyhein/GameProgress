"use client"

import { useActionState } from "react";
import { addComment, type AddCommentState } from "../actions/gamesJournalActions";
import { usePathname } from "next/navigation";

const initialState : AddCommentState = {}

export default function JournalForm({gameId}: {gameId: number}){
    const pathname= usePathname()
    const [state, formAction, isPending] = useActionState(addComment.bind(null, gameId, pathname), initialState)
    return(
        <form className="flex flex-col" action={formAction}>
            
            {state.errors?.comment && (
                <p className="text-red-500 text-sm">{state.errors.comment[0]}</p>
            )}
            {state.globalError && (
                <p className="text-red-500 text-sm">{state.globalError}</p>
            )}
            <input
                name="comment"
                type="text"
                placeholder="Nouveau commentaire"
                required
            />
            
            <button type="submit" disabled={isPending}>
                {isPending ? "Ajout..." : "Ajouter"}
            </button>
        </form>
    )
}