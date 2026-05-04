"use server"

import { auth } from "@/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";


export const signup = async (formData: FormData) => {
    const pseudo = formData.get("pseudo") as string
    const firstname = formData.get("firstname") as string;
    const lastname = formData.get("lastname") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    if (!pseudo && !firstname && !lastname && !email && !password) {
        throw Error("Pseudo, firstname, lastname, email and password are required");
    }
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
        console.error("Sign in failed:", await response.json());
        redirect("/auth/signup?error=true");
    }

    redirect("/paths/login"); 
};

export const signin = async (formData: FormData) => {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    if (!email && !password) {
        throw Error("email and password are required");
    }
    const response = await auth.api.signInEmail({
        body: {
            email,
            password,
        },
        asResponse: true,
    });

    if (!response.ok) {
        console.error("Sign in failed:", await response.json());
        redirect("/auth/signin?error=true");
    }

    redirect("/"); // on redirige vers la home page une fois connecté
};

export const signout = async () => {
    await auth.api.signOut({headers: await headers()}); // attention à bien passer les headers !
};