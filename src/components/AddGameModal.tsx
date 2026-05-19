"use client"

import { useEffect, useRef, useState } from "react"
import { addGame } from "../actions/user-gamesActions"

type AddGameModalProps = {
  gameId: number
  gameName: string
  onClose: () => void
}

export default function AddGameModal({ gameId, gameName, onClose }: AddGameModalProps) {
  const [progress, setProgress] = useState(0)
  const [playedTime, setPlayedTime] = useState(0)
  const [scale, setScale] = useState(0)
  const [isPending, setIsPending] = useState(false)
  const dialogRef = useRef<HTMLDialogElement>(null)
  const [errors, setErrors] = useState<{
    progress?: string[]
    playedTime?: string[]
    scale?: string[]
  }>({})

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

  const handleSubmit = async () => {
    setIsPending(true)
    const result = await addGame(gameId, progress, playedTime, scale)
    setIsPending(false)

    if (result.errors) {
      setErrors(result.errors)
      return
    }

    handleClose()
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
            Ajouter <span className="text-brand-cyan">{gameName}</span>
          </h2>
          <p className="text-text-secondary text-xs mt-1">
            Ces informations pourront être modifiées plus tard.
          </p>
        </header>

        <form className="flex flex-col gap-4">

          <div className="flex flex-col gap-1">
            <label htmlFor="progress" className="text-text-secondary text-sm font-medium">
              Progression (%)
            </label>
            {errors.progress && (
              <p role="alert" className="text-error text-xs">{errors.progress[0]}</p>
            )}
            <input
              id="progress"
              type="number"
              min={0}
              max={100}
              value={progress}
              onChange={(e) => setProgress(Number(e.target.value))}
              placeholder="0"
              className="bg-bg-elevated border border-brand-purple/20 focus:border-brand-purple focus:outline-none text-text-primary placeholder:text-text-muted rounded-xl px-4 py-3 text-sm transition-colors"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="playedTime" className="text-text-secondary text-sm font-medium">
              Temps de jeu (heures)
            </label>
            {errors.playedTime && (
              <p role="alert" className="text-error text-xs">{errors.playedTime[0]}</p>
            )}
            <input
              id="playedTime"
              type="number"
              min={0}
              value={playedTime}
              onChange={(e) => setPlayedTime(Number(e.target.value))}
              placeholder="0"
              className="bg-bg-elevated border border-brand-purple/20 focus:border-brand-purple focus:outline-none text-text-primary placeholder:text-text-muted rounded-xl px-4 py-3 text-sm transition-colors"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="scale" className="text-text-secondary text-sm font-medium">
              Note (/10)
              <span className="text-text-muted text-xs ml-1">(optionnel)</span>
            </label>
            {errors.scale && (
              <p role="alert" className="text-error text-xs">{errors.scale[0]}</p>
            )}
            <input
              id="scale"
              type="number"
              min={0}
              max={10}
              onChange={(e) => setScale(Number(e.target.value))}
              placeholder="Ex: 8"
              className="bg-bg-elevated border border-brand-purple/20 focus:border-brand-purple focus:outline-none text-text-primary placeholder:text-text-muted rounded-xl px-4 py-3 text-sm transition-colors"
            />
          </div>

        </form>

        <footer className="flex gap-3 justify-end">
          <button
            onClick={handleClose}
            className="px-4 py-2 border border-brand-purple/30 hover:border-brand-purple text-text-secondary hover:text-text-primary rounded-xl text-sm transition-colors"
          >
            Annuler
          </button>
          <button
            onClick={handleSubmit}
            disabled={isPending}
            aria-busy={isPending}
            className="px-4 py-2 bg-brand-purple hover:bg-brand-purple-dark disabled:opacity-50 text-white font-semibold rounded-xl text-sm transition-colors"
          >
            {isPending ? "Ajout..." : "Ajouter"}
          </button>
        </footer>

      </article>
    </dialog>
  )
}

// Version with no design
// "use client"

// import { useEffect, useRef, useState } from "react"
// import { addGame } from "../actions/user-gamesActions"

