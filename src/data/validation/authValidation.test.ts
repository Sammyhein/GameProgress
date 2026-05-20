import {describe, test, expect} from "vitest"
import { signupSchema } from "./authValidation"

//'it' apparement est plus utilisé au lieu de 'test' quand on fait un describe

const validData = {
        pseudo: "Superman",
        firstname: "Clark",
        lastname: "Kent",
        email: "clark.kent@gmail.com",
        password: "iAmSuperman74"
}

test("Test avec un objet valide", () => {
    const result= signupSchema.safeParse(validData);
    expect(result.success).toBe(true)
});

test("Test pour voir si le pseudo n'est une chaine de caracère et donc même logique pour firstname et lastname", () => {
    //on change les infos de validData avec un spreadOperator("...")
    const result = signupSchema.safeParse({...validData, pseudo : 123, firstname: 32, lastname: 4444444});

    expect(result.error?.flatten().fieldErrors.pseudo).toStrictEqual(["Le pseudo doit être une chaine de caractère"]);

    expect(result.error?.flatten().fieldErrors.firstname).toStrictEqual(["Le prénom doit être une chaine de caractère"]);

    expect(result.error?.flatten().fieldErrors.lastname).toStrictEqual(["Le nom doit être une chaine de caractère"])
});

test("Test pour voir si le pseudo a moins de 2 caractère et ne peut pas être juste des espaces et donc même logique pour firstname et lastname", () => {
    const result = signupSchema.safeParse({...validData, pseudo: "S", firstname: "", lastname: "   "});

    expect(result.error?.flatten().fieldErrors.pseudo).toStrictEqual(["Le pseudo doit être un minimum de 2 caractère"]);

    expect(result.error?.flatten().fieldErrors.firstname).toStrictEqual(["Le prénom doit être un minimum de 2 caractère"])

    expect(result.error?.flatten().fieldErrors.lastname).toStrictEqual(["Le nom de famille doit être un minimum de 2 caractère"])
})

test("Test pour voir si un mail non valide ne passe pas" , () => {
    const result = signupSchema.safeParse({...validData, email:"hey"})

    expect(result.error?.flatten().fieldErrors.email).toStrictEqual(["Vous devez écrire un email valide. Ex: prenom.nom@gmail.com"])

    const newResult = signupSchema.safeParse({...describe, email:"hey@coucou"})

    expect(newResult.error?.flatten().fieldErrors.email).toStrictEqual(["Vous devez écrire un email valide. Ex: prenom.nom@gmail.com"])
})

test("Verification que le mot de passe a au moins 8 caractères et n'est pas que des espaces", () => {
    const passOne = signupSchema.safeParse({...validData, password: "  "})

    expect(passOne.error?.flatten().fieldErrors.password).toStrictEqual(["Le mot de passe doit être à un minimum de 8 caractères et ne doit pas commencer ou finir par un espace"])

    const passTwo = signupSchema.safeParse({...validData, password: "coucou"})
    
    expect(passTwo.error?.flatten().fieldErrors.password).toStrictEqual(["Le mot de passe doit être à un minimum de 8 caractères et ne doit pas commencer ou finir par un espace"])
})