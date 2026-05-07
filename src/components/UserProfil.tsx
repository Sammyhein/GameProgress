"use client"

import { useState } from "react";
import { UserGameWithGame } from "../interfaces/types";
import RemoveGameButton from "./RemoveGameButton";
import Link from "next/link";

type UserProfilProps = {
    userGamesList: UserGameWithGame[]
    pseudo: string // pour l'url pour aller ensuite dans le journal
}

export default function UserProfil({userGamesList, pseudo}: UserProfilProps ){

    const [search, setSearch] = useState("")

    const filteredGames = userGamesList.filter( entry => entry.game.name.toLowerCase().includes(search.trim().toLowerCase()))

    

    return(
        <>
        <input type="text" placeholder="Rechercher" value={search} onChange={(e)=> setSearch(e.target.value)}/>

        <section>
            {filteredGames.map((entry) =>(
                <Link href={`/profil/${pseudo}/${encodeURIComponent(entry.game.name)}`} key={entry.game.idGame}>
                <article>
                    
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
                </Link>
            ))}
        </section>

        </>
    )
}