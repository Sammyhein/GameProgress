import Link from "next/link"

export default function CreateAccount(){
    return(
        <>
        <h1>LOGO</h1>
        <form className="flex flex-col">
            <h1>Créer un compte !</h1>

            <label htmlFor="pseudo">Pseudo</label>
            <input name="pseudo" type="text" placeholder="ex: Superman38"/>

            <label htmlFor="firstname">Prénom</label>
            <input name="firstname" type="text" placeholder="ex: Clark"/>

            <label htmlFor="lastname">Nom</label>
            <input type="text" name="lastname" placeholder="ex: Kent"/>

            <label htmlFor="email">Email</label>
            <input type="text" name="email" placeholder="clark.kent@gmail.com"/>

            <label htmlFor="password">Mot de Passe</label>
            <input type="text" name="password" placeholder="ex: iAmSuperman"/>

            <label htmlFor="confirmedPassword">Confirmation de Mot de Passe</label>
            <input type="text" name="confirmedPassword" placeholder="Doit être identique à votre mot de passe" />

            {/* <Link href="/paths/login"> */}
            <button type="submit">Créer</button>
            {/* </Link> */}
        </form>
        </>
    )
}