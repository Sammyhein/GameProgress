"use client"

import { useState } from "react"
import AddGameModal from "./AddGameModal"
import RemoveGameModal from "./RemoveGameModal"


type GameButtonsProps = {
    gameId: number
    gameName: string
    isAdded: boolean
}

export default function GameButtons({ gameId, gameName, isAdded} : GameButtonsProps){
    const [showAddModal, setShowAddModal]= useState(false)
    const [showRemoveModal, setShowRemoveModal] = useState(false)

    return (
        <>
            {!isAdded ? (
                <button onClick={() => setShowAddModal(true)} className="p-2 bg-green-500 border-2 border-white rounded-2xl">
                    +
                </button>
            ) : (
                <button onClick={() => setShowRemoveModal(true)} className="p-2 bg-red-500 border-2 border-white rounded-2xl">
                    -
                </button>
            )}

            {showAddModal && (
                <AddGameModal gameId={gameId} gameName={gameName} onClose={() => setShowAddModal(false)}/>
            )}

            {showRemoveModal && (
                <RemoveGameModal gameId={gameId} gameName={gameName} onClose={() => setShowRemoveModal(false)}/>
            )}
        </>
    )
}

