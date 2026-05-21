"use client"
import { useState } from "react"
import RemoveCommentModal from "./RemoveCommentModal"

export default function RemoveCommentButton({ commentId }: { commentId: number }) {
  const [showRemoveModal, setShowRemoveModal] = useState(false)

  return (
    <>
      <button
        onClick={() => setShowRemoveModal(true)}
        aria-label="Supprimer ce commentaire"
        className="text-brand-cyan hover:text-error transition-colors text-xs px-2 py-1 rounded-lg hover:bg-error/10"
      >
        ✕
      </button>
      {showRemoveModal && (
        <RemoveCommentModal
          commentId={commentId}
          onClose={() => setShowRemoveModal(false)}
        />
      )}
    </>
  )
}

//Version with no design
// "use client"

// import { useState } from "react"
// import RemoveCommentModal from "./RemoveCommentModal"

// export default function RemoveCommentButton({commentId} : {commentId : number}){
//     const [showRemoveModal, setShowRemoveModal] = useState(false)

//     return(
//         <>
//         <button onClick={() => setShowRemoveModal(true)} className="p-2 bg-red-500 border-2 border-white rounded-2xl">x</button>

//         {showRemoveModal && (
//             <RemoveCommentModal commentId={commentId} onClose={() => setShowRemoveModal(false)}/>
//         )}
//         </>
//     )
// }