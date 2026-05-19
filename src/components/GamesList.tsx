"use client"
import { useState } from "react"
import GameButtons from "./GameButtons"
import Link from "next/link"

export type Game = {
  idGame: number
  name: string
  imageUrl: string | null
}

export type GamesListProps = {
  gamesList: Game[]
  userGameId: number[]
}

export default function GamesList({ gamesList, userGameId }: GamesListProps) {
  const [search, setSearch] = useState("")

  const filteredGames = gamesList.filter(game =>
    game.name.toLowerCase().includes(search.trim().toLowerCase())
  )

  return (
    <div className="flex flex-col gap-8 px-4 md:px-8 py-8 max-w-7xl mx-auto w-full">

      {/* Intro + recherche */}
      <section aria-labelledby="search-title" className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <h1 id="search-title" className="text-2xl md:text-3xl font-bold text-text-primary">
            Rechercher un jeu
          </h1>
          <p className="text-text-secondary text-sm md:text-base">
            Recherchez les jeux auxquels vous avez joué ou que vous jouez actuellement
            afin de les ajouter dans votre bibliothèque.
          </p>
        </div>
        <div className="relative">
          <input
            type="search"
            placeholder="Rechercher un jeu..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            aria-label="Rechercher un jeu"
            className="w-full bg-bg-card border border-brand-purple/20 focus:border-brand-purple focus:outline-none text-text-primary placeholder:text-text-muted rounded-xl px-5 py-3 text-sm md:text-base transition-colors"
          />
        </div>
      </section>

      {/* FindYourGame */}
      <section aria-labelledby="findyourgame-title" className="bg-bg-card border border-brand-purple/20 rounded-2xl p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex flex-col gap-1">
          <h2 id="findyourgame-title" className="text-text-primary font-semibold">
            Tu ne sais pas quoi jouer ?
          </h2>
          <p className="text-text-secondary text-sm">
            Obtiens des suggestions personnalisées selon tes critères !
          </p>
        </div>
        <a
          href="https://find-your-game-front.vercel.app"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-brand-purple hover:bg-brand-purple-dark text-white px-5 py-2 rounded-xl font-medium transition-colors text-sm whitespace-nowrap"
          aria-label="Find Your Game - Ouvre dans un nouvel onglet"
        >
          Find Your Game ↗
        </a>
      </section>

      {/* Liste des jeux */}
      <section aria-labelledby="games-title">
        <h2 id="games-title" className="sr-only">Liste des jeux</h2>

        {filteredGames.length === 0 ? (
          <p className="text-text-secondary text-center py-12">
            Aucun jeu ne correspond à ta recherche.
          </p>
        ) : (
          <ul className="grid grid-cols sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 list-none">
            {filteredGames.map((game) => (
              <li key={game.idGame}>
                <article className="bg-bg-card border border-brand-purple/20 rounded-2xl overflow-hidden flex flex-col hover:border-brand-purple/50 transition-colors">
  
                    {/* Image + bouton superposé */}
                    <div className="relative">
                        <Link
                        href={`/search-game/${encodeURIComponent(game.name)}`}
                        aria-label={`Voir la description de ${game.name}`}
                        >
                        <div className="aspect-video overflow-hidden">
                            <img
                            src={`${game.imageUrl}`}
                            alt={game.name}
                            className="w-full h-full object-cover"
                            />
                        </div>
                        </Link>

                        {/* Bouton positionné en haut à droite */}
                        <div className="absolute top-2 right-2">
                        <GameButtons
                            gameId={game.idGame}
                            gameName={game.name}
                            isAdded={userGameId.includes(game.idGame)}
                        />
                        </div>
                    </div>

                    {/* Titre en dessous */}
                    <div className="px-3 py-3">
                        <h2 className="text-text-primary font-medium text-sm line-clamp-2 uppercase">
                        {game.name}
                        </h2>
                    </div>

                </article>
              </li>
            ))}
          </ul>
        )}
      </section>

    </div>
  )
}


//Version with no design
// "use client"

// import { useState } from "react"
// import GameButtons from "./GameButtons"
// import Link from "next/link"

// export type Game = {
//     idGame: number
//     name: string
//     imageUrl: string | null
// }

// export type GamesListProps = {
//     gamesList : Game[]
//     userGameId: number[]
// }

// export default function GamesList({gamesList, userGameId} : GamesListProps){
//     const [search, setSearch] = useState("")

//     const filteredGames = gamesList.filter( game => game.name.toLowerCase().includes(search.trim().toLowerCase()))

//     return(
//         <>
//             <section>
//                 <p>Recherchez les jeux auxquels vous avez joué ou que vous jouez actuellement afin de les ajouter dans votre bibliothèque</p>
//                 <input type="text" placeholder="Rechercher" value={search} onChange={(e) => setSearch(e.target.value)}
//                 />
//             </section>

//             <section>
//                 <p>Vous voulez jouer un nouveau jeu mais vous ne savez pas lequel ? Cliquez sur le bouton pour avoir des suggestions selon vos critères ! </p>
//                 <a href="https://find-your-game-front.vercel.app" className="text-purple-400" target="_blank">Find Your Game</a>
//             </section>

//             <section>
//                 {filteredGames.map((game) => (
//                 <article key={game.idGame}>
//                     <Link href={`/search-game/${encodeURIComponent(game.name)}`}>
//                     <img src={`${game.imageUrl}`} alt={game.name} />
//                     <h2>{game.name}</h2>
//                     </Link>
//                     <GameButtons
//                     gameId={game.idGame}
//                     gameName={game.name}
//                     isAdded={userGameId.includes(game.idGame)}
//                     />
//                 </article>
//                 ))}
//             </section>
//         </>
//     )
// }