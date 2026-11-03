import { Alert } from "react-native"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { HomeStackParamList } from "../navigation/types"
import { useTasks } from "../context/TasksContext"
import { TaskDetail } from "../components/TaskDetail"

type Props = NativeStackScreenProps<HomeStackParamList, "TaskDetail">

export function TaskDetailScreen({ route, navigation }: Props) {
    // El ID llega por parámetros; la tarea se busca en el estado compartido
    const { taskId } = route.params
    const { tasks, deleteTask } = useTasks()
    const task = tasks.find((t) => t.id === taskId)

    // Mientras se borra, la tarea deja de existir: no hay nada que mostrar
    if (!task) return null

    const handleDelete = (id: string) => {
        Alert.alert("Eliminar tarea", "¿Seguro que querés eliminar esta tarea?", [
            { text: "Cancelar", style: "cancel" },
            {
                text: "Eliminar",
                style: "destructive",
                onPress: () => {
                    deleteTask(id)
                    navigation.goBack()
                },
            },
        ])
    }

    return (
        <TaskDetail
            task={task}
            onBack={() => navigation.goBack()}
            onDelete={handleDelete}
        />
    )
}