import Link from "next/link"

export default function Header(){
    return(
        <header className="flex flex-row justify-evenly">
            <h1>LOGO</h1>
            <section className="flex flex-row gap-2">
                <Link href="/paths/search-game">
                <p>Rechercher</p>
                </Link>
                <span>|</span>
                <p>Profil</p>
            </section>
        </header>
    )
}