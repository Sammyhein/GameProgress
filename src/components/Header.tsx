"use server"
import Link from "next/link"
import { auth } from "@/auth"
import { headers } from "next/headers"
import Image from "next/image"
import NavLinks from "./Navlinks"

export default async function Header() {
  const session = await auth.api.getSession({ headers: await headers() })
  
  return (
    <header
      role="banner"
      className="sticky top-0 z-50 flex items-center justify-between px-4 md:px-8 py-4 bg-bg-primary/90 backdrop-blur border-b border-brand-purple/20"
    >
      {/* Logo */}
      <Link href={`/search-game`} aria-label="Gamer+ - Retour à l'accueil">
        <Image
          src="/Gamer+_Logo_Logo.png"
          alt="Gamer+"
          height={28}
          width={100}
          className="md:h-8 w-auto"
        />
      </Link>

      {/* Navigation */}
      <nav aria-label="Navigation utilisateur">
        <NavLinks pseudo={session?.user.pseudo ?? ""}/>
      </nav>
      
    </header>
  )
}

// Version with no design
// "use server"

// import Link from "next/link"
// import { signout } from "../actions/authActions"
// import { auth } from "@/auth";
// import { headers } from "next/headers";

// export default async function Header(){
//     const session = await auth.api.getSession({ headers: await headers() });

//     return(
//         <header className="flex flex-row justify-evenly">
//             <h1>LOGO</h1>
//             <section className="flex flex-row gap-2">
//                 <Link href="/search-game">
//                 <button>Rechercher</button>
//                 </Link>
//                 <span>|</span>
//                 <Link href={`/profil/${session?.user.pseudo}`}>
//                 <button>Profil</button>
//                 </Link>
//                 <span>|</span>
//                 <button onClick={signout}>Deconnexion</button>
//             </section>
//         </header>
//     )
// }