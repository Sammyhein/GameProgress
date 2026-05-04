import Link from "next/link"

export default function Login(){
    return(
        <>
        <h1>LOGO</h1>
        <form className="flex flex-col">
            <h1>Connectez-vous !</h1>
            <label htmlFor="mail">Adresse Mail</label>
            <input name ="mail" type="text" placeholder="ex: prenom@gmail.com"/>
            <label htmlFor="password">Mot de Passe</label>
            <input name="password" type="text" placeholder="ex: motdepassesecret"/>

            <Link href="/paths/search-game">
            <button>Confirmer</button>
            </Link>

            <p>Vous n'avez pas encore de compte ? <Link href="/paths/create-account"><span className="text-blue-300">Créer un compte</span></Link></p>
        </form>
        </>
    )
}