"use client"
import { useState } from "react"
import AddGameModal from "./AddGameModal"
import RemoveGameModal from "./RemoveGameModal"

export default function GameButtons({ gameId, gameName, isAdded, add, remove }: {
  gameId: number
  gameName: string
  isAdded: boolean
  add: string
  remove: string
}) {
  const [showAddModal, setShowAddModal] = useState(false)
  const [showRemoveModal, setShowRemoveModal] = useState(false)

  return (
    <>
      {!isAdded ? (
        <button
          onClick={() => setShowAddModal(true)}
          aria-label={`Ajouter ${gameName} à ma bibliothèque`}
          className="w-8 h-8 bg-brand-cyan hover:bg-brand-cyan/80 hover:text-white text-brand-purple-dark font-bold rounded-xl flex items-center justify-center text-lg transition-colors shadow-md shadow-brand-cyan-dark "
        >
          {add}
        </button>
      ) : (
        <button
          onClick={() => setShowRemoveModal(true)}
          aria-label={`Retirer ${gameName} de ma bibliothèque`}
          className="w-8 h-8 bg-brand-purple hover:bg-brand-purple-dark/80 hover:text-white text-brand-cyan font-bold rounded-xl flex items-center justify-center text-lg transition-colors shadow-md shadow-brand-purple-dark "
        >
          {remove}
        </button>
      )}

      {showAddModal && (
        <AddGameModal
          gameId={gameId}
          gameName={gameName}
          onClose={() => setShowAddModal(false)}
        />
      )}

      {showRemoveModal && (
        <RemoveGameModal
          gameId={gameId}
          gameName={gameName}
          onClose={() => setShowRemoveModal(false)}
        />
      )}
    </>
  )
}

//Version with no design
// "use client"

// import { useState } from "react"
// import AddGameModal from "./AddGameModal"
// import RemoveGameModal from "./RemoveGameModal"


// type GameButtonsProps = {
//     gameId: number
//     gameName: string
//     isAdded: boolean
// }

// export default function GameButtons({ gameId, gameName, isAdded} : GameButtonsProps){
//     const [showAddModal, setShowAddModal]= useState(false)
//     const [showRemoveModal, setShowRemoveModal] = useState(false)

//     return (
//         <>
//             {!isAdded ? (
//                 <button onClick={() => setShowAddModal(true)} className="p-2 bg-green-500 border-2 border-white rounded-2xl">
//                     +
//                 </button>
//             ) : (
//                 <button onClick={() => setShowRemoveModal(true)} className="p-2 bg-red-500 border-2 border-white rounded-2xl">
//                     -
//                 </button>
//             )}

//             {showAddModal && (
//                 <AddGameModal gameId={gameId} gameName={gameName} onClose={() => setShowAddModal(false)}/>
//             )}

//             {showRemoveModal && (
//                 <RemoveGameModal gameId={gameId} gameName={gameName} onClose={() => setShowRemoveModal(false)}/>
//             )}
//         </>
//     )
// }

