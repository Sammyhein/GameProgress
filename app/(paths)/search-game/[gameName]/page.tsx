import { auth } from "@/auth"
import Footer from "@/src/components/Footer"
import GameButtons from "@/src/components/GameButtons"
import Header from "@/src/components/Header"
import { db } from "@/src/data/drizzle"
import { headers } from "next/headers"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"

export default async function GameDescription({ params }: { params: Promise<{ gameName: string }> }) {
  const { gameName } = await params
  const decodeName = decodeURIComponent(gameName)

  // Récupère la session et les jeux du user
  const session = await auth.api.getSession({ headers: await headers() })

  const game = await db.query.games.findFirst({
    with: {
      gamesCategories: { with: { category: true } },
      gamesPlatforms: { with: { platform: true } }
    },
    where: (game, { eq }) => eq(game.name, decodeName)
  })

  if (!game) return notFound()

  // Récupère les jeux du user pour savoir si ce jeu est déjà ajouté
  const userGamesList = await db.query.userGames.findMany({
    where: (userGames, { eq }) => eq(userGames.userId, session!.user.id)
  })

  const userGameId = userGamesList.map(ug => ug.gameId)

  return (
    <div className="min-h-screen bg-bg-primary flex flex-col">
      <Header />

      <main className="flex-1 px-4 md:px-8 py-8 max-w-6xl mx-auto w-full">

        {/* Bouton retour */}
        <nav aria-label="Navigation de retour" className="mb-6">
          <Link
            href="/search-game"
            className="inline-flex items-center gap-2 text-text-secondary hover:text-brand-cyan transition-colors text-sm"
          >
            ← Retour à la recherche
          </Link>
        </nav>

          <section className="flex flex-wrap gap-3 items-center mb-2">
          <p className="text-text-secondary text-xs font-semibold uppercase tracking-wider">
            Ajouter / Supprimer de la bibliothèque : 
          </p>
          <GameButtons
            gameId={game.idGame}
            gameName={game.name}
            isAdded={userGameId.includes(game.idGame)}
            add="+"
            remove="X"/>
          </section>
        
          {/* Titre */}
          <h1 className="text-3xl md:text-5xl font-bold text-text-primary uppercase mb-8 tracking-wide">
            {game.name}
          </h1>


        {/* Vidéo */}
        {game.videoUrl && (
          <section aria-label="Bande annonce" className="mb-8 w-full aspect-video rounded-2xl overflow-hidden">
            <iframe
              src={`${game.videoUrl}`}
              title={`Vidéo de ${game.name}`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
              className="w-full h-full"
            />
          </section>
        )}

        {/* Contenu principal */}
        <article className="flex flex-col md:flex-row gap-8 items-start">

          {/* Image */}
          <section aria-label="Pochette du jeu" className="w-full md:w-64 shrink-0">
            <div className="relative aspect-video rounded-2xl overflow-hidden shadow-lg">
            <Image
              src={`${game.imageUrl}`}
              alt={`Pochette de ${game.name}`}
              fill
              sizes="(max-width: 768px) 100vw, 256px"
              className="object-cover"
            />
            </div>
          </section>

          {/* Infos */}
          <section className="flex flex-col gap-5 flex-1">

          
            {/* Tags éditeur + gratuit */}
            <div className="flex flex-wrap gap-2">
              {game.companyName && (
                <span className="bg-brand-purple/20 border border-brand-purple/40 text-brand-purple text-xs font-semibold px-3 py-1 rounded-full">
                  {game.companyName}
                </span>
              )}
              {game.freeToPlay && (
                <span className="bg-success/20 border border-success/40 text-success text-xs font-semibold px-3 py-1 rounded-full">
                  Gratuit
                </span>
              )}
              {game.releaseYear && (
                <span className="bg-bg-card border border-brand-purple/20 text-text-secondary text-xs font-semibold px-3 py-1 rounded-full">
                  {game.releaseYear}
                </span>
              )}
            </div>


            {/* Genres */}
            {game.gamesCategories.length > 0 && (
              <div className="flex flex-col gap-2">
                <p className="text-text-secondary text-xs font-semibold uppercase tracking-wider">
                  Genre(s)
                </p>
                <ul className="flex flex-wrap gap-2 list-none">
                  {game.gamesCategories.map((gc) => (
                    <li
                      key={gc.category?.idCategory}
                      className="bg-brand-cyan/10 border border-brand-cyan/30 text-brand-cyan text-xs font-semibold px-3 py-1 rounded-full"
                    >
                      {gc.category?.name}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Plateformes */}
            {game.gamesPlatforms.length > 0 && (
              <div className="flex flex-col gap-2">
                <p className="text-text-secondary text-xs font-semibold uppercase tracking-wider">
                  Plateforme(s)
                </p>
                <ul className="flex flex-wrap gap-2 list-none">
                  {game.gamesPlatforms.map((gp) => (
                    <li
                      key={gp.platform?.idPlatform}
                      className="bg-bg-card border border-brand-purple/20 text-text-secondary text-xs font-semibold px-3 py-1 rounded-full"
                    >
                      {gp.platform?.name}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Description */}
            {game.description && (
              <div className="flex flex-col gap-2">
                <p className="text-text-secondary text-xs font-semibold uppercase tracking-wider">
                  Description
                </p>
                <p className="text-text-secondary text-sm leading-relaxed">
                  {game.description}
                </p>
              </div>
            )}

            {/* Infos supplémentaires */}
            <div className="flex flex-wrap gap-3 mt-2">
              {game.online && (
                <span className="bg-bg-card border border-brand-purple/20 text-text-secondary text-xs px-3 py-1 rounded-full">
                  🌐 Online
                </span>
              )}
              {game.multiplayer && (
                <span className="bg-bg-card border border-brand-purple/20 text-text-secondary text-xs px-3 py-1 rounded-full">
                  👥 Multijoueur
                </span>
              )}
              {game.parentalGuidance && (
                <span className="bg-warning/10 border border-warning/30 text-warning text-xs px-3 py-1 rounded-full">
                  {game.parentalGuidance}+
                </span>
              )}
            </div>

          </section>
        </article>

      </main>
      <Footer/>
    </div>
  )
}


//Version with no design
// import Header from "@/src/components/Header"
// import { db } from "@/src/data/drizzle"
// import { category } from "@/src/data/schema"
// import Link from "next/link"
// import { notFound } from "next/navigation"

// export default async function GameDescription({params}: {params: Promise<{gameName : string}>}){
//     const { gameName } = await params

//     const decodeName = decodeURIComponent(gameName)

//     const game = await db.query.games.findFirst({
//         with : {
//             gamesCategories: {
//                 with:{
//                     category: true
//                 }
//             },
//             gamesPlatforms: {
//                 with: {
//                     platform: true
//                 }
//             }
//         },
//         where: (game, {eq}) => eq(game.name, decodeName)
//     })

//     if(!game) return notFound()

//     console.log(game)

//     return(
//         <>
//         <Header/>
//         <main>
//             <h1 className="mb-5 text-6xl uppercase">{game.name}</h1>
//             <iframe src={`${game.videoUrl}`} title={`Vidéo de ${game.name}`} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" className="mb-5 lg:w-250 lg:h-125 md:h-75 md:w-150 place-self-center-safe" allowFullScreen></iframe>
//             <article className="md:flex md:justify-evenly gap-10 items-start lg:w-250 mb-2">
//                 <section>
//                     <img src={`${game.imageUrl}`} alt={`${game.name}`}className="w-2xl top-10" />
//                 </section>
//                 <section className="md:max-w-xl flex flex-col gap-4">
//                     <div className="flex gap-3 flex-row-reverse mb-3">
//                     {game.freeToPlay && (<p className=" bg-green-600 rounded-3xl p-2 font-bold border-3 border-white text-[10px]">Gratuit</p>)}
//                     <p className=" bg-purple-800 rounded-3xl font-bold p-2 border-3 border-white text-[10px]">{game.companyName}</p>
//                     </div>
//                     <ul className="flex flex-wrap gap-5 justify-center-safe mb-2">
//                         <p className="text-red-300" >Genres(s)</p>
//                         {game.gamesCategories.map((gc) => (<li key={gc.category?.idCategory} className=" bg-red-950 rounded-2xl p-2 font-black border-2 border-red-300 text-[10px]">{gc.category?.name}</li>))}
//                     </ul>
//                     <ul className="flex flex-wrap gap-5 justify-center-safe mb-2">
//                         <p className="text-blue-300">Platforme(s):</p>
//                         {game.gamesPlatforms.map((gp) =>(<li key={gp.platform?.idPlatform} className=" bg-blue-900 rounded-2xl p-2 font-black border-2 border-blue-300 text-[10px]">{gp.platform?.name}</li>))}
//                     </ul>
//                     <p className="text-left text-[12px]">{game.description}</p>
//                     <Link href="/search-game" className="rounded-full bg-purple-600 font-black uppercase text-purple-200 mb-5">Retour</Link>
//                 </section>
//             </article>
//         </main>
//         </>
//     )
// }