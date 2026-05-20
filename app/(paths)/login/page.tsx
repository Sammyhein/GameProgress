"use client"
import { signin, type SigninState } from "@/src/actions/authActions"
import Image from "next/image"
import Link from "next/link"
import { useActionState } from "react"

const initialState: SigninState = {}

export default function Login() {
  const [state, formAction, isPending] = useActionState(signin, initialState)

  return (
    <div className="min-h-screen bg-bg-primary flex items-center justify-center px-4">
      <div className="w-full max-w-md">

        {/* Logo */}
        <header className="text-center mb-8">
          <Link href="/" aria-label="Gamer+ - Retour à l'accueil">
            <Image
              src="/Gamer+_Logo_Logo.png"
              alt="Gamer+"
              height={40}
              width={200}
              className="h-10 w-auto mx-auto"
            />
          </Link>
        </header>

        {/* Card formulaire */}
        <main>
          <div className="bg-bg-card border border-brand-purple/20 rounded-2xl p-6 md:p-8 flex flex-col gap-6">
            <h1 className="text-xl md:text-2xl font-bold text-text-primary text-center">
              Connectez-vous !
            </h1>

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
                  placeholder="ex: prenom@gmail.com"
                  required
                  className="bg-bg-elevated border border-brand-purple/20 focus:border-brand-purple focus:outline-none text-text-primary placeholder:text-text-muted rounded-xl px-4 py-3 text-sm md:text-base transition-colors"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="password" className="text-text-secondary text-sm font-medium">
                  Mot de passe
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Votre mot de passe"
                  required
                  className="bg-bg-elevated border border-brand-purple/20 focus:border-brand-purple focus:outline-none text-text-primary placeholder:text-text-muted rounded-xl px-4 py-3 text-sm md:text-base transition-colors"
                />
              </div>

              <div className="text-right">
                <Link
                  href="/forgot-password"
                  className="text-text-secondary text-sm hover:text-brand-cyan transition-colors"
                >
                  Mot de passe oublié ?
                </Link>
              </div>

              <button
                type="submit"
                disabled={isPending}
                aria-busy={isPending}
                className="bg-brand-purple hover:bg-brand-purple-dark disabled:opacity-50 text-white font-semibold py-3 rounded-xl transition-colors mt-2 text-sm md:text-base"
              >
                {isPending ? "Connexion..." : "Se connecter"}
              </button>

            </form>

            <p className="text-text-secondary text-sm text-center">
              Pas encore de compte ?{" "}
              <Link
                href="/create-account"
                className="text-brand-cyan hover:text-brand-cyan/80 font-medium transition-colors"
              >
                Créer un compte
              </Link>
            </p>

          </div>
        </main>

      </div>
    </div>
  )
}

//Version With NO Design
// "use client"
// import { signin, type SigninState } from "@/src/actions/authActions"
// import Link from "next/link"
// import { useActionState } from "react"

// const initialState: SigninState = {}

// export default function Login(){
//     const [state, formAction, isPending] = useActionState(signin, initialState)
//     return(
//         <>
//         <h1>LOGO</h1>
//         <form className="flex flex-col" action={formAction}>
//             <h1>Connectez-vous !</h1>

//             {/* Pour les erreurs */}
//             {state.globalError && (
//                 <p className="text-red-500 text-sm">{state.globalError}</p>
//             )}

//             <label htmlFor="email">Adresse Mail</label>
//             <input name ="email" type="text" placeholder="ex: prenom@gmail.com" required/>
//             <label htmlFor="password">Mot de Passe</label>
//             <input name="password" type="password" placeholder="ex: motdepassesecret" required/>

//             <button type="submit">
//                 {isPending ? "Connexion ..." : "Confirmer"}
//             </button>


//             <p>Vous n'avez pas encore de compte ? <Link href="/create-account"><span className="text-blue-300">Créer un compte</span></Link> | <Link href="/forgot-password" className="text-blue-300">Mot de passe oublié ?</Link></p>
//         </form>
//         </>
//     )
// }