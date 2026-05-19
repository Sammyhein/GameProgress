"use client"

import { useEffect, useRef, useState } from "react"
import { removeGame } from "../actions/user-gamesActions"
import Link from "next/link"

type RemoveGameModalProps = {
  gameId: number
  gameName: string
  onClose: () => void
}

type RemoveGameModalJournalProps = {
  gameId: number
  gameName: string
  onClose: () => void
  pseudo: string
}

export default function RemoveGameModal({ gameId, gameName, onClose }: RemoveGameModalProps) {
  const [isPending, setIsPending] = useState(false)
  const dialogRef = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    dialogRef.current?.showModal()
  }, [])

  const handleClose = () => {
    dialogRef.current?.close()
    onClose()
  }

  const handleConfirm = async () => {
    setIsPending(true)
    await removeGame(gameId)
    setIsPending(false)
    handleClose()
  }

  const handleBackdropClick = (e: React.MouseEvent<HTMLDialogElement>) => {
    if (e.target === dialogRef.current) handleClose()
  }

  return (
    <dialog
      ref={dialogRef}
      onCancel={handleClose}
      onClick={handleBackdropClick}
      className="bg-bg-card border border-brand-purple/20 rounded-2xl p-6 w-[90%] max-w-sm shadow-xl backdrop:bg-black/70"
    >
      <article className="flex flex-col gap-6">
        <header>
          <h2 className="text-lg font-bold text-text-primary">
            Supprimer <span className="text-error">{gameName}</span> ?
          </h2>
        </header>

        <section>
          <p className="text-text-secondary text-sm leading-relaxed">
            Es-tu sûr de vouloir retirer ce jeu de ta bibliothèque ? Tu pourras
            le re-ajouter plus tard mais tu perdras toutes les informations associées.
          </p>
        </section>

        <footer className="flex gap-3 justify-end">
          <button
            onClick={handleClose}
            className="px-4 py-2 border border-brand-purple/30 hover:border-brand-purple text-text-secondary hover:text-text-primary rounded-xl text-sm transition-colors"
          >
            Annuler
          </button>
          <button
            onClick={handleConfirm}
            disabled={isPending}
            aria-busy={isPending}
            className="px-4 py-2 bg-error hover:bg-error/80 disabled:opacity-50 text-white font-semibold rounded-xl text-sm transition-colors"
          >
            {isPending ? "Suppression..." : "Supprimer"}
          </button>
        </footer>
      </article>
    </dialog>
  )
}

export function RemoveGameModalJournal({ gameId, gameName, onClose, pseudo }: RemoveGameModalJournalProps) {
  const [isPending, setIsPending] = useState(false)
  const dialogRef = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    dialogRef.current?.showModal()
  }, [])

  const handleClose = () => {
    dialogRef.current?.close()
    onClose()
  }

  const handleBackdropClick = (e: React.MouseEvent<HTMLDialogElement>) => {
    if (e.target === dialogRef.current) handleClose()
  }

  return (
    <dialog
      ref={dialogRef}
      onCancel={handleClose}
      onClick={handleBackdropClick}
      className="bg-bg-card border border-brand-purple/20 rounded-2xl p-6 w-[90%] max-w-sm shadow-xl backdrop:bg-black/70"
    >
      <article className="flex flex-col gap-6">
        <header>
          <h2 className="text-lg font-bold text-text-primary">
            Supprimer <span className="text-error">{gameName}</span> ?
          </h2>
        </header>

        <section>
          <p className="text-text-secondary text-sm leading-relaxed">
            Es-tu sûr de vouloir retirer ce jeu de ta bibliothèque ? Tu pourras
            le re-ajouter plus tard mais tu perdras toutes les informations associées.
          </p>
        </section>

        <footer className="flex gap-3 justify-end">
          <button
            onClick={handleClose}
            className="px-4 py-2 border border-brand-purple/30 hover:border-brand-purple text-text-secondary hover:text-text-primary rounded-xl text-sm transition-colors"
          >
            Annuler
          </button>
          <Link href={`/profil/${pseudo}`}>
            <button
              disabled={isPending}
              aria-busy={isPending}
              className="px-4 py-2 bg-error hover:bg-error/80 disabled:opacity-50 text-white font-semibold rounded-xl text-sm transition-colors"
            >
              {isPending ? "Suppression..." : "Supprimer"}
            </button>
          </Link>
        </footer>
      </article>
    </dialog>
  )
}

