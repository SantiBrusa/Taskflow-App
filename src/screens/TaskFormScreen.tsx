import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { HomeStackParamList } from "../navigation/types"
import { NewTask } from "../types/task"
import { useTaskActions } from "../hooks/useTasksActions"
import { AddTaskForm } from "../components/AddTaskForm"

type Props = NativeStackScreenProps<HomeStackParamList, "TaskForm">

export function TaskFormScreen({ navigation }: Props) {
    const { add } = useTaskActions()

    const handleAdd = (data: NewTask) => {
        add(data)
        navigation.goBack()
    }

    return <AddTaskForm onAddTask={handleAdd} />
}