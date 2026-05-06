"use server"

import { auth } from "@/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { signupSchema } from "@/src/data/validation/authValidation";

export type SignupState = {
    errors?: {
        pseudo?: string[]
        firstname?: string[]
        lastname?: string[]
        email?: string[]
        password?: string[]
    }
    globalError?: string
}

export type SigninState = {
    globalError? : string
}

export const signup = async (prevState : SignupState, formData: FormData): Promise<SignupState> => {
    const raw = {
    pseudo : formData.get("pseudo") as string,
    firstname : formData.get("firstname") as string,
    lastname : formData.get("lastname") as string,
    email : formData.get("email") as string,
    password : formData.get("password") as string,
    }

    //validation Zod
    const result = signupSchema.safeParse(raw)

    // if (!pseudo && !firstname && !lastname && !email && !password) {
    //     throw Error("Pseudo, firstname, lastname, email and password are required");
    // }

    if(!result.success){
        return{
            errors: result.error.flatten().fieldErrors,
        }
    }

    const { firstname, lastname, pseudo, email, password} = result.data

    const response = await auth.api.signUpEmail({
        body: {
            name: firstname + " " + lastname,
            email,
            password,
            firstname,
            lastname,
            pseudo
        },
        asResponse: true,
    });

    if (!response.ok) {
        // console.error("Sign in failed:", await response.json());
        // redirect("/auth/signup?error=true");
        return { globalError : "Une erreu est survenue, réessaie."}
    }

    redirect("/login"); 
};

export const signin = async (prevState: SigninState, formData: FormData) : Promise<SigninState> => {
    
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (!email || !password) {
        // throw Error("email and password are required");
        return {globalError: "Email et mot de passe requis."}
    }
    const response = await auth.api.signInEmail({
        body: {
            email,
            password,
        },
        asResponse: true,
    });

    if (!response.ok) {
        // console.error("Sign in failed:", await response.json());
        // redirect("/auth/signin?error=true");
        return { globalError: "Email ou mot de passe incorrect"}
    }

    redirect("/search-game"); // on redirige vers la home page une fois connecté
};

export const signout = async () => {
    await auth.api.signOut({headers: await headers()}); // attention à bien passer les headers !
    redirect("/login")
};