//Version with no design 
// "use client"

// import { useEffect, useRef, useState } from "react"
// import { removeGame } from "../actions/user-gamesActions"
// import Link from "next/link"

// type RemoveGameModalProps = {
//     gameId: number
//     gameName: string
//     onClose: () => void
// }

// type RemoveGameModalJournalProps = {
//     gameId: number
//     gameName: string
//     onClose: () => void
//     pseudo:string
// }

// export default function RemoveGameModal({gameId, gameName, onClose}: RemoveGameModalProps){
//     const [isPending, setIsPending] = useState(false)
//     const dialogRef = useRef<HTMLDialogElement>(null)

//     useEffect(() => {
//         dialogRef.current?.showModal()
//     }, [])

//     const handleClose = () => {
//         dialogRef.current?.close()
//         onClose()
//     }

//     const handleConfirm = async () => {
//         setIsPending(true)
//         await removeGame(gameId)
//         setIsPending(false)
//         handleClose()
//     }

//     const handleBackdropClick = (e: React.MouseEvent<HTMLDialogElement>) => {
//         if (e.target === dialogRef.current) handleClose()
//     }

//     return (
//         <dialog
//             ref={dialogRef}
//             onCancel={handleClose}
//             onClick={handleBackdropClick}
//             className="rounded-2xl p-6 w-80 shadow-xl backdrop:bg-black/50"
//         >
//             <article className="flex flex-col gap-4">
//                 <header>
//                     <h2 className="text-lg font-bold">Supprimer {gameName} ?</h2>
//                 </header>

//                 <section>
//                     <p>
//                         Es-tu sûr de vouloir retirer ce jeu de ta bibliothèque ? Tu pourras le re-ajouter plus tard mais tu perdras toutes les infos que tu as mis dedans.
//                     </p>
//                 </section>
                
//                 <footer className="flex gap-2 justify-end">
//                     <button onClick={handleClose} className="px-4 py-2 border rounded-xl">
//                         Annuler
//                     </button>
//                     <button onClick={handleConfirm} disabled={isPending} 
//                     className="px-4 py-2 bg-red-500 text-white rounded-xl disabled:opacity-50"
//                     >
//                         {isPending ? "Suppression..." : "Supprimer"}
//                     </button>
//                 </footer>

//             </article>

//         </dialog>
//     )
// }

// export function RemoveGameModalJournal({gameId, gameName, onClose, pseudo}: RemoveGameModalJournalProps){
//     const [isPending, setIsPending] = useState(false)
//     const dialogRef = useRef<HTMLDialogElement>(null)

//     useEffect(() => {
//         dialogRef.current?.showModal()
//     }, [])

//     const handleClose = () => {
//         dialogRef.current?.close()
//         onClose()
//     }

//     const handleConfirm = async () => {
//         setIsPending(true)
//         await removeGame(gameId)
//         setIsPending(false)
//         handleClose()
//     }

//     const handleBackdropClick = (e: React.MouseEvent<HTMLDialogElement>) => {
//         if (e.target === dialogRef.current) handleClose()
//     }

//     return (
//         <dialog
//             ref={dialogRef}
//             onCancel={handleClose}
//             onClick={handleBackdropClick}
//             className="rounded-2xl p-6 w-80 shadow-xl backdrop:bg-black/50"
//         >
//             <article className="flex flex-col gap-4">
//                 <header>
//                     <h2 className="text-lg font-bold">Supprimer {gameName} ?</h2>
//                 </header>

//                 <section>
//                     <p>
//                         Es-tu sûr de vouloir retirer ce jeu de ta bibliothèque ? Tu pourras le re-ajouter plus tard mais tu perdras toutes les infos que tu as mis dedans.
//                     </p>
//                 </section>
                
//                 <footer className="flex gap-2 justify-end">
//                     <button onClick={handleClose} className="px-4 py-2 border rounded-xl">
//                         Annuler
//                     </button>
//                     <Link href={`/profil/${pseudo}`}>
//                         <button onClick={handleConfirm} disabled={isPending} 
//                         className="px-4 py-2 bg-red-500 text-white rounded-xl disabled:opacity-50"
//                         >
//                             {isPending ? "Suppression..." : "Supprimer"}
//                         </button>
//                     </Link>
//                 </footer>

//             </article>

//         </dialog>
//     )
// }