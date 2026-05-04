"use client"

export default function SearchGame(){
    return(
        <>
        <header className="flex flex-row justify-evenly">
            <h1>LOGO</h1>
            <section className="flex flex-row gap-2">
                <p>Rechercher</p>
                <span>|</span>
                <p>Profil</p>
            </section>
        </header>

        <p>Recherchez les jeux auxquels vous avez joué ou que vous jouez actuellement afin de les ajouter dans votre bibliothèque</p>
        <input type="text" placeholder="Rechercher"/>

        <p>Vous voulez jouer un nouveau jeu mais vous ne savez pas lequel ?cliquer sur le bouton pour avoir des suggestions selon vos critères ! </p>
        <a href="https://find-your-game-front.vercel.app" className="text-purple-400">Find Your Game</a>
        </>
    )
}