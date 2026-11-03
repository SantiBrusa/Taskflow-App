import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { HomeStackParamList } from "../navigation/types"
import { Task } from "../types/task"
import { useTasks } from "../context/TasksContext"
import { AddTaskForm } from "../components/AddTaskForm"

type Props = NativeStackScreenProps<HomeStackParamList, "TaskForm">

export function TaskFormScreen({ navigation }: Props) {
    const { addTask } = useTasks()

    const handleAdd = (task: Task) => {
        addTask(task)
        navigation.goBack()
    }

    return <AddTaskForm onAddTask={handleAdd} />
}