import { Alert } from "react-native"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { HomeStackParamList } from "../navigation/types"
import { useAppDispatch, useAppSelector } from "../store/hooks"
import { deleteTask, toggleTaskStatus } from "../store/tasksSlice"
import { TaskDetail } from "../components/TaskDetail"

type Props = NativeStackScreenProps<HomeStackParamList, "TaskDetail">

export function TaskDetailScreen({ route, navigation }: Props) {
    const { taskId } = route.params
    const dispatch = useAppDispatch()
    const task = useAppSelector((state) => state.tasks.items.find((t) => t.id === taskId))

    // Los hooks van antes de este return; si la tarea se borró, no hay nada que mostrar
    if (!task) return null

    const handleDelete = (id: string) => {
        Alert.alert("Eliminar tarea", "¿Seguro que querés eliminar esta tarea?", [
            { text: "Cancelar", style: "cancel" },
            {
                text: "Eliminar",
                style: "destructive",
                onPress: () => {
                    dispatch(deleteTask(id))
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
            onToggle={() => dispatch(toggleTaskStatus(task.id))}
        />
    )
}