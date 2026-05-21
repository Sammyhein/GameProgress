"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import SignoutButton from "./SignoutButton"

export default function NavLinks({ pseudo }: { pseudo: string }) {
  const pathname = usePathname()

  return (
    <ul className="flex items-center gap-3 md:gap-6 list-none">
      <li>
        <Link
          href="/search-game"
          className={`transition-colors text-sm md:text-base whitespace-nowrap ${
            pathname === "/search-game"
              ? "text-brand-cyan font-semibold"
              : "text-text-secondary hover:text-text-primary"
          }`}
        >
          Rechercher
        </Link>
      </li>
      <li>
        <Link
          href={`/profil/${pseudo}`}
          className={`transition-colors text-sm md:text-base whitespace-nowrap ${
            pathname === `/profil/${pseudo}`
              ? "text-brand-cyan font-semibold"
              : "text-text-secondary hover:text-text-primary"
          }`}
        >
          Profil
        </Link>
      </li>
      <li>
        <SignoutButton />
      </li>
    </ul>
  )
}