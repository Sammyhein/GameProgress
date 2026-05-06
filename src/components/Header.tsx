"use server"

import Link from "next/link"
import { signout } from "../actions/authActions"
import { auth } from "@/auth";
import { headers } from "next/headers";

export default async function Header(){
    const session = await auth.api.getSession({ headers: await headers() });

    return(
        <header className="flex flex-row justify-evenly">
            <h1>LOGO</h1>
            <section className="flex flex-row gap-2">
                <Link href="/search-game">
                <button>Rechercher</button>
                </Link>
                <span>|</span>
                <Link href={`/profil/${session?.user.pseudo}`}>
                <button>Profil</button>
                </Link>
                <span>|</span>
                <button onClick={signout}>Deconnexion</button>
            </section>
        </header>
    )
}