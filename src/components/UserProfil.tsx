"use client"

import { useState } from "react";
import { UserGameWithGame } from "../interfaces/types";
import RemoveGameButton from "./RemoveGameButton";

type UserProfilProps = {
    userGamesList: UserGameWithGame[]
}

export default function UserProfil({userGamesList}: UserProfilProps ){
    const [search, setSearch] = useState("")

    const filteredGames = userGamesList.filter( entry => entry.game.name.toLowerCase().includes(search.trim().toLowerCase()))

    return(
        <>
        <input type="text" placeholder="Rechercher" value={search} onChange={(e)=> setSearch(e.target.value)}/>

        <section>
            {filteredGames.map((entry) =>(
                <article key={entry.game.idGame}>
                    <img src={`${entry.game.imageUrl}`} alt={`${entry.game.name}`} />
                    <h2>{entry.game.name}</h2>

                    <section>
                        <p>Progression du jeu </p>
                        <p>{entry.progress}%</p>
                    </section>

                    <section>
                        <p>Temps de jeu</p>
                        <p>{entry.playedTime}</p>
                    </section>

                    <section>
                        {entry.scale && <section>
                            <p>Note</p>
                            <p>{entry.scale}/10</p>
                        </section>}
                    </section>
                    
                    <RemoveGameButton gameId={entry.gameId} gameName={entry.game.name}/>
                </article>
            ))}
        </section>

        </>
    )
}