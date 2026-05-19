"use server"
import Link from "next/link"
import SignoutButton from "./SignoutButton"
import { auth } from "@/auth"
import { headers } from "next/headers"
import Image from "next/image"

export default async function Header() {
  const session = await auth.api.getSession({ headers: await headers() })

  return (
    <header
      role="banner"
      className="sticky top-0 z-50 flex items-center justify-between px-4 md:px-8 py-4 bg-bg-primary/90 backdrop-blur border-b border-brand-purple/20"
    >
      {/* Logo */}
      <Link href={`/search-game`} aria-label="Gamer+ - Retour à l'accueil">
        <img
          src="/Gamer+_Logo_Logo.png"
          alt="Gamer+"
          className="h-7 md:h-8 w-auto"
        />
      </Link>

      {/* Navigation */}
      <nav aria-label="Navigation utilisateur">
        <ul className="flex items-center gap-3 md:gap-6 list-none">
          <li>
            <Link
              href="/search-game"
              className="text-text-secondary hover:text-text-primary transition-colors text-sm md:text-base whitespace-nowrap"
            >
              Rechercher
            </Link>
          </li>
          <li>
            <Link
              href={`/profil/${session?.user.pseudo}`}
              className="text-text-secondary hover:text-text-primary transition-colors text-sm md:text-base whitespace-nowrap"
            >
              Profil
            </Link>
          </li>
          <li>
            <SignoutButton />
          </li>
        </ul>
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