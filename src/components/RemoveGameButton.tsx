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

export default function RemoveGameButton({gameId, gameName}: RemoveGameProps){
    const [showRemoveModal, setShowRemoveModal] = useState(false)
    
    return(
        <>
        <button onClick={() => setShowRemoveModal(true)} className="p-2 bg-red-500 border-2 border-white rounded-2xl">-</button>

        {showRemoveModal &&(
            <RemoveGameModal gameId={gameId} gameName={gameName}
            onClose={() => setShowRemoveModal(false)}/>
        )}
        </>
    )
}

export function RemoveGameButtonJournal({gameId, gameName, pseudo}: RemoveGameJournalProps){
    const [showRemoveModal, setShowRemoveModal] = useState(false)
    
    return(
        <>
        <button onClick={() => setShowRemoveModal(true)} className="p-2 bg-red-500 border-2 border-white rounded-2xl">Supprimer</button>

        {showRemoveModal &&(
            <RemoveGameModalJournal gameId={gameId} gameName={gameName}
            onClose={() => setShowRemoveModal(false)} pseudo={pseudo}/>
        )}
        </>
    )
}