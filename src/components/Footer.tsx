import { auth } from "@/auth"
import { headers } from "next/headers"
import Link from "next/link"
import SignoutButton from "./SignoutButton"

export default async function Footer() {
    const session = await auth.api.getSession({ headers: await headers() })
  return (
    <footer
      role="contentinfo"
      className="border-t border-brand-purple/20 px-4 md:px-8 py-8 mt-auto"
    >
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">

        {/* Logo */}
        <Link href="/" aria-label="Gamer+ - Retour à l'accueil">
          <img
            src="/Gamer+_Logo_Logo.png"
            alt="Gamer+"
            className="h-6 w-auto"
          />
        </Link>

        {/* Copyright */}
        <p className="text-text-muted text-sm text-center">
          <small>© 2026 Gamer+ — Tous droits réservés</small>
        </p>

        {/* Liens */}
        <nav aria-label="Navigation footer">
          <ul className="flex gap-6 text-text-secondary text-sm list-none">
            <li>
              <Link
                href="/search-game"
                className="hover:text-text-primary transition-colors"
              >
                Rechercher
              </Link>
            </li>
            <li>
              <Link
              href={`/profil/${session?.user.pseudo}`}
              className="text-text-secondary hover:text-text-primary transition-colors"
            >
              Profil
            </Link>
            </li>
            {/* <li>
              <SignoutButton />
            </li> */}
          </ul>
        </nav>

      </div>
    </footer>
  )
}