// type AddGameModalProps = {
//     gameId: number,
//     gameName: string,
//     //apparement le on close ici c'est pour dire à typescript que le onClose ne retournera rien , ça lui dit comment se fermer , vu que c'est pas ici qu'on le ferme mais plutot dans la page parent
//     onClose: () => void
// }

// export default function AddGameModal({ gameId, gameName, onClose}: AddGameModalProps){
//     const [progress, setProgress] = useState(0)
//     const [playedTime, setPlayedTime]= useState(0)
//     const [scale, setScale] = useState(0)
//     const [isPending, setIsPending] = useState(false)
//     const dialogRef = useRef<HTMLDialogElement>(null)
//     const [errors, setErrors] = useState<{
//         progress?: string[]
//         playedTime?: string[]
//         scale?: string[]
//     }>({})

//     // Ouvre la modale dès que le composant est monté
//     useEffect(() => {
//         dialogRef.current?.showModal()
//     }, [])

//     // Gère la fermeture avec la touche Échap (natif sur dialog)
//     const handleClose = () => {
//         dialogRef.current?.close()
//         onClose()
//     }

//     // Ferme si on clique sur le backdrop
//     const handleBackdropClick = (e: React.MouseEvent<HTMLDialogElement>) => {
//         if (e.target === dialogRef.current) handleClose()
//     }

//     const handleSubmit = async () => {
//         setIsPending(true)
//         const result = await addGame(gameId, progress, playedTime, scale)
//         setIsPending(false)
        
//         if(result.errors){
//             setErrors(result.errors)
//             return // on ne ferme pas le modal si y'a une erreur
//         }

//         handleClose()
//     }

//     return (
//         <dialog
//             ref= {dialogRef}
//             onCancel={handleClose}
//             onClick={handleBackdropClick}
//             className="rounded-2xl p-6 w-80 shadow-xl backdrop:bg-black/50"
//         >
//             <article className="flex flex-col gap-4">
//                 <header>
//                     <h2 className="text-lg font-bold">Ajouter {gameName}</h2>
//                 </header>
//                 <form className="flex flex-col gap-4">
//                     <div className="flex flex-col gap-1">
//                         <label htmlFor="progress">Progression (%)</label>
//                         {errors.progress && (
//                             <p className="text-red-500 text-sm">{errors.progress[0]}</p>
//                         )}
//                         <input 
//                             id="progress"
//                             type="number"
//                             min={0}
//                             max={100}
//                             value={progress}
//                             onChange={(e) => setProgress(Number(e.target.value))}
//                             className="border rounded p-2"
//                             placeholder="0"
//                              />
//                     </div>

//                     <div className="flex flex-col gap-1">
//                         <label htmlFor="playedTime">Temps de jeu (heures)</label>
//                         {errors.playedTime && (
//                             <p className="text-red-500 text-sm">{errors.playedTime[0]}</p>
//                         )}
//                         <input
//                             id="playedTime"
//                             type="number"
//                             min={0}
//                             value={playedTime}
//                             onChange={(e) => setPlayedTime(Number(e.target.value))}
//                             className="border rounded p-2"
//                             placeholder="0"
//                         />
//                     </div>

//                     <div className="flex flex-col gap-1">
//                         <label htmlFor="scale">Note (/10)</label>
//                         {errors.scale && (
//                             <p className="text-red-500 text-sm">{errors.scale[0]}</p>
//                         )}
//                         <input
//                             id="scale"
//                             type="number"
//                             min={0}
//                             max={10}
//                             // value={scale ?? ""}
//                             onChange={(e) => setScale(Number(e.target.value))}
//                             className="border rounded p-2"
//                             placeholder="Optionnel"
//                         />
//                     </div>
//                 </form>

//                 <footer className="flex gap-2 justify-end">
//                     <button onClick={handleClose} className="px-4 py-2 border rounded-xl">
//                         Annuler
//                     </button>

//                     <button onClick={handleSubmit} disabled={isPending} className="px-4 py-2 bg-green-500 text-white rounded-xl disabled:opacity-50">
//                         {isPending ? "Ajout..." : "Ajouter"}
//                     </button>
//                 </footer>
//             </article>
//         </dialog>
//     )
// }