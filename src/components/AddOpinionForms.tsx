"use client"
import { usePathname } from "next/navigation"
import { addNegativeOpinion, addPositiveOpinion, type AddOpinionState } from "../actions/gamesJournalActions"
import { useActionState, useEffect, useState } from "react"

const initialState: AddOpinionState = {}
const MAX_CHARS = 100

export function AddPositiveOpinionForm({ gameId }: { gameId: number }) {
  const pathname = usePathname()
  const [state, formAction, isPending] = useActionState(
    addPositiveOpinion.bind(null, gameId, pathname),
    initialState
  )
  const [value, setValue] = useState("")

  useEffect(() => {
    if (state.success) {
      setValue("")
    }
  }, [state.success])

  return (
    <form action={formAction} className="flex flex-col gap-2" noValidate>
      {state.errors?.opinion && (
        <p role="alert" className="text-error text-xs">{state.errors.opinion[0]}</p>
      )}
      <p className={`text-xs text-right ${
        value.length >= MAX_CHARS
          ? "text-error font-semibold"
          : value.length >= 80
          ? "text-warning"
          : "text-text-muted"
      }`}>
        {value.length}/{MAX_CHARS}
      </p>
      <div className="flex gap-2">
        <input
          name="opinion"
          type="text"
          placeholder="Ajouter un point positif..."
          required
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="flex-1 bg-bg-elevated border border-success/20 focus:border-success focus:outline-none text-text-primary placeholder:text-text-muted rounded-xl px-4 py-2 text-sm transition-colors"
        />
        <button
          type="submit"
          disabled={isPending}
          aria-busy={isPending}
          className="bg-success/20 hover:bg-success/30 border border-success/30 text-success font-semibold px-3 py-2 rounded-xl text-sm transition-colors whitespace-nowrap"
        >
          {isPending ? "..." : "+"}
        </button>
      </div>
    </form>
  )
}

export function AddNegativeOpinionForm({ gameId }: { gameId: number }) {
  const pathname = usePathname()
  const [state, formAction, isPending] = useActionState(
    addNegativeOpinion.bind(null, gameId, pathname),
    initialState
  )
  const [value, setValue] = useState("")

  useEffect(() => {
    if (state.success) {
      setValue("")
    }
  }, [state.success])

  return (
    <form action={formAction} className="flex flex-col gap-2" noValidate>
      {state.errors?.opinion && (
        <p role="alert" className="text-error text-xs">{state.errors.opinion[0]}</p>
      )}
      <p className={`text-xs text-right ${
        value.length >= MAX_CHARS
          ? "text-error font-semibold"
          : value.length >= 80
          ? "text-warning"
          : "text-text-muted"
      }`}>
        {value.length}/{MAX_CHARS}
      </p>
      <div className="flex gap-2">
        <input
          name="opinion"
          type="text"
          placeholder="Ajouter un point négatif..."
          required
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="flex-1 bg-bg-elevated border border-error/20 focus:border-error focus:outline-none text-text-primary placeholder:text-text-muted rounded-xl px-4 py-2 text-sm transition-colors"
        />
        <button
          type="submit"
          disabled={isPending}
          aria-busy={isPending}
          className="bg-error/20 hover:bg-error/30 border border-error/30 text-error font-semibold px-3 py-2 rounded-xl text-sm transition-colors whitespace-nowrap"
        >
          {isPending ? "..." : "+"}
        </button>
      </div>
    </form>
  )
}


//Version with no design 
// "use client"
// import { usePathname } from "next/navigation";
// import { addNegativeOpinion, addPositiveOpinion, AddOpinionState } from "../actions/gamesJournalActions";
// import { useActionState } from "react";

// const initialState : AddOpinionState = {}

// export function AddPositiveOpinionForm({gameId}: {gameId: number}){
//     const pathname= usePathname()
//     const [state, formAction, isPending] = useActionState(addPositiveOpinion.bind(null, gameId, pathname), initialState)
//     return(
//         <form  className="flex flex-col" action={formAction}>
//             {state.errors?.opinion && (
//                 <p className="text-red-500 text-sm">{state.errors.opinion[0]}</p>
//             )}
//             {state.globalError && (
//                 <p className="text-red-500 text-sm">{state.globalError}</p>
//             )}
//             <input name="opinion" type="text" placeholder="Nouvel opinion" required/>

//             <button type="submit" disabled={isPending}>
//                 {isPending ? "Ajout..." : "Ajouter"}
//             </button>
//         </form>
//     )
// }

// export function AddNegativeOpinionForm({gameId}: {gameId: number}){
//     const pathname= usePathname()
//     const [state, formAction, isPending] = useActionState(addNegativeOpinion.bind(null, gameId, pathname), initialState)
//     return(
//         <form  className="flex flex-col" action={formAction}>
//             {state.errors?.opinion && (
//                 <p className="text-red-500 text-sm">{state.errors.opinion[0]}</p>
//             )}
//             {state.globalError && (
//                 <p className="text-red-500 text-sm">{state.globalError}</p>
//             )}
//             <input name="opinion" type="text" placeholder="Nouvel opinion" required/>

//             <button type="submit" disabled={isPending}>
//                 {isPending ? "Ajout..." : "Ajouter"}
//             </button>
//         </form>
//     )
// }