"use server"

import { auth } from "@/auth"
import Header from "@/src/components/Header"
import AddCommentForm from "@/src/components/AddCommentForm"
import ModifyGameButton from "@/src/components/ModifyGameButton"
import RemoveCommentButton from "@/src/components/RemoveCommentButton"
import { db } from "@/src/data/drizzle"
import { headers } from "next/headers"
import { notFound } from "next/navigation"
import { AddNegativeOpinionForm, AddPositiveOpinionForm } from "@/src/components/AddOpinionForms"
import RemoveOpinionButton from "@/src/components/RemoveOpinionButton"
import { RemoveGameButtonJournal } from "@/src/components/RemoveGameButton"
import Footer from "@/src/components/Footer"
import Link from "next/link"
import Image from "next/image"

export default async function Journal({ params }: { params: Promise<{ gameName: string }> }) {
  const { gameName } = await params
  const decodeName = decodeURIComponent(gameName)
  const session = await auth.api.getSession({ headers: await headers() })
  const pseudo = session?.user.pseudo as string

  const game = await db.query.games.findFirst({
    where: (games, { eq }) => eq(games.name, decodeName)
  })

  if (!game) return notFound()

  const gameJournal = await db.query.userGames.findFirst({
    with: {
      game: true,
      comments: {
        orderBy: (comments, { desc }) => [desc(comments.createdDate)]
      },
      opinions: true
    },
    where: (userGames, { eq, and }) =>
      and(
        eq(userGames.userId, session!.user.id),
        eq(userGames.gameId, game.idGame)
      )
  })

  if (!gameJournal) return notFound()

  const positiveOpinions = gameJournal.opinions.filter(o => o.isPositive)
  const negativeOpinions = gameJournal.opinions.filter(o => !o.isPositive)

  return (
    <div className="min-h-screen bg-bg-primary flex flex-col">
      <Header />

      <main className="flex-1 px-4 md:px-8 py-8 max-w-6xl mx-auto w-full flex flex-col gap-8">

        {/* Retour */}
        <nav aria-label="Navigation de retour">
          <Link
            href={`/profil/${pseudo}`}
            className="inline-flex items-center gap-2 text-text-secondary hover:text-brand-cyan transition-colors text-sm"
          >
            ← Retour au profil
          </Link>
        </nav>

        {/* Hero du jeu */}
        <section aria-labelledby="game-title" className="flex flex-col gap-6">

        {/* Grande image en haut */}
        <Link href={`/search-game/${encodeURIComponent(gameJournal.game.name)}`}>
        <div className="relative w-full h-48 md:h-72 rounded-2xl overflow-hidden">
            <Image
            src={`${gameJournal.game.imageUrl}`}
            alt={`Pochette de ${gameJournal.game.name}`}
            fill
            sizes="100vw"
            className="object-cover"
            />
            {/* Overlay gradient en bas pour faire transition avec le fond */}
            <div
            className="absolute inset-0 bg-linear-to-t from-bg-primary via-bg-primary/30 to-transparent"
            aria-hidden="true"
            />
            {/* Titre positionné sur l'image en bas à gauche */}
            <h1
            id="game-title"
            className="absolute bottom-4 left-4 text-2xl md:text-4xl font-bold text-text-primary drop-shadow-lg"
            >
            {gameJournal.game.name}
            </h1>
        </div>
        </Link>

        {/* Stats + actions en dessous */}
        <div className="flex flex-col gap-4">
            <div className="flex flex-wrap gap-3">
            <div className="bg-bg-card border border-brand-purple/20 rounded-xl px-4 py-3 flex flex-col gap-1">
                <p className="text-text-muted text-xs uppercase tracking-wider">Progression</p>
                <p className="text-text-primary font-bold text-lg">{gameJournal.progress}%</p>
                <div className="w-full bg-bg-elevated rounded-full h-1.5 mt-1">
                <div
                    className="bg-brand-cyan h-1.5 rounded-full"
                    style={{ width: `${gameJournal.progress}%` }}
                    role="progressbar"
                    aria-valuenow={gameJournal.progress}
                    aria-valuemin={0}
                    aria-valuemax={100}
                />
                </div>
            </div>

            <div className="bg-bg-card border border-brand-purple/20 rounded-xl px-4 py-3 flex flex-col gap-1">
                <p className="text-text-muted text-xs uppercase tracking-wider">Temps de jeu</p>
                <p className="text-text-primary font-bold text-lg">{gameJournal.playedTime}h</p>
            </div>

            {gameJournal.scale !== null ? (
                <div className="bg-bg-card border border-brand-purple/20 rounded-xl px-4 py-3 flex flex-col gap-1">
                <p className="text-text-muted text-xs uppercase tracking-wider">Note</p>
                <p className="text-brand-cyan font-bold text-lg">⭐ {gameJournal.scale}/10</p>
                </div>
            ) : (
                <div className="bg-bg-card border border-brand-purple/20 rounded-xl px-4 py-3 flex flex-col gap-1">
                <p className="text-text-muted text-xs uppercase tracking-wider">Note</p>
                <p className="text-text-muted text-sm">Non noté</p>
                </div>
            )}
            </div>

            {/* Actions */}
            <div className="flex flex-wrap gap-3">
            <ModifyGameButton
                gameId={gameJournal.gameId}
                gameName={gameJournal.game.name}
                actualProgress={gameJournal.progress}
                actualPlayedTime={gameJournal.playedTime}
                actualScale={gameJournal.scale}
            />
            <RemoveGameButtonJournal
                gameId={gameJournal.gameId}
                gameName={gameJournal.game.name}
                pseudo={pseudo}
            />
            </div>
        </div>

        </section>

        {/* Journal de progression */}
        <section aria-labelledby="journal-title" className="flex flex-col gap-4 border border-brand-purple/20 rounded-2xl p-4 hover:inset-shadow-sm hover:inset-shadow-brand-purple-dark">
          <h2 id="journal-title" className="text-xl font-bold text-text-primary">
            📓 Journal de progression
          </h2>

          {gameJournal.comments.length === 0 && (
            <p className="text-text-muted text-sm">Aucune entrée pour le moment.</p>
          )}

          <ul className="flex flex-col gap-3 list-none overflow-auto scrollbar-thin max-h-125 p-4">
            {gameJournal.comments.map((journal) => (
              <li key={journal.id}>
                <article className="bg-bg-card border border-brand-purple/20 rounded-2xl px-4 py-4 flex flex-col gap-2">
                  <header className="flex items-center justify-between">
                    <time className="text-text-muted text-xs">
                      Le {new Date(journal.createdDate).toLocaleDateString("fr-FR")} à{" "}
                      {new Date(journal.createdDate).toLocaleTimeString("fr-FR", {
                        hour: "2-digit",
                        minute: "2-digit"
                      })}
                    </time>
                    <RemoveCommentButton commentId={journal.id} />
                  </header>
                  <p className="text-text-primary text-sm leading-relaxed max-h-48 scrollbar-thin overflow-auto">
                    {journal.comment}
                  </p>
                </article>
              </li>
            ))}
          </ul>

          <AddCommentForm gameId={game.idGame} />
        </section>

        {/* Opinions */}
        <section aria-labelledby="opinions-title" className="flex flex-col gap-4 border border-brand-purple/20 rounded-2xl p-4 hover:inset-shadow-sm hover:inset-shadow-brand-purple-dark">
          <h2 id="opinions-title" className="text-xl font-bold text-text-primary">
            💬 Avis sur le jeu
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            {/* Points positifs */}
            <article className="bg-bg-card border border-success/20 rounded-2xl p-4 flex flex-col gap-3">
              <h3 className="text-success font-semibold flex items-center gap-2">
                <span aria-hidden="true">👍</span>
                Ce que j'aime
              </h3>

              {positiveOpinions.length === 0 && (
                <p className="text-text-muted text-sm">Aucun point positif ajouté.</p>
              )}

              <ul className="flex flex-col gap-2 list-none">
                {positiveOpinions.map((opinion) => (
                  <li key={opinion.id} className="flex items-start justify-between gap-2 bg-success/5 border border-success/10 rounded-xl px-3 py-2">
                    <p className="text-text-primary text-sm flex-1 overflow-auto">{opinion.opinion}</p>
                    <RemoveOpinionButton opinionId={opinion.id} />
                  </li>
                ))}
              </ul>

              <AddPositiveOpinionForm gameId={game.idGame} />
            </article>

            {/* Points négatifs */}
            <article className="bg-bg-card border border-error/20 rounded-2xl p-4 flex flex-col gap-3">
              <h3 className="text-error font-semibold flex items-center gap-2">
                <span aria-hidden="true">👎</span>
                Ce que je n'aime pas
              </h3>

              {negativeOpinions.length === 0 && (
                <p className="text-text-muted text-sm">Aucun point négatif ajouté.</p>
              )}

              <ul className="flex flex-col gap-2 list-none">
                {negativeOpinions.map((opinion) => (
                  <li key={opinion.id} className="flex items-start justify-between gap-2 bg-error/5 border border-error/10 rounded-xl px-3 py-2">
                    <p className="text-text-primary text-sm flex-1 overflow-auto">{opinion.opinion}</p>
                    <RemoveOpinionButton opinionId={opinion.id} />
                  </li>
                ))}
              </ul>

              <AddNegativeOpinionForm gameId={game.idGame} />
            </article>

          </div>
        </section>

      </main>

      <Footer />
    </div>
  )
}


