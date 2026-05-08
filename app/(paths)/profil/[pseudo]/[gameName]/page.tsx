"use server"

import { auth } from "@/auth";
import Header from "@/src/components/Header"
import JournalForm from "@/src/components/JournalForm";
import ModifyGameButton from "@/src/components/ModifyGameButton";
import { RemoveGameButtonJournal } from "@/src/components/RemoveGameButton";
import { db } from "@/src/data/drizzle";
import { userGames } from "@/src/data/schema";
import { headers } from "next/headers";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function Journal({params}: {params: Promise<{gameName : string}>}){

    const { gameName } = await params
    //Parce que sur l'url c'est codé le nom, donc on le décode pour récupérer le véritable nom
    const decodeName = decodeURIComponent(gameName)

    const session = await auth.api.getSession({ headers: await headers() });

    const pseudo = session?.user.pseudo as string

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
                    <ModifyGameButton gameId={gameJournal.gameId} gameName={gameJournal.game.name} actualProgress={gameJournal.progress} actualPlayedTime={gameJournal.playedTime} actualScale={gameJournal.scale}/>
                    
                    <RemoveGameButtonJournal gameId={gameJournal.gameId} gameName={gameJournal.game.name} pseudo={pseudo}/>
                    
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

            <section>
                <h2>Journal de Progression</h2>
                {}
                {/* <form>
                    <input type="text" placeholder="Nouveau commentaire"/>
                    <button>Ajouter</button>
                </form> */}
                <JournalForm gameId={game.idGame}/>
            </section>

            <section>
                <article>
                    <h3>Ce que j'aime dans ce jeu</h3>
                    {}
                    <div>
                        <input type="text" placeholder="Nouvel avis"/>
                        <button>Ajouter</button>
                    </div>
                </article>

                <article>
                    <h3>Ce que je n'aime pas dans ce jeu</h3>
                    {}
                    <div>
                        <input type="text" placeholder="Nouvel avis"/>
                        <button>Ajouter</button>
                    </div>
                </article>
            </section>


        </main>
        </>
    )
}