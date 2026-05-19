"use client"
import { useState } from "react"
import { UserGameWithGame } from "../interfaces/types"
import RemoveGameButton from "./RemoveGameButton"
import Link from "next/link"

type UserProfilProps = {
  userGamesList: UserGameWithGame[]
  pseudo: string
}

export default function UserProfil({ userGamesList, pseudo }: UserProfilProps) {
  const [search, setSearch] = useState("")

  const filteredGames = userGamesList.filter(entry =>
    entry.game.name.toLowerCase().includes(search.trim().toLowerCase())
  )

  return (
    <div className="flex flex-col gap-6">

      {/* Recherche */}
      <div className="relative">
        <input
          type="search"
          placeholder="Rechercher dans ma bibliothèque..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          aria-label="Rechercher un jeu dans ma bibliothèque"
          className="w-full bg-bg-card border border-brand-purple/20 focus:border-brand-purple focus:outline-none text-text-primary placeholder:text-text-muted rounded-xl px-5 py-3 text-sm transition-colors"
        />
      </div>

      {/* Message si vide */}
      {filteredGames.length === 0 && (
        <p className="text-text-secondary text-center py-12">
          {userGamesList.length === 0
            ? "Ta bibliothèque est vide. Ajoute des jeux depuis la recherche !"
            : "Aucun jeu ne correspond à ta recherche."}
        </p>
      )}

      {/* Grille de jeux */}
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 list-none">
        {filteredGames.map((entry) => (
          <li key={entry.game.idGame}>
            <article className="bg-bg-card border border-brand-purple/20 hover:border-brand-purple/50 rounded-2xl overflow-hidden flex flex-col transition-colors">

              {/* Image + lien */}
              <Link
                href={`/profil/${pseudo}/${encodeURIComponent(entry.game.name)}`}
                aria-label={`Voir le journal de ${entry.game.name}`}
                className="relative"
              >
                <div className="aspect-square overflow-hidden">
                  <img
                    src={`${entry.game.imageUrl}`}
                    alt={`Pochette de ${entry.game.name}`}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Overlay progression */}
                <div className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-bg-primary/90 to-transparent px-3 py-2">
                  <div className="w-full bg-bg-elevated rounded-full h-1.5">
                    <div
                      className="bg-brand-cyan h-1.5 rounded-full transition-all"
                      style={{ width: `${entry.progress}%` }}
                      role="progressbar"
                      aria-valuenow={entry.progress}
                      aria-valuemin={0}
                      aria-valuemax={100}
                      aria-label={`Progression : ${entry.progress}%`}
                    />
                  </div>
                </div>
              </Link>

              {/* Infos */}
              <div className="px-3 py-3 flex flex-col gap-2">
                <h2 className="text-text-primary font-semibold text-sm line-clamp-1">
                  {entry.game.name}
                </h2>

                <div className="flex items-center justify-between text-xs text-text-secondary">
                  <span>{entry.progress}%</span>
                  <span>{entry.playedTime}h jouées</span>
                  {entry.scale !== null && (
                    <span className="text-brand-cyan font-semibold">
                      ⭐ {entry.scale}/10
                    </span>
                  )}
                </div>
                
                <div className="flex flex-col gap-2">
                    <div className="flex gap-2">
                        <Link
                        href={`/search-game/${encodeURIComponent(entry.game.name)}`}
                        className="flex-1 py-2 border border-brand-purple/30 hover:border-brand-purple hover:bg-brand-purple/10 text-brand-purple text-xs font-semibold rounded-xl transition-colors text-center"
                        >
                        Description
                        </Link>
                        <Link
                        href={`/profil/${pseudo}/${encodeURIComponent(entry.game.name)}`}
                        className="flex-1 py-2 border border-brand-cyan/30 hover:border-brand-cyan hover:bg-brand-cyan/10 text-brand-cyan text-xs font-semibold rounded-xl transition-colors text-center"
                        >
                        Journal
                        </Link>
                    </div>
                    <RemoveGameButton
                        gameId={entry.gameId}
                        gameName={entry.game.name}
                    />
                </div>
              </div>

            </article>
          </li>
        ))}
      </ul>

    </div>
  )
}

//Version with no Design
// "use client"

// import { useState } from "react";
// import { UserGameWithGame } from "../interfaces/types";
// import RemoveGameButton from "./RemoveGameButton";
// import Link from "next/link";

// type UserProfilProps = {
//     userGamesList: UserGameWithGame[]
//     pseudo: string // pour l'url pour aller ensuite dans le journal
// }

// export default function UserProfil({userGamesList, pseudo}: UserProfilProps ){

//     const [search, setSearch] = useState("")

//     const filteredGames = userGamesList.filter( entry => entry.game.name.toLowerCase().includes(search.trim().toLowerCase()))

    

//     return(
//         <>
//         <input type="text" placeholder="Rechercher" value={search} onChange={(e)=> setSearch(e.target.value)}/>

//         <section>
//             {filteredGames.map((entry) =>(
                
//                 <article key={entry.game.idGame}>
//                     <Link href={`/profil/${pseudo}/${encodeURIComponent(entry.game.name)}`}>
//                     <img src={`${entry.game.imageUrl}`} alt={`${entry.game.name}`} />
//                     <h2>{entry.game.name}</h2>

//                     <section>
//                         <p>Progression du jeu </p>
//                         <p>{entry.progress}%</p>
//                     </section>

//                     <section>
//                         <p>Temps de jeu</p>
//                         <p>{entry.playedTime}h</p>
//                     </section>

//                     <section>
//                         {entry.scale !== null && <section>
//                             <p>Note</p>
//                             <p>{entry.scale}/10</p>
//                         </section>}
//                     </section>
//                     </Link>
                    
//                     <RemoveGameButton gameId={entry.gameId} gameName={entry.game.name}/>
//                 </article>

//             ))}
//         </section>

//         </>
//     )
// }