//Version with no design
// "use server"

// import { auth } from "@/auth";
// import Header from "@/src/components/Header"
// import AddCommentForm from "@/src/components/AddCommentForm";
// import ModifyGameButton from "@/src/components/ModifyGameButton";
// import RemoveCommentButton from "@/src/components/RemoveCommentButton";

// import { db } from "@/src/data/drizzle";
// import { headers } from "next/headers";
// import { notFound } from "next/navigation";
// import { AddNegativeOpinionForm, AddPositiveOpinionForm } from "@/src/components/AddOpinionForms";
// import RemoveOpinionButton from "@/src/components/RemoveOpinionButton";
// import RemoveGameButton from "@/src/components/RemoveGameButton";

// export default async function Journal({params}: {params: Promise<{gameName : string}>}){

//     const { gameName } = await params
//     //Parce que sur l'url c'est codé le nom, donc on le décode pour récupérer le véritable nom
//     const decodeName = decodeURIComponent(gameName)

//     const session = await auth.api.getSession({ headers: await headers() });

//     const pseudo = session?.user.pseudo as string

//     // On trouve le jeu par son nom
//     const game = await db.query.games.findFirst({
//         where:(games, { eq }) => eq(games.name, decodeName)
//     })

//     if(!game) return notFound()

//     // on récupère le jeu par rapport au user avec toutes les infos
//     const gameJournal = await db.query.userGames.findFirst({
//         with: {
//             game: true,
//             comments: {
//                 orderBy: (comments, { desc }) => [desc(comments.createdDate)]
//             },
//             opinions: true
//         },
//         where: (userGames, { eq , and}) => 
//             and(
//                 eq(userGames.userId, session!.user.id),
//                 eq(userGames.gameId, game.idGame)
//             )
//     })
//     //console.log(gameJournal)

