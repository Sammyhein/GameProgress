// import Link from "next/link";

// export default function Home() {
//   return (
//     <>
//     <header>
//       <h1>GameProgress</h1>
//       <Link href="/login">
//       <button>Se connecter</button>
//       </Link>
//     </header>
//     <article>
//       <img alt="LandingPage" />
//       <h1>Bienvenue sur GameProgress</h1>
//       <p>Ce site permet aux utilisateurs de suivre leur progression sur leurs différents jeux vidéo. Ce suivi est défini par leur avancement en pourcentage, le temps passé sur le jeu, une évaluation et des commentaires personnels. Ceci est la version démo, pour le moment, vous pouvez uniquement consulter votre propre profil, mais nous comptons bien faire évoluer la plateforme pour que vous puissiez voir la progression d'autres joueurs et lire leurs avis ! Vous souhaitez préparer votre profil pour ce futur réseau social ? N'hésitez pas à vous connecter !</p>
//     </article>
//     </>
//   );
// }

import Image from "next/image"
import Link from "next/link"

export default function Home() {
  return (
    <div className="min-h-screen bg-bg-primary">

      {/* Header public */}
      <header role="banner" className="flex items-center justify-between px-4 md:px-8 py-4 border-b border-brand-purple/20">
        <Link href="/" aria-label="Gamer+ - Retour à l'accueil">
          <Image
            src="/Gamer+_Logo_Logo.png"
            alt="Gamer+"
            height={28}
            width={200}
            className="md:h-8 w-auto"
          />
        </Link>

        <nav aria-label="Navigation principale">
          <ul className="flex items-center gap-2 md:gap-4 list-none">
            <li>
              <Link
                href="/login"
                className="text-text-secondary hover:text-text-primary transition-colors text-sm md:text-base whitespace-nowrap"
              >
                Se connecter
              </Link>
            </li>
            <li>
              <Link
                href="/create-account"
                className="bg-brand-purple hover:bg-brand-purple-dark text-white px-3 md:px-5 py-2 rounded-xl font-medium transition-colors text-sm md:text-base whitespace-nowrap"
              >
                Créer un compte
              </Link>
            </li>
          </ul>
        </nav>
      </header>

      <main id="main-content">

        {/* Hero */}
        <section aria-labelledby="hero-title" className="flex flex-col items-center text-center px-6 py-24 gap-6">
          <p className="text-brand-cyan text-sm font-semibold uppercase tracking-widest">
            Ton compagnon de jeu
          </p>
          <h1 id="hero-title" className="text-5xl font-bold text-text-primary max-w-2xl leading-tight">
            Suis ta progression,{" "}
            <span className="text-brand-purple">maîtrise ton aventure</span>
          </h1>
          <p className="text-text-secondary text-lg max-w-xl">
            Gamer+ te permet de tracker ta progression sur tous tes jeux,
            d'écrire ton journal de sessions et de partager tes avis.
          </p>
          <div className="flex gap-4 mt-4" role="group" aria-label="Actions principales">
            <Link
              href="/create-account"
              className="bg-brand-purple hover:bg-brand-purple-dark text-white px-8 py-3 rounded-xl font-semibold transition-colors"
            >
              S'inscrire gratuitement
            </Link>
            <Link
              href="/login"
              className="border border-brand-purple/50 hover:border-brand-purple text-text-primary px-8 py-3 rounded-xl font-semibold transition-colors"
            >
              Se connecter
            </Link>
          </div>
        </section>

        {/* Features */}
        <section aria-labelledby="features-title" className="px-8 py-16 max-w-5xl mx-auto">
          <h2 id="features-title" className="text-3xl font-bold text-center text-text-primary mb-12">
            Ce que Gamer+ te permet de faire
          </h2>
          <ul className="grid grid-cols-1 md:grid-cols-3 gap-6 list-none">

            <li className="bg-bg-card border border-brand-purple/20 rounded-2xl p-6 flex flex-col gap-3">
              <span role="img" aria-label="Manette de jeu" className="text-4xl">🎮</span>
              <h3 className="text-xl font-semibold text-text-primary">
                Tracker ta progression
              </h3>
              <p className="text-text-secondary text-sm">
                Ajoute tes jeux et suis ton avancement en pourcentage,
                ton temps de jeu et ta note personnelle.
              </p>
            </li>

            <li className="bg-bg-card border border-brand-purple/20 rounded-2xl p-6 flex flex-col gap-3">
              <span role="img" aria-label="Journal" className="text-4xl">📓</span>
              <h3 className="text-xl font-semibold text-text-primary">
                Écrire ton journal
              </h3>
              <p className="text-text-secondary text-sm">
                Note tes sessions de jeu, tes ressentis et tes moments
                mémorables pour chaque aventure.
              </p>
            </li>

            <li className="bg-bg-card border border-brand-purple/20 rounded-2xl p-6 flex flex-col gap-3">
              <span role="img" aria-label="Étoile" className="text-4xl">⭐</span>
              <h3 className="text-xl font-semibold text-text-primary">
                Partager tes avis
              </h3>
              <p className="text-text-secondary text-sm">
                Donne ton avis sur ce que tu as aimé ou moins aimé
                dans chaque jeu de ta bibliothèque.
              </p>
            </li>

          </ul>
        </section>

        {/* CTA final */}
        <section aria-labelledby="cta-title" className="px-8 py-16">
          <div className="max-w-2xl mx-auto bg-bg-card border border-brand-purple/30 rounded-2xl p-10 flex flex-col items-center text-center gap-4">
            <h2 id="cta-title" className="text-3xl font-bold text-text-primary">
              Prêt à rejoindre l'aventure ?
            </h2>
            <p className="text-text-secondary">
              Crée ton profil gratuitement et commence à tracker
              ta progression dès aujourd'hui.
            </p>
            <Link
              href="/create-account"
              className="bg-brand-cyan hover:bg-brand-cyan/80 text-bg-primary px-8 py-3 rounded-xl font-bold transition-colors mt-2"
            >
              Créer mon compte
            </Link>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer role="contentinfo" className="border-t border-brand-purple/20 px-8 py-8 mt-8">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <Link href="/" aria-label="Gamer+ - Retour à l'accueil">
            <Image
              src="/Gamer+_Logo_Logo.png"
              alt="Gamer+"
              height={24}
              width={200}
              className="h-6 w-auto"
            />
          </Link>
          <p className="text-text-muted text-sm">
            <small>© 2026 Gamer+ — Tous droits réservés</small>
          </p>
          <nav aria-label="Navigation secondaire">
            <ul className="flex gap-6 text-text-secondary text-sm list-none">
              <li>
                <Link href="/login" className="hover:text-text-primary transition-colors">
                  Se connecter
                </Link>
              </li>
              <li>
                <Link href="/create-account" className="hover:text-text-primary transition-colors">
                  Créer un compte
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </footer>

    </div>
  )
}
