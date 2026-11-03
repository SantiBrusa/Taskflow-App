import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
} from "firebase/auth"
import { auth } from "../firebase/firebaseConfig"

export const createAccount = (email: string, password: string) =>
    createUserWithEmailAndPassword(auth, email, password)

export const signIn = (email: string, password: string) =>
    signInWithEmailAndPassword(auth, email, password)

export const logOut = () => signOut(auth)

// Traduce los códigos de error de Firebase a mensajes para el usuario
export function getAuthErrorMessage(error: unknown): string {
    const code = (error as { code?: string }).code

    switch (code) {
        case "auth/invalid-email":
            return "El email no es válido"
        case "auth/email-already-in-use":
            return "Ese email ya está registrado"
        case "auth/weak-password":
            return "La contraseña debe tener al menos 6 caracteres"
        case "auth/invalid-credential":
        case "auth/user-not-found":
        case "auth/wrong-password":
            return "Email o contraseña incorrectos"
        case "auth/network-request-failed":
            return "Sin conexión. Revisá tu internet e intentá de nuevo"
        case "auth/too-many-requests":
            return "Demasiados intentos. Probá de nuevo más tarde"
        default:
            return "Ocurrió un error inesperado. Intentá de nuevo"
    }
}