//     if(!gameJournal) return notFound()

//     return(
//         <>
//         <Header />
//         <main>
//             <section>
//                 <img src={`${gameJournal.game.imageUrl}`} alt={`${gameJournal.game.name}`} />
//                 <h1>{gameJournal.game.name}</h1>

//                 <div>
//                     <ModifyGameButton gameId={gameJournal.gameId} gameName={gameJournal.game.name} actualProgress={gameJournal.progress} actualPlayedTime={gameJournal.playedTime} actualScale={gameJournal.scale}/>
                    
//                     <RemoveGameButton gameId={gameJournal.gameId} gameName={gameJournal.game.name} />
                    
//                 </div>

//                 <div>
//                     <section>
//                         <p>Progression du jeu</p>
//                         <p>{gameJournal.progress}</p>
//                     </section>
//                 </div>

//                 <div>
//                     <section>
//                         <p>Joué(s)</p>
//                         <p>{gameJournal.playedTime}h</p>
//                     </section>
//                 </div>

//                 {gameJournal.scale ? (<div>
//                     <section>
//                         <p>Note</p>
//                         <p>{gameJournal.scale}</p>
//                     </section>
//                 </div>) : (<p>Non noté</p>)}

//             </section>

//             <section>
//                 <h2>Journal de Progression</h2>
//                 {gameJournal.comments.map((journal) => (
//                     <div key={journal.id}>
//                         <img  alt="icon" />
//                         {/* <button>x</button> */}
//                         <RemoveCommentButton commentId={journal.id}/>
//                         <p>
//                             À
//                             <span>{` ${new Date(journal.createdDate).toLocaleTimeString("fr-FR", {
//                                 hour: "2-digit",
//                                 minute: "2-digit"
//                                 })} `}
//                             </span>
//                             Le
//                             <span>{` ${new Date(journal.createdDate).toLocaleDateString("fr-FR")}`}</span>
//                         </p>
//                         <p>{journal.comment}</p>
//                     </div>
//                 ))}
//                 <AddCommentForm gameId={game.idGame}/>
//             </section>

//             <section>
//                 <article>
//                     <h3>Ce que j'aime dans ce jeu</h3>
//                     {gameJournal.opinions.map((journal) => {
//                         if(journal.isPositive){
//                             return(
//                                 <div key={journal.id}>
//                                     <p>{journal.opinion}</p>
//                                     <RemoveOpinionButton opinionId={journal.id}/>
//                                 </div>
//                             )
//                         }
//                     })}
//                     <AddPositiveOpinionForm gameId={game.idGame}/>
//                 </article>

//                 <article>
//                     <h3>Ce que je n'aime pas dans ce jeu</h3>
//                     {gameJournal.opinions.map((journal) => {
//                         if(!journal.isPositive){
//                             return(
//                                 <div key={journal.id}>
//                                     <p>{journal.opinion}</p>
//                                     <RemoveOpinionButton opinionId={journal.id}/>
//                                 </div>
//                             )
//                         }
//                     })}
//                     <AddNegativeOpinionForm gameId={game.idGame}/>
//                 </article>
//             </section>

//         </main>
//         </>
//     )
// }