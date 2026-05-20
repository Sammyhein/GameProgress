"use server"
import { auth } from "@/auth"
import Header from "@/src/components/Header"
import UserProfil from "@/src/components/UserProfil"
import { db } from "@/src/data/drizzle"
import { headers } from "next/headers"
import Footer from "@/src/components/Footer"

export default async function Profil({ params }: { params: Promise<{ pseudo: string }> }) {
  const { pseudo } = await params
  const session = await auth.api.getSession({ headers: await headers() })

  const userGamesList = await db.query.userGames.findMany({
    with: { game: true },
    where: (userGames, { eq }) => eq(userGames.userId, session!.user.id),
    orderBy: (userGames, { desc }) => [desc(userGames.id)]
  })

  return (
    <div className="min-h-screen bg-bg-primary flex flex-col">
      <Header />

      <main className="flex-1 px-4 md:px-8 py-8 max-w-6xl mx-auto w-full flex flex-col gap-8">

        {/* En-tête profil */}
        <section aria-label="Informations du profil" className="flex items-center gap-5">
          <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-brand-purple/20 border-2 border-brand-purple/40 flex items-center justify-center shrink-0">
            <span className="text-2xl md:text-3xl font-bold text-brand-purple uppercase">
              {session?.user.pseudo?.charAt(0)}
            </span>
          </div>
          <div className="flex flex-col gap-1">
            <h1 className="text-2xl md:text-3xl font-bold text-text-primary">
              {session?.user.pseudo}
            </h1>
            <p className="text-text-secondary text-sm">
              {userGamesList.length} jeu{userGamesList.length > 1 ? "x" : ""} dans la bibliothèque
            </p>
          </div>
        </section>

        {/* Bibliothèque */}
        <section aria-labelledby="library-title">
          <h2 id="library-title" className="text-xl font-bold text-text-primary mb-4">
            Ma bibliothèque
          </h2>
          <UserProfil userGamesList={userGamesList} pseudo={pseudo} />
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
// import UserProfil from "@/src/components/UserProfil";
// import { db } from "@/src/data/drizzle";
// import { games, userGames } from "@/src/data/schema";
// import { headers } from "next/headers";

// export default async function Profil({params}: {params: Promise<{pseudo : string}>}){

//     const { pseudo } = await params
//     //Comment on récupère des données de la session présente de l'utilisateur
//     const session = await auth.api.getSession({ headers: await headers() });

//     const userGamesList = await db.query.userGames.findMany({
//         with: {
//             game: true
//         },
//         where: (userGames, {eq}) => eq(userGames.userId, session!.user.id)
//     })

//     console.log(session)
//     console.log(userGamesList)
//     return(
//         <>
//         <Header/>
//         <main>
//            <section>
//                 <img  alt="user_image" />
//                 <h2>{session?.user.pseudo}</h2>
//             </section>
//             <UserProfil userGamesList={userGamesList}pseudo={pseudo}/>
//         </main>
//         </>
//     )
// }