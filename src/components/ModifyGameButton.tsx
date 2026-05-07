"use client"

import { useState } from "react"
import ModifyGameModal from "./ModifyGameModal"

type ModifyGameButtonProps = {
    gameId: number
    gameName: string
    actualProgress: number
    actualPlayedTime: number
    actualScale: number | null
}

export default function ModifyGameButton({gameId, gameName, actualProgress, actualPlayedTime, actualScale}: ModifyGameButtonProps){
    const [showModal, setShowModal] = useState(false)

    return(
        <>
            <button onClick={() => setShowModal(true)} className="px-4 py-2 bg-blue-500 text-white rounded-2xl">Modifier</button>

            { showModal && (
                <ModifyGameModal gameId={gameId} gameName={gameName} actualProgress={actualProgress} actualPlayedTime={actualPlayedTime} actualScale={actualScale} onClose={() => setShowModal(false)}/>
            )}
        </>
    )
}