import Header from "@/src/components/Header"
import { db } from "@/src/data/drizzle"
import { category } from "@/src/data/schema"
import Link from "next/link"
import { notFound } from "next/navigation"

export default async function GameDescription({params}: {params: Promise<{gameName : string}>}){
    const { gameName } = await params

    const decodeName = decodeURIComponent(gameName)

    const game = await db.query.games.findFirst({
        with : {
            gamesCategories: {
                with:{
                    category: true
                }
            },
            gamesPlatforms: {
                with: {
                    platform: true
                }
            }
        },
        where: (game, {eq}) => eq(game.name, decodeName)
    })

    if(!game) return notFound()

    console.log(game)

    return(
        <>
        <Header/>
        <main>
            <h1 className="mb-5 text-6xl uppercase">{game.name}</h1>
            <iframe src={`${game.videoUrl}`} title={`Vidéo de ${game.name}`} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" className="mb-5 lg:w-250 lg:h-125 md:h-75 md:w-150 place-self-center-safe" allowFullScreen></iframe>
            <article className="md:flex md:justify-evenly gap-10 items-start lg:w-250 mb-2">
                <section>
                    <img src={`${game.imageUrl}`} alt={`${game.name}`}className="w-2xl top-10" />
                </section>
                <section className="md:max-w-xl flex flex-col gap-4">
                    <div className="flex gap-3 flex-row-reverse mb-3">
                    {game.freeToPlay && (<p className=" bg-green-600 rounded-3xl p-2 font-bold border-3 border-white text-[10px]">Gratuit</p>)}
                    <p className=" bg-purple-800 rounded-3xl font-bold p-2 border-3 border-white text-[10px]">{game.companyName}</p>
                    </div>
                    <ul className="flex flex-wrap gap-5 justify-center-safe mb-2">
                        <p className="text-red-300" >Genres(s)</p>
                        {game.gamesCategories.map((gc) => (<li key={gc.category?.idCategory} className=" bg-red-950 rounded-2xl p-2 font-black border-2 border-red-300 text-[10px]">{gc.category?.name}</li>))}
                    </ul>
                    <ul className="flex flex-wrap gap-5 justify-center-safe mb-2">
                        <p className="text-blue-300">Platforme(s):</p>
                        {game.gamesPlatforms.map((gp) =>(<li key={gp.platform?.idPlatform} className=" bg-blue-900 rounded-2xl p-2 font-black border-2 border-blue-300 text-[10px]">{gp.platform?.name}</li>))}
                    </ul>
                    <p className="text-left text-[12px]">{game.description}</p>
                    <Link href="/search-game" className="rounded-full bg-purple-600 font-black uppercase text-purple-200 mb-5">Retour</Link>
                </section>
            </article>
        </main>
        </>
    )
}