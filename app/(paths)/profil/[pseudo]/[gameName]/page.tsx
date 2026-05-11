"use server"

import { auth } from "@/auth";
import Header from "@/src/components/Header"
import AddCommentForm from "@/src/components/AddCommentForm";
import ModifyGameButton from "@/src/components/ModifyGameButton";
import RemoveCommentButton from "@/src/components/RemoveCommentButton";
import { RemoveGameButtonJournal } from "@/src/components/RemoveGameButton";
import { db } from "@/src/data/drizzle";
import { headers } from "next/headers";
import { notFound } from "next/navigation";
import { AddNegativeOpinionForm, AddPositiveOpinionForm } from "@/src/components/AddOpinionForms";
import RemoveOpinionButton from "@/src/components/RemoveOpinionButton";

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
    const gameJournal = await db.query.userGames.findFirst({
        with: {
            game: true,
            comments: {
                orderBy: (comments, { desc }) => [desc(comments.createdDate)]
            },
            opinions: true
        },
        where: (userGames, { eq , and}) => 
            and(
                eq(userGames.userId, session!.user.id),
                eq(userGames.gameId, game.idGame)
            )
    })
    //console.log(gameJournal)

    if(!gameJournal) return notFound()

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
                {gameJournal.comments.map((journal) => (
                    <div key={journal.id}>
                        <img  alt="icon" />
                        {/* <button>x</button> */}
                        <RemoveCommentButton commentId={journal.id}/>
                        <p>
                            À
                            <span>{` ${new Date(journal.createdDate).toLocaleTimeString("fr-FR", {
                                hour: "2-digit",
                                minute: "2-digit"
                                })} `}
                            </span>
                            Le
                            <span>{` ${new Date(journal.createdDate).toLocaleDateString("fr-FR")}`}</span>
                        </p>
                        <p>{journal.comment}</p>
                    </div>
                ))}
                <AddCommentForm gameId={game.idGame}/>
            </section>

            <section>
                <article>
                    <h3>Ce que j'aime dans ce jeu</h3>
                    {gameJournal.opinions.map((journal) => {
                        if(journal.isPositive){
                            return(
                                <div key={journal.id}>
                                    <p>{journal.opinion}</p>
                                    <RemoveOpinionButton opinionId={journal.id}/>
                                </div>
                            )
                        }
                    })}
                    <AddPositiveOpinionForm gameId={game.idGame}/>
                </article>

                <article>
                    <h3>Ce que je n'aime pas dans ce jeu</h3>
                    {gameJournal.opinions.map((journal) => {
                        if(!journal.isPositive){
                            return(
                                <div key={journal.id}>
                                    <p>{journal.opinion}</p>
                                    <RemoveOpinionButton opinionId={journal.id}/>
                                </div>
                            )
                        }
                    })}
                    <AddNegativeOpinionForm gameId={game.idGame}/>
                </article>
            </section>

        </main>
        </>
    )
}