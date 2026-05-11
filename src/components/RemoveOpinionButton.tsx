"use client"

import { useState } from "react"
import RemoveOpinionModal from "./RemoveOpinionModal"

export default function RemoveOpinionButton({opinionId} : {opinionId: number}){
    const [showRemoveModal, setShowRemoveModal] = useState(false)

    return(
        <>
        <button onClick={() => setShowRemoveModal(true)} className="p-2 bg-red-500 border-2 border-white rounded-2xl">x</button>

        {showRemoveModal &&(
            <RemoveOpinionModal opinionId={opinionId} onClose={() => setShowRemoveModal(false)}/>
        )}
        </>
    )
}