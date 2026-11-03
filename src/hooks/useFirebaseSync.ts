import { useEffect, useState } from "react"
import { Alert } from "react-native"
import { onAuthStateChanged } from "firebase/auth"
import { collection, onSnapshot, query, where } from "firebase/firestore"
import { auth, db } from "../firebase/firebaseConfig"
import { useAppDispatch, useAppSelector } from "../store/hooks"
import { setUser, selectUser } from "../store/authSlice"
import { setTasks } from "../store/tasksSlice"
import { Task } from "../types/task"

// Restaura la sesión al abrir la app y avisa cada vez que cambia (login/logout)
export function useAuthListener() {
    const dispatch = useAppDispatch()
    // true mientras Firebase todavía está recuperando la sesión
    const [initializing, setInitializing] = useState(true)

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
            dispatch(
                setUser(firebaseUser ? { uid: firebaseUser.uid, email: firebaseUser.email } : null)
            )
            setInitializing(false)
        })
        // Al desmontar se deja de escuchar
        return unsubscribe
    }, [dispatch])

    return initializing
}

// Escucha SOLO las tareas del usuario logueado y las vuelca en Redux
export function useTasksListener() {
    const dispatch = useAppDispatch()
    const uid = useAppSelector(selectUser)?.uid

    useEffect(() => {
        // Sin usuario: se vacía la lista y no se escucha nada
        if (!uid) {
            dispatch(setTasks([]))
            return
        }

        // where filtra en el servidor: solo documentos con userId igual al del usuario
        const q = query(collection(db, "tasks"), where("userId", "==", uid))

        const unsubscribe = onSnapshot(
            q,
            (snapshot) => {
                const tasks = snapshot.docs.map((d) => ({ id: d.id, ...d.data() } as Task))
                dispatch(setTasks(tasks))
            },
            // Si falla la lectura (permisos, red), se avisa sin cerrar la app
            () => Alert.alert("Error", "No se pudieron cargar las tareas. Revisá tu conexión.")
        )

        // Al cerrar sesión o cambiar de usuario, se corta la escucha anterior
        return unsubscribe
    }, [uid, dispatch])
}