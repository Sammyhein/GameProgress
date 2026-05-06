"use server"

import Header from "@/src/components/Header"
import { auth } from "@/auth";
import { db } from "@/src/data/drizzle"
import { headers } from "next/headers";

export default async function SearchGame(){
    const gamesList = await db.query.games.findMany({
  with: {
    gamesCategories: {
      with: {
        category: true,
      },
    },
    gamesPlatforms: {
      with: {
        platform: true,
      },
    },
  },
})

const session = await auth.api.getSession({ headers: await headers() });

console.log(gamesList)

console.log(session)
    return(
        <>
        <Header/>
        <p>Recherchez les jeux auxquels vous avez joué ou que vous jouez actuellement afin de les ajouter dans votre bibliothèque</p>
        <input type="text" placeholder="Rechercher"/>

        <p>Vous voulez jouer un nouveau jeu mais vous ne savez pas lequel ? Cliquez sur le bouton pour avoir des suggestions selon vos critères ! </p>
        <a href="https://find-your-game-front.vercel.app" className="text-purple-400" target="_blank">Find Your Game</a>
        {gamesList.map((game)=> {
            return(
                <section key={game.idGame}>
                    <img src={`${game.imageUrl}`} alt="" />
                    <h1>{game.name}</h1>
                    <button className="p-2 bg-green-500 border-2 border-white rounded-2xl">+</button>
                    <button className="p-2 bg-red-500 border-2 border-white rounded-2xl">-</button>
                </section>
            )
        })}
        </>
    )
}