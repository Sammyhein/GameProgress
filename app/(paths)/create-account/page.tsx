"use client"
import { signup, type SignupState } from "@/src/actions/authActions"
import Image from "next/image"
import Link from "next/link"
import { useActionState, useEffect, useRef } from "react"

const initialState: SignupState = {}

export default function CreateAccount() {
  const [state, formAction, isPending] = useActionState(signup, initialState)
  const dialogRef = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    if (state.success) {
      dialogRef.current?.showModal()
    }
  }, [state.success])

  return (
    <div className="min-h-screen bg-bg-primary flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">

        {/* Logo */}
        <header className="text-center mb-8">
          <Link href="/" aria-label="Gamer+ - Retour à l'accueil">
            <Image
              src="/Gamer+_Logo_Logo.png"
              alt="Gamer+"
              width={200}
              height={40}
              className="w-auto mx-auto"
            />
          </Link>
        </header>

        {/* Card formulaire */}
        <main>
          <div className="bg-bg-card border border-brand-purple/20 rounded-2xl p-6 md:p-8 flex flex-col gap-6">
            <h1 className="text-xl md:text-2xl font-bold text-text-primary text-center">
              Créer un compte !
            </h1>

            <form action={formAction} className="flex flex-col gap-4" noValidate>

              {state.globalError && (
                <p role="alert" className="text-error text-sm text-center bg-error/10 border border-error/20 rounded-xl px-4 py-3">
                  {state.globalError}
                </p>
              )}

              <div className="flex flex-col gap-1">
                <label htmlFor="pseudo" className="text-text-secondary text-sm font-medium">
                  Pseudo
                </label>
                {state.errors?.pseudo && (
                  <p role="alert" className="text-error text-xs">{state.errors.pseudo[0]}</p>
                )}
                <input
                  id="pseudo"
                  name="pseudo"
                  type="text"
                  placeholder="ex: Superman38"
                  required
                  className="bg-bg-elevated border border-brand-purple/20 focus:border-brand-purple focus:outline-none text-text-primary placeholder:text-text-muted rounded-xl px-4 py-3 text-sm md:text-base transition-colors"
                />
              </div>

                <div className="flex flex-col md:flex-row gap-3">
                    <div className="flex flex-col gap-1 flex-1 min-w-0">
                        <label htmlFor="firstname" className="text-text-secondary text-sm font-medium">
                        Prénom
                        </label>
                        {state.errors?.firstname && (
                        <p role="alert" className="text-error text-xs">{state.errors.firstname[0]}</p>
                        )}
                        <input
                        id="firstname"
                        name="firstname"
                        type="text"
                        placeholder="ex: Clark"
                        required
                        className="bg-bg-elevated border border-brand-purple/20 focus:border-brand-purple focus:outline-none text-text-primary placeholder:text-text-muted rounded-xl px-4 py-3 text-sm md:text-base transition-colors w-full"
                        />
                    </div>

                    <div className="flex flex-col gap-1 flex-1 min-w-0">
                        <label htmlFor="lastname" className="text-text-secondary text-sm font-medium">
                        Nom de famille
                        </label>
                        {state.errors?.lastname && (
                        <p role="alert" className="text-error text-xs">{state.errors.lastname[0]}</p>
                        )}
                        <input
                        id="lastname"
                        name="lastname"
                        type="text"
                        placeholder="ex: Kent"
                        required
                        className="bg-bg-elevated border border-brand-purple/20 focus:border-brand-purple focus:outline-none text-text-primary placeholder:text-text-muted rounded-xl px-4 py-3 text-sm md:text-base transition-colors w-full"
                        />
                    </div>
                </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="email" className="text-text-secondary text-sm font-medium">
                  Adresse mail
                </label>
                {state.errors?.email && (
                  <p role="alert" className="text-error text-xs">{state.errors.email[0]}</p>
                )}
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="clark.kent@gmail.com"
                  required
                  className="bg-bg-elevated border border-brand-purple/20 focus:border-brand-purple focus:outline-none text-text-primary placeholder:text-text-muted rounded-xl px-4 py-3 text-sm md:text-base transition-colors"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="password" className="text-text-secondary text-sm font-medium">
                  Mot de passe
                </label>
                {state.errors?.password && (
                  <p role="alert" className="text-error text-xs">{state.errors.password[0]}</p>
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
                className="bg-brand-purple hover:bg-brand-purple-dark disabled:opacity-50 text-white font-semibold py-3 rounded-xl transition-colors mt-2 text-sm md:text-base"
              >
                {isPending ? "Création..." : "Créer mon compte"}
              </button>

            </form>

            <p className="text-text-secondary text-sm text-center">
              Déjà un compte ?{" "}
              <Link
                href="/login"
                className="text-brand-cyan hover:text-brand-cyan/80 font-medium transition-colors"
              >
                Se connecter
              </Link>
            </p>

          </div>
        </main>

        {/* Modale succès */}
        <dialog
          ref={dialogRef}
          className="bg-bg-card border border-brand-purple/20 rounded-2xl p-6 w-[90%] max-w-sm shadow-xl backdrop:bg-black/70"
        >
          <article className="flex flex-col gap-4">
            <header>
              <h2 className="text-lg font-bold text-text-primary">
                Compte créé ! 🎉
              </h2>
            </header>
            <section>
              <p className="text-text-secondary text-sm">
                Bravo, ton compte a bien été créé. Tu peux maintenant te connecter !
              </p>
            </section>
            <footer className="flex justify-end">
              <Link
                href="/login"
                onClick={() => dialogRef.current?.close()}
                className="bg-brand-purple hover:bg-brand-purple-dark text-white px-5 py-2 rounded-xl font-medium transition-colors text-sm"
              >
                Se connecter
              </Link>
            </footer>
          </article>
        </dialog>

      </div>
    </div>
  )
}

//Version with no design
// "use client"
// import { signup, type SignupState } from "@/src/actions/authActions"
// import Link from "next/link"
// import { useActionState, useEffect, useRef } from "react"

// const initialState : SignupState = {}

// export default function CreateAccount(){
//     const [state, formAction, isPending] = useActionState(signup, initialState)
//     const dialogRef = useRef<HTMLDialogElement>(null)

//     useEffect(() => {
//         if(state.success){
//             dialogRef.current?.showModal()
//         }
//     }, [state.success])

//     return(
//         <>
//         <h1>LOGO</h1>
//         <form className="flex flex-col" action={formAction}>
//             <h1>Créer un compte !</h1>

//             <label htmlFor="pseudo">Pseudo</label>
//             {/* On génère les messages d'erreurs */}
//             {state.errors?.pseudo && (
//                 <p className="text-red-500 text-sm">{state.errors.pseudo[0]}</p>
//             )}
//             <input name="pseudo" type="text" placeholder="ex: Superman38" required/>

//             <label htmlFor="firstname">Prénom</label>
//              {state.errors?.firstname && (
//                 <p className="text-red-500 text-sm">{state.errors.firstname[0]}</p>
//             )}
//             <input name="firstname" type="text" placeholder="ex: Clark" required/>

//             <label htmlFor="lastname">Nom de famille</label>
//             {state.errors?.lastname && (
//                 <p className="text-red-500 text-sm">{state.errors.lastname[0]}</p>
//             )}
//             <input type="text" name="lastname" placeholder="ex: Kent" required/>

//             <label htmlFor="email">Email</label>
//              {state.errors?.email && (
//                 <p className="text-red-500 text-sm">{state.errors.email[0]}</p>
//             )}
//             <input type="email" name="email" placeholder="clark.kent@gmail.com" required/>

//             <label htmlFor="password">Mot de Passe</label>
//              {state.errors?.password && (
//                 <p className="text-red-500 text-sm">{state.errors.password[0]}</p>
//             )}
//             <input type="password" name="password" placeholder="ex: iAmSuperman" required/>

//             {/* <label htmlFor="confirmedPassword">Confirmation de Mot de Passe</label>
//             <input type="text" name="confirmedPassword" placeholder="Doit être identique à votre mot de passe" /> */}

//             {/* <Link href="/login"> */}
//             <button type="submit">
//                 {isPending ? "Chargement..." : "Créer mon compte"}
//             </button>
//             {/* </Link> */}
//         </form>

//         <dialog
//             ref={dialogRef}
//             className="rounded-2xl p-6 w-80 shadow-xl backdrop:bg-black/50"
//         >
//             <article className="flex flex-col gap-4">
//                 <header>
//                     <h2 className="text-lg font-bold">Compte créé ! 🎉</h2>
//                 </header>
//                 <section>
//                     <p>Bravo, ton compte a bien été créé. Tu peux maintenant te connecter !</p>
//                 </section>
//                 <footer className="flex justify-end">
//                     <Link href={"/login"} onClick={() => dialogRef.current?.close()} className="px-4 py-2 bg-green-500 text-white rounded-xl">
//                     Se connecter
//                     </Link>
//                 </footer>
//             </article>

//         </dialog>
//         </>
//     )
// }