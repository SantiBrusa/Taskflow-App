import { addDoc, collection, deleteDoc, doc, updateDoc } from "firebase/firestore"
import { db } from "../firebase/firebaseConfig"
import { NewTask } from "../types/task"

// Crear: guarda la tarea con el userId del usuario actual
export const createTask = (userId: string, data: NewTask) =>
    addDoc(collection(db, "tasks"), {
        ...data,
        userId,
        completed: false,
        createdAt: new Date().toLocaleDateString(),
    })

// Actualizar: el estado completada/pendiente también se guarda en Firestore
export const setTaskCompleted = (id: string, completed: boolean) =>
    updateDoc(doc(db, "tasks", id), { completed })

// Borrar
export const removeTask = (id: string) => deleteDoc(doc(db, "tasks", id))