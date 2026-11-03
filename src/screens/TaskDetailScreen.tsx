import { Alert } from "react-native"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { HomeStackParamList } from "../navigation/types"
import { useAppSelector } from "../store/hooks"
import { useTaskActions } from "../hooks/useTasksActions"
import { TaskDetail } from "../components/TaskDetail"

type Props = NativeStackScreenProps<HomeStackParamList, "TaskDetail">

export function TaskDetailScreen({ route, navigation }: Props) {
    const { taskId } = route.params
    const { toggle, remove } = useTaskActions()
    const task = useAppSelector((state) => state.tasks.items.find((t) => t.id === taskId))

    // Si la tarea ya no existe (se borró), no hay nada que mostrar
    if (!task) return null

    const handleDelete = (id: string) => {
        Alert.alert("Eliminar tarea", "¿Seguro que querés eliminar esta tarea?", [
            { text: "Cancelar", style: "cancel" },
            {
                text: "Eliminar",
                style: "destructive",
                onPress: () => {
                    remove(id)
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
            onToggle={() => toggle(task)}
        />
    )
}