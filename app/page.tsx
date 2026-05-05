import Link from "next/link";

export default function Home() {
  return (
    <>
    <header>
      <h1>GameProgress</h1>
      <Link href="/login">
      <button>Se connecter</button>
      </Link>
    </header>
    <article>
      <img alt="LandingPage" />
      <h1>Bienvenue sur GameProgress</h1>
      <p>Ce site permet aux utilisateurs de suivre leur progression sur leurs différents jeux vidéo. Ce suivi est défini par leur avancement en pourcentage, le temps passé sur le jeu, une évaluation et des commentaires personnels. Ceci est la version démo, pour le moment, vous pouvez uniquement consulter votre propre profil, mais nous comptons bien faire évoluer la plateforme pour que vous puissiez voir la progression d'autres joueurs et lire leurs avis ! Vous souhaitez préparer votre profil pour ce futur réseau social ? N'hésitez pas à vous connecter !</p>
    </article>
    </>
  );
}
