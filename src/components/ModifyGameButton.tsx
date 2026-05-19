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

export default function ModifyGameButton({
  gameId,
  gameName,
  actualProgress,
  actualPlayedTime,
  actualScale
}: ModifyGameButtonProps) {
  const [showModal, setShowModal] = useState(false)

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        aria-label={`Modifier ma progression sur ${gameName}`}
        className="flex items-center gap-2 px-4 py-2 bg-brand-purple/20 hover:bg-brand-purple/30 border border-brand-purple/40 hover:border-brand-purple text-brand-purple font-semibold rounded-xl text-sm transition-colors"
      >
        <span aria-hidden="true">✏️</span>
        Modifier
      </button>

      {showModal && (
        <ModifyGameModal
          gameId={gameId}
          gameName={gameName}
          actualProgress={actualProgress}
          actualPlayedTime={actualPlayedTime}
          actualScale={actualScale}
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  )
}


//Version with no design
// "use client"

// import { useState } from "react"
// import ModifyGameModal from "./ModifyGameModal"

// type ModifyGameButtonProps = {
//     gameId: number
//     gameName: string
//     actualProgress: number
//     actualPlayedTime: number
//     actualScale: number | null
// }

// export default function ModifyGameButton({gameId, gameName, actualProgress, actualPlayedTime, actualScale}: ModifyGameButtonProps){
//     const [showModal, setShowModal] = useState(false)

//     return(
//         <>
//             <button onClick={() => setShowModal(true)} className="px-4 py-2 bg-blue-500 text-white rounded-2xl">Modifier</button>

//             { showModal && (
//                 <ModifyGameModal gameId={gameId} gameName={gameName} actualProgress={actualProgress} actualPlayedTime={actualPlayedTime} actualScale={actualScale} onClose={() => setShowModal(false)}/>
//             )}
//         </>
//     )
// }