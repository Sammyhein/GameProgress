"use client"
import { useActionState } from "react"
import { addComment, type AddCommentState } from "../actions/gamesJournalActions"
import { usePathname } from "next/navigation"

const initialState: AddCommentState = {}

export default function AddCommentForm({ gameId }: { gameId: number }) {
  const pathname = usePathname()
  const [state, formAction, isPending] = useActionState(
    addComment.bind(null, gameId, pathname),
    initialState
  )

  return (
    <form action={formAction} className="flex flex-col gap-2" noValidate>
      {state.errors?.comment && (
        <p role="alert" className="text-error text-xs">{state.errors.comment[0]}</p>
      )}
      {state.globalError && (
        <p role="alert" className="text-error text-xs">{state.globalError}</p>
      )}
      <div className="flex gap-2">
        <input
          name="comment"
          type="text"
          placeholder="Ajouter une entrée au journal..."
          required
          className="flex-1 bg-bg-elevated border border-brand-purple/20 focus:border-brand-purple focus:outline-none text-text-primary placeholder:text-text-muted rounded-xl px-4 py-3 text-sm transition-colors"
        />
        <button
          type="submit"
          disabled={isPending}
          aria-busy={isPending}
          className="bg-brand-purple hover:bg-brand-purple-dark disabled:opacity-50 text-white font-semibold px-4 py-3 rounded-xl text-sm transition-colors whitespace-nowrap"
        >
          {isPending ? "..." : "Ajouter"}
        </button>
      </div>
    </form>
  )
}

//Version with no design
// "use client"

// import { useActionState } from "react";
// import { addComment, type AddCommentState } from "../actions/gamesJournalActions";
// import { usePathname } from "next/navigation";

// const initialState : AddCommentState = {}

// export default function AddCommentForm({gameId}: {gameId: number}){
//     const pathname= usePathname()
//     const [state, formAction, isPending] = useActionState(addComment.bind(null, gameId, pathname), initialState)
//     return(
//         <form className="flex flex-col" action={formAction}>
            
//             {state.errors?.comment && (
//                 <p className="text-red-500 text-sm">{state.errors.comment[0]}</p>
//             )}
//             {state.globalError && (
//                 <p className="text-red-500 text-sm">{state.globalError}</p>
//             )}
//             <input
//                 name="comment"
//                 type="text"
//                 placeholder="Nouveau commentaire"
//                 required
//             />
            
//             <button type="submit" disabled={isPending}>
//                 {isPending ? "Ajout..." : "Ajouter"}
//             </button>
//         </form>
//     )
// }