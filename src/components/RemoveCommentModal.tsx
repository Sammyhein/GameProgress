"use client"
import { useEffect, useRef, useState } from "react"
import { removeComment } from "../actions/gamesJournalActions"
import { usePathname } from "next/navigation"

type RemoveCommentModalProps = {
  commentId: number
  onClose: () => void
}

export default function RemoveCommentModal({ commentId, onClose }: RemoveCommentModalProps) {
  const pathname = usePathname()
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
    await removeComment(commentId, pathname)
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
            Supprimer ce commentaire ?
          </h2>
        </header>

        <section>
          <p className="text-text-secondary text-sm leading-relaxed">
            Es-tu certain de vouloir supprimer ce commentaire ? S'il ne sert à rien,
            c'est compréhensible, mais s'il exprime réellement quelque chose, autant
            le garder non ?
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

// "use client"

// import { useEffect, useRef, useState } from "react"
// import { removeComment } from "../actions/gamesJournalActions"
// import { usePathname } from "next/navigation"

// type RemoveCommentModalProps = {
//     commentId: number
//     onClose: () => void
// }

// export default function RemoveCommentModal({commentId, onClose}: RemoveCommentModalProps){
//     const pathname = usePathname()
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
//             setIsPending(true)
//             await removeComment(commentId, pathname)
//             setIsPending(false)
//             handleClose()
//     }

//     const handleBackdropClick = (e: React.MouseEvent<HTMLDialogElement>) => {
//         if (e.target === dialogRef.current) handleClose()
//     }

//     return(
//         <dialog
//             ref={dialogRef}
//             onCancel={handleClose}
//             onClick={handleBackdropClick}
//             className="rounded-2xl p-6 w-80 shadow-xl backdrop:bg-black/50"
//         >
//             <article className="flex flex-col gap-4">
//                 <header>
//                     <h2 className="text-lg font-bold">Supprimer le commentaire ?</h2>
//                 </header>

//                 <section>
//                     <p>
//                         Es-tu certain de vouloir supprimer ce commentaire ? S'il ne sert à rien, c'est compréhensible mais s'il exprime réellement quelque chose, autant le garder non ?
//                     </p>
//                 </section>

//                 <footer className="flex gap-2 justify-end">
//                     <button onClick={handleClose} className="px-4 py-2 border rounded-xl">
//                         Annuler
//                     </button>
//                     <button onClick={handleConfirm} disabled={isPending} 
//                     className="px-4 py-2 bg-red-500 text-white rounded-xl disabled:opacity-50">
//                         {isPending ? "Suppression..." : "Supprimer"}
//                     </button>
//                 </footer>
//             </article>
//         </dialog>
//     )
// }