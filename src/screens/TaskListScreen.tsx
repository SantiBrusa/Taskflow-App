import { View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { COLORS } from "../constants/theme"
import { HomeStackParamList } from "../navigation/types"
import { useTasks } from "../context/TasksContext"
import { TaskItem } from "../components/TaskItem"
import { EmptyState } from "../components/EmptyState"

type Props = NativeStackScreenProps<HomeStackParamList, "TaskList">

export function TaskListScreen({ navigation }: Props) {
    const { tasks, toggleTask } = useTasks()

    return (
        <View style={styles.container}>
            {/* Lleva al formulario */}
            <TouchableOpacity style={styles.newButton} onPress={() => navigation.navigate("TaskForm")}>
                <Text style={styles.newButtonText}>+ Nueva tarea</Text>
            </TouchableOpacity>

            {tasks.length === 0 ? (
                <EmptyState />
            ) : (
                <FlatList
                    data={tasks}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <TaskItem
                            task={item}
                            onSelect={(task) => navigation.navigate("TaskDetail", { taskId: task.id })}
                            onToggle={toggleTask}
                        />
                    )}
                />
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    newButton: {
        backgroundColor: COLORS.primary,
        borderRadius: 20,
        paddingVertical: 10,
        alignItems: "center",
        margin: 20,
    },
    newButtonText: {
        color: COLORS.card,
        fontWeight: "bold",
        fontSize: 16,
    },
})