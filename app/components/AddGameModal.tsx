"use client"

import { useEffect, useRef, useState } from "react"
import { addGame } from "../actions/user-gamesActions"

type AddGameModalProps = {
    gameId: number,
    gameName: string,
    //apparement le on close ici c'est pour dire à typescript que le onClose ne retournera rien , ça lui dit comment se fermer , vu que c'est pas ici qu'on le ferme mais plutot dans la page parent
    onClose: () => void
}

export default function AddGameModal({ gameId, gameName, onClose}: AddGameModalProps){
    const [progress, setProgress] = useState(0)
    const [playedTime, setPlayedTime]= useState(0)
    const [scale, setScale] = useState("0")
    const [isPending, setIsPending] = useState(false)
    const dialogRef = useRef<HTMLDialogElement>(null)

    // Ouvre la modale dès que le composant est monté
    useEffect(() => {
        dialogRef.current?.showModal()
    }, [])

    // Gère la fermeture avec la touche Échap (natif sur dialog)
    const handleClose = () => {
        dialogRef.current?.close()
        onClose()
    }

    // Ferme si on clique sur le backdrop
    const handleBackdropClick = (e: React.MouseEvent<HTMLDialogElement>) => {
        if (e.target === dialogRef.current) handleClose()
    }

    const handleSubmit = async () => {
        setIsPending(true)
        await addGame(gameId, progress, playedTime, scale)
        setIsPending(false)
        onClose()
    }

    return (
        <dialog
            ref= {dialogRef}
            onCancel={handleClose}
            onClick={handleBackdropClick}
            className="rounded-2xl p-6 w-80 shadow-xl backdrop:bg-black/50"
        >
            <article className="flex flex-col gap-4">
                <header>
                    <h2 className="text-lg font-bold">Ajouter {gameName}</h2>
                </header>
                <section className="flex flex-col gap-4">
                    <div className="flex flex-col gap-1">
                        <label htmlFor="progress">Progression (%)</label>
                        <input 
                            id="progress"
                            type="number"
                            min={0}
                            max={100}
                            value={progress}
                            onChange={(e) => setProgress(Number(e.target.value))}
                            className="border rounded p-2"
                             />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label htmlFor="playedTime">Temps de jeu (heures)</label>
                        <input
                            id="playedTime"
                            type="number"
                            min={0}
                            value={playedTime}
                            onChange={(e) => setPlayedTime(Number(e.target.value))}
                            className="border rounded p-2"
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label htmlFor="scale">Note (/10)</label>
                        <input
                            id="scale"
                            type="number"
                            min={0}
                            max={10}
                            value={scale ?? ""}
                            onChange={(e) => setScale(e.target.value)}
                            className="border rounded p-2"
                            placeholder="Optionnel"
                        />
                    </div>
                </section>

                <footer className="flex gap-2 justify-end">
                    <button onClick={handleClose} className="px-4 py-2 border rounded-xl">
                        Annuler
                    </button>

                    <button onClick={handleSubmit} disabled={isPending} className="px-4 py-2 bg-green-500 text-white rounded-xl disabled:opacity-50">
                        {isPending ? "Ajout..." : "Ajouter"}
                    </button>
                </footer>
            </article>
        </dialog>
    )
}