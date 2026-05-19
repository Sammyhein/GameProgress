"use client"
import { useState } from "react"
import RemoveGameModal, { RemoveGameModalJournal } from "./RemoveGameModal"

type RemoveGameProps = {
  gameId: number
  gameName: string
}

type RemoveGameJournalProps = {
  gameId: number
  gameName: string
  pseudo: string
}

export default function RemoveGameButton({ gameId, gameName }: RemoveGameProps) {
  const [showRemoveModal, setShowRemoveModal] = useState(false)

  return (
    <>
      <button
        onClick={() => setShowRemoveModal(true)}
        aria-label={`Retirer ${gameName} de ma bibliothèque`}
        className="w-full py-2 border border-error/30 hover:border-error hover:bg-error/10 text-error text-xs font-semibold rounded-xl transition-colors"
      >
        Retirer
      </button>

      {showRemoveModal && (
        <RemoveGameModal
          gameId={gameId}
          gameName={gameName}
          onClose={() => setShowRemoveModal(false)}
        />
      )}
    </>
  )
}

export function RemoveGameButtonJournal({ gameId, gameName, pseudo }: RemoveGameJournalProps) {
  const [showRemoveModal, setShowRemoveModal] = useState(false)

  return (
    <>
      <button
        onClick={() => setShowRemoveModal(true)}
        aria-label={`Supprimer ${gameName} de ma bibliothèque`}
        className="flex items-center gap-2 px-4 py-2 border border-error/30 hover:border-error hover:bg-error/10 text-error text-sm font-semibold rounded-xl transition-colors"
      >
        <span aria-hidden="true">🗑</span>
        Supprimer le jeu
      </button>

      {showRemoveModal && (
        <RemoveGameModalJournal
          gameId={gameId}
          gameName={gameName}
          onClose={() => setShowRemoveModal(false)}
          pseudo={pseudo}
        />
      )}
    </>
  )
}

//Version with no design
// "use client"

// import { useState } from "react"
// import RemoveGameModal, { RemoveGameModalJournal } from "./RemoveGameModal"

// type RemoveGameProps = {
//     gameId: number
//     gameName: string
// }

// type RemoveGameJournalProps = {
//     gameId: number
//     gameName: string
//     pseudo: string
// }

// export default function RemoveGameButton({gameId, gameName}: RemoveGameProps){
//     const [showRemoveModal, setShowRemoveModal] = useState(false)
    
//     return(
//         <>
//         <button onClick={() => setShowRemoveModal(true)} className="p-2 bg-red-500 border-2 border-white rounded-2xl">-</button>

//         {showRemoveModal &&(
//             <RemoveGameModal gameId={gameId} gameName={gameName}
//             onClose={() => setShowRemoveModal(false)}/>
//         )}
//         </>
//     )
// }

// export function RemoveGameButtonJournal({gameId, gameName, pseudo}: RemoveGameJournalProps){
//     const [showRemoveModal, setShowRemoveModal] = useState(false)
    
//     return(
//         <>
//         <button onClick={() => setShowRemoveModal(true)} className="p-2 bg-red-500 border-2 border-white rounded-2xl">Supprimer</button>

//         {showRemoveModal &&(
//             <RemoveGameModalJournal gameId={gameId} gameName={gameName}
//             onClose={() => setShowRemoveModal(false)} pseudo={pseudo}/>
//         )}
//         </>
//     )
// }