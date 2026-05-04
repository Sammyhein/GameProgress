"use server"

import Header from "@/app/components/Header"
import { db } from "@/src/data/drizzle"

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

console.log(gamesList)
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
                </section>
            )
        })}
        </>
    )
}