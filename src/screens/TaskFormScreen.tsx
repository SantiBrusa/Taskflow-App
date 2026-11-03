import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { HomeStackParamList } from "../navigation/types"
import { NewTask } from "../types/task"
import { useAppDispatch } from "../store/hooks"
import { addTask } from "../store/tasksSlice"
import { AddTaskForm } from "../components/AddTaskForm"

type Props = NativeStackScreenProps<HomeStackParamList, "TaskForm">

export function TaskFormScreen({ navigation }: Props) {
    const dispatch = useAppDispatch()

    const handleAdd = (data: NewTask) => {
        dispatch(addTask(data))
        navigation.goBack()
    }

    return <AddTaskForm onAddTask={handleAdd} />
}