"use client"

import { usePathname } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import { removeOpinion } from "../actions/gamesJournalActions"

type RemoveOpinionModalProps= {
    opinionId: number
    onClose: () => void
}

export default function RemoveOpinionModal({opinionId, onClose}: RemoveOpinionModalProps){
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
                await removeOpinion(opinionId, pathname)
                setIsPending(false)
                handleClose()
    }

    const handleBackdropClick = (e: React.MouseEvent<HTMLDialogElement>) => {
        if (e.target === dialogRef.current) handleClose()
    }

    return(
        <dialog
            ref={dialogRef}
            onCancel={handleClose}
            onClick={handleBackdropClick}
            className="rounded-2xl p-6 w-80 shadow-xl backdrop:bg-black/50"
        >
            <article className="flex flex-col gap-4">
                <header>
                    <h2 className="text-lg font-bold">Supprimer cet Opinion ?</h2>
                </header>

                <section>
                    <p>
                        Es-tu certain de vouloir supprimer cet opinion ?
                    </p>
                </section>

                <footer className="flex gap-2 justify-end">
                    <button onClick={handleClose} className="px-4 py-2 border rounded-xl">
                        Annuler
                    </button>
                    <button onClick={handleConfirm} disabled={isPending} 
                    className="px-4 py-2 bg-red-500 text-white rounded-xl disabled:opacity-50">
                        {isPending ? "Suppression..." : "Supprimer"}
                    </button>
                </footer>
            </article>

        </dialog>
    )
}