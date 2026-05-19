"use server"

import Header from "@/src/components/Header"
import { auth } from "@/auth";
import { db } from "@/src/data/drizzle"
import { headers } from "next/headers";
import GamesList from "@/src/components/GamesList";
import Footer from "@/src/components/Footer";

export default async function SearchGame(){
  //On récupère tous les jeux
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

  //Comment on récupère des données de la session présente de l'utilisateur
  const session = await auth.api.getSession({ headers: await headers() });
  // On récupère les jeux déjà ajoutés par le user
  const userGamesList = await db.query.userGames.findMany({
    where: (userGames, { eq }) => eq(userGames.userId, session!.user.id)
  })

  // On crée un tableau des id des jeux déjà ajoutés
  const userGameId = userGamesList.map(userG => userG.gameId)

  console.log(gamesList)
  console.log(session)
    return(
        <>
        <div className="min-h-screen bg-bg-primary flex flex-col">
          <Header/>
          <main className="flex-1">
            <GamesList gamesList={gamesList} userGameId={userGameId}/>
          </main>
          <Footer/>
        </div>
        </>
    )
}