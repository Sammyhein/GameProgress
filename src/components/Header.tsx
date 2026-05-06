import Link from "next/link"
import { signout } from "../../app/actions/authActions"

export default function Header(){
    return(
        <header className="flex flex-row justify-evenly">
            <h1>LOGO</h1>
            <section className="flex flex-row gap-2">
                <Link href="/search-game">
                <button>Rechercher</button>
                </Link>
                <span>|</span>
                <button>Profil</button>
                <span>|</span>
                <button onClick={signout}>Deconnexion</button>
            </section>
        </header>
    )
}