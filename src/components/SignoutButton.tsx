"use client"
import { signout } from "@/src/actions/authActions"

export default function SignoutButton() {
  return (
    <button
      onClick={() => signout()}
      className="text-text-secondary hover:text-error transition-colors text-sm md:text-base whitespace-nowrap"
    >
      Déconnexion
    </button>
  )
}