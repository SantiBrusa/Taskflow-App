import { Alert } from "react-native"
import { useAppSelector } from "../store/hooks"
import { selectUser } from "../store/authSlice"
import { createTask, setTaskCompleted, removeTask } from "../services/tasksService"
import { NewTask, Task } from "../types/task"

export function useTaskActions() {
    const user = useAppSelector(selectUser)

    const handleError = () =>
        Alert.alert("Error", "No se pudo completar la acción. Revisá tu conexión e intentá de nuevo.")

    // No se hace await: sin internet, Firestore guarda la escritura en cola y la envía
    // al reconectar, y el listener ya muestra el cambio. El catch cubre los errores reales.
    return {
        add: (data: NewTask) => {
            if (!user) return
            createTask(user.uid, data).catch(handleError)
        },
        toggle: (task: Task) => {
            setTaskCompleted(task.id, !task.completed).catch(handleError)
        },
        remove: (id: string) => {
            removeTask(id).catch(handleError)
        },
    }
}