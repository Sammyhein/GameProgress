"use server"

import { auth } from "@/auth";
import Header from "@/src/components/Header"
import { db } from "@/src/data/drizzle";
import { games, userGames } from "@/src/data/schema";
import { headers } from "next/headers";

export default async function Profil({params}: {params: Promise<{pseudo : string}>}){

    const { pseudo } = await params
    //Comment on récupère des données de la session présente de l'utilisateur
    const session = await auth.api.getSession({ headers: await headers() });

    const userGamesList = await db.query.userGames.findMany({
        with: {
            game: true
        },
        where: (userGames, {eq}) => eq(userGames.userId, session!.user.id)
    })

    console.log(session)
    console.log(userGamesList)
    return(
        <>
        <Header/>

        </>
    )
}