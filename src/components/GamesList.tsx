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
    gamesList : Game[]
    userGameId: number[]
}

export default function GamesList({gamesList, userGameId} : GamesListProps){
    const [search, setSearch] = useState("")

    const filteredGames = gamesList.filter( game => game.name.toLowerCase().includes(search.trim().toLowerCase()))

    return(
        <>
            <section>
                <p>Recherchez les jeux auxquels vous avez joué ou que vous jouez actuellement afin de les ajouter dans votre bibliothèque</p>
                <input type="text" placeholder="Rechercher" value={search} onChange={(e) => setSearch(e.target.value)}
                />
            </section>

            <section>
                <p>Vous voulez jouer un nouveau jeu mais vous ne savez pas lequel ? Cliquez sur le bouton pour avoir des suggestions selon vos critères ! </p>
                <a href="https://find-your-game-front.vercel.app" className="text-purple-400" target="_blank">Find Your Game</a>
            </section>

            <section>
                {filteredGames.map((game) => (
                <article key={game.idGame}>
                    <Link href={`/search-game/${encodeURIComponent(game.name)}`}>
                    <img src={`${game.imageUrl}`} alt={game.name} />
                    <h2>{game.name}</h2>
                    </Link>
                    <GameButtons
                    gameId={game.idGame}
                    gameName={game.name}
                    isAdded={userGameId.includes(game.idGame)}
                    />
                </article>
                ))}
            </section>
        </>
    )
}