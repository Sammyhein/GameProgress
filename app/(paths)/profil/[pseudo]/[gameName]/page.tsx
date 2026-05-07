"use server"

import { auth } from "@/auth";
import Header from "@/src/components/Header"
import { db } from "@/src/data/drizzle";
import { userGames } from "@/src/data/schema";
import { headers } from "next/headers";
import { notFound } from "next/navigation";

export default async function Journal({params}: {params: Promise<{gameName : string}>}){

    const { gameName } = await params
    //Parce que sur l'url c'est codé le nom, donc on le décode pour récupérer le véritable nom
    const decodeName = decodeURIComponent(gameName)

    const session = await auth.api.getSession({ headers: await headers() });

    // On trouve le jeu par son nom
    const game = await db.query.games.findFirst({
        where:(games, { eq }) => eq(games.name, decodeName)
    })

    if(!game) return notFound()

    // on récupère le jeu par rapport au user avec toutes les infos
    const [gameJournal] = await db.query.userGames.findMany({
        with: {
            game: true,
            comments: true,
            opinions: true
        },
        where: (userGames, { eq , and}) => 
            and(
                eq(userGames.userId, session!.user.id),
                eq(userGames.gameId, game.idGame)
            )
    })
    console.log(gameJournal)



    return(
        <>
        <Header />
        <main>
            <section>
                <img src={`${gameJournal.game.imageUrl}`} alt={`${gameJournal.game.name}`} />
                <h1>{gameJournal.game.name}</h1>

                <div>
                    <button>Modifier</button>
                    <button>Supprimer</button>
                </div>

                <div>
                    <section>
                        <p>Progression du jeu</p>
                        <p>{gameJournal.progress}</p>
                    </section>
                </div>

                <div>
                    <section>
                        <p>Joué(s)</p>
                        <p>{gameJournal.playedTime}h</p>
                    </section>
                </div>

                {gameJournal.scale ? (<div>
                    <section>
                        <p>Note</p>
                        <p>{gameJournal.scale}</p>
                    </section>
                </div>) : (<p>Non noté</p>)}

            </section>
        </main>
        </>
    )
}