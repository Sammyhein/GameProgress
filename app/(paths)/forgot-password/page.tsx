"use client"
import { forgotPassword, type ForgotPasswordState } from "@/src/actions/authActions"
import Link from "next/link"
import { useActionState } from "react"

const initialState: ForgotPasswordState = {}

export default function ForgotPassword() {
  const [state, formAction, isPending] = useActionState(forgotPassword, initialState)

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
              <span className="text-5xl" role="img" aria-label="Enveloppe">📩</span>
              <h1 className="text-xl md:text-2xl font-bold text-text-primary">
                Vérifie tes mails !
              </h1>
              <p className="text-text-secondary text-sm leading-relaxed">
                Si cet email existe dans notre base de données, tu recevras un lien
                de réinitialisation dans quelques minutes.
              </p>
              <p className="text-text-secondary text-sm leading-relaxed">
                Si ce n'est pas le cas, tu n'as peut-être pas encore de compte sur
                notre site, ou tu as peut-être saisi le mauvais email. N'hésite pas
                à réessayer !
              </p>
              <Link
                href="/login"
                className="text-brand-cyan hover:text-brand-cyan/80 font-medium transition-colors text-sm mt-2"
              >
                Retour à la connexion
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
                Mot de passe oublié
              </h1>
              <p className="text-text-secondary text-sm leading-relaxed">
                Écris ton adresse mail et appuie sur le bouton. Tu recevras
                ensuite un email avec un lien pour réinitialiser ton mot de passe !
              </p>
            </div>

            <form action={formAction} className="flex flex-col gap-4" noValidate>

              {state.globalError && (
                <p role="alert" className="text-error text-sm text-center bg-error/10 border border-error/20 rounded-xl px-4 py-3">
                  {state.globalError}
                </p>
              )}

              <div className="flex flex-col gap-1">
                <label htmlFor="email" className="text-text-secondary text-sm font-medium">
                  Adresse mail
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="ex: clark.kent@gmail.com"
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
                {isPending ? "Envoi..." : "Envoyer le lien"}
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

// import { forgotPassword, type ForgotPasswordState } from "@/src/actions/authActions"
// import { useActionState } from "react"

// const initialState: ForgotPasswordState = {}

// export default function ForgotPassword(){
//     const [state, formAction, isPending] = useActionState(forgotPassword, initialState)

//     if(state.success){
//         return(
//             <>
//             <h1>VÉRIFIE TES MAILS</h1>
//             <p className="flex flex-col">Si cet email existe dans notre base de donnée, 
//             tu recevras un lien de réinitialisation dans quelques minutes.
//             <br />Si ce n'est pas le cas, tu n'as peut-être pas encore de compte sur notre site <span>OU</span> tu as peut-être pas inscrit le bon mail. 
//             N'hésite pas à réessayer !</p>
//             </>
//         )
//     }

//     return(
//         <form action={formAction} className="flex flex-col">
//             <h1>Mot de passe oublié</h1>
//             <p>Écris ton adresse mail et appuie sur le bouton.
//             Tu recevras ensuite un email avec un lien pour réinitialiser ton mot de passe !</p>
//             <label htmlFor="email">Adresse email</label>
//             {state.globalError && (
//                 <p className="text-red-500 text-sm">{state.globalError}</p>
//             )}
//             <input type="email" name="email" placeholder="ex: clark.kent@gmail.com" required/>
//             <button type="submit" disabled={isPending}>
//                 {isPending ? "Envoi..." : "Envoyer le lien"}
//             </button>
//         </form>
//     )
// }