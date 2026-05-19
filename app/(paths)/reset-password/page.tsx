"use client"
import { resetPassword, type ResetPasswordState } from "@/src/actions/authActions"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { useActionState } from "react"

const initialState: ResetPasswordState = {}

export default function ResetPassword() {
  const searchParams = useSearchParams()
  const token = searchParams.get("token") ?? ""
  const pseudo = searchParams.get("pseudo") ?? ""
  const [state, formAction, isPending] = useActionState(
    resetPassword.bind(null, token),
    initialState
  )

  if (state.success) {
    return (
      <div className="min-h-screen bg-bg-primary flex items-center justify-center px-4">
        <div className="w-full max-w-md">
          <header className="text-center mb-8">
            <Link href="/" aria-label="Gamer+ - Retour à l'accueil">
              <img
                src="/Gamer+_Logo_Logo.png"
                alt="Gamer+"
                className="h-10 w-auto mx-auto"
              />
            </Link>
          </header>
          <main>
            <div className="bg-bg-card border border-brand-purple/20 rounded-2xl p-6 md:p-8 flex flex-col gap-4 text-center">
              <span className="text-5xl" role="img" aria-label="Succès">✅</span>
              <h1 className="text-xl md:text-2xl font-bold text-text-primary">
                Mot de passe réinitialisé !
              </h1>
              <p className="text-text-secondary text-sm leading-relaxed">
                Ton mot de passe a bien été modifié. Tu peux maintenant te connecter avec ton nouveau mot de passe.
              </p>
              <Link
                href="/login"
                className="bg-brand-purple hover:bg-brand-purple-dark text-white font-semibold py-3 rounded-xl transition-colors text-sm md:text-base mt-2"
              >
                Se connecter
              </Link>
            </div>
          </main>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-bg-primary flex items-center justify-center px-4">
      <div className="w-full max-w-md">

        {/* Logo */}
        <header className="text-center mb-8">
          <Link href="/" aria-label="Gamer+ - Retour à l'accueil">
            <img
              src="/Gamer+_Logo_Logo.png"
              alt="Gamer+"
              className="h-10 w-auto mx-auto"
            />
          </Link>
        </header>

        <main>
          <div className="bg-bg-card border border-brand-purple/20 rounded-2xl p-6 md:p-8 flex flex-col gap-6">

            <div className="flex flex-col gap-2 text-center">
              <h1 className="text-xl md:text-2xl font-bold text-text-primary">
                Bonjour {pseudo} ! 👋
              </h1>
              <p className="text-text-secondary text-sm leading-relaxed">
                Tu es sur le point de changer de mot de passe.
                <br />Ne l'oublie pas cette fois-ci !
              </p>
            </div>

            <form action={formAction} className="flex flex-col gap-4" noValidate>

              {state.globalError && (
                <p role="alert" className="text-error text-sm text-center bg-error/10 border border-error/20 rounded-xl px-4 py-3">
                  {state.globalError}
                </p>
              )}

              <div className="flex flex-col gap-1">
                <label htmlFor="password" className="text-text-secondary text-sm font-medium">
                  Nouveau mot de passe
                </label>
                {state.errors?.password && (
                  <p role="alert" className="text-error text-xs">
                    {state.errors.password[0]}
                  </p>
                )}
                <input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Min. 8 caractères"
                  required
                  className="bg-bg-elevated border border-brand-purple/20 focus:border-brand-purple focus:outline-none text-text-primary placeholder:text-text-muted rounded-xl px-4 py-3 text-sm md:text-base transition-colors"
                />
              </div>

              <button
                type="submit"
                disabled={isPending}
                aria-busy={isPending}
                className="bg-brand-purple hover:bg-brand-purple-dark disabled:opacity-50 text-white font-semibold py-3 rounded-xl transition-colors text-sm md:text-base"
              >
                {isPending ? "Réinitialisation..." : "Confirmer"}
              </button>

            </form>

            <p className="text-text-secondary text-sm text-center">
              Tu te souviens de ton mot de passe ?{" "}
              <Link
                href="/login"
                className="text-brand-cyan hover:text-brand-cyan/80 font-medium transition-colors"
              >
                Se connecter
              </Link>
            </p>

          </div>
        </main>

      </div>
    </div>
  )
}

//Version with no design
// "use client"

// import { resetPassword, ResetPasswordState } from "@/src/actions/authActions"
// import Link from "next/link"
// import { useSearchParams } from "next/navigation"
// import { useActionState } from "react"

// const initialState: ResetPasswordState = {}

// export default function ResetPassword(){
//     const searchParams = useSearchParams()
//     const token = searchParams.get("token") ?? ""
//     const pseudo = searchParams.get("pseudo") ?? ""
//     const [state, formAction, isPending] = useActionState(resetPassword.bind(null, token), initialState)
//     console.log(token)
    

//     if(state.success){
//         return(
//             <>
//                 <p>Mot de passe réinitialisé avec succès !</p>
//                 <Link href="/login">Se connecter</Link>
//             </>
//         )
//     }

//     return(
//         <form action={formAction} className="flex flex-col">
//             <h1>Bonjour {pseudo} !</h1>
//             <p>Tu es sur le point de changer de mot de passe. <br />Ne l'oublie pas cette fois-ci !</p>
//             <label htmlFor="password">Nouveau mot de passe</label>
//             {state.errors?.password && (
//                 <p className="text-red-500 text-sm">{state.errors.password[0]}</p>
//             )}
//             {state.globalError && (
//                 <p className="text-red-500 text-sm">{state.globalError}</p>
//             )}
//             <input type="password" name="password" placeholder="Min. 8 caractères" required/>
//             <button type="submit" disabled={isPending}>
//                 {isPending ? "Réinitialisation..." : "Confirmer"}
//             </button>
//         </form>
//     )
// }