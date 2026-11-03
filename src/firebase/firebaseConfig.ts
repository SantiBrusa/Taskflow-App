import { initializeApp, getApps, getApp } from "firebase/app"
import { initializeAuth, getAuth, Auth } from "firebase/auth"
// @ts-ignore: los tipos de Firebase no declaran getReactNativePersistence, pero existe en ejecución
import { getReactNativePersistence } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
import AsyncStorage from "@react-native-async-storage/async-storage"

const firebaseConfig = {
    apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
}

// Evita inicializar dos veces al recargar la app en desarrollo
const app = getApps().length ? getApp() : initializeApp(firebaseConfig)

// La persistencia con AsyncStorage es lo que permite restaurar la sesión al reabrir la app
let auth: Auth
try {
    auth = initializeAuth(app, {
        persistence: getReactNativePersistence(AsyncStorage),
    })
} catch {
    // Si ya estaba inicializado (recarga rápida), se reutiliza
    auth = getAuth(app)
}

export { auth }
export const db = getFirestore(app)