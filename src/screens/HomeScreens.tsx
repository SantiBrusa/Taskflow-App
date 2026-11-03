import { useState } from "react"
import { StyleSheet, Text, FlatList, View, StatusBar, Platform, Alert } from "react-native"
import { COLORS } from "../constants/theme"
import { Task } from "../types/task"
import { AddTaskForm } from "../components/AddTaskForm"
import { TaskItem } from "../components/TaskItem"
import { EmptyState } from "../components/EmptyState"
import { TaskDetail } from "../components/TaskDetail"

export function HomeScreen() {
    // Arranca vacío para ver el estado vacío
    const [tasks, setTasks] = useState<Task[]>([])
    // null = ninguna tarea seleccionada
    const [selectedTask, setSelectedTask] = useState<Task | null>(null)

    // crea un array nuevo con la tarea al final
    const addTask = (task: Task) => {
        setTasks([...tasks, task])
    }

    // Invierte completed solo en la tarea con ese id
    const toggleTask = (id: string) => {
        setTasks(tasks.map((task) =>
            task.id === id ? { ...task, completed: !task.completed } : task
        ))
    }

    // Pide confirmación antes de borrar para evitar eliminar por error
    const deleteTask = (id: string) => {
        Alert.alert("Eliminar tarea", "¿Seguro que querés eliminar esta tarea?", [
            { text: "Cancelar", style: "cancel" },
            {
                text: "Eliminar",
                style: "destructive",
                onPress: () => {
                    // filter crea un array nuevo sin la tarea borrada
                    setTasks(tasks.filter((task) => task.id !== id))
                    // Se vuelve a la lista, porque el detalle ya no tiene tarea
                    setSelectedTask(null)
                },
            },
        ])
    }

    // Renderizado condicional: si hay tarea seleccionada, solo se muestra el detalle
    if (selectedTask) {
        return (
            <View style={styles.container}>
                <TaskDetail
                    task={selectedTask}
                    onBack={() => setSelectedTask(null)}
                    onDelete={deleteTask}
                />
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>TaskFlow</Text>

            <AddTaskForm onAddTask={addTask} />

            {/* Si no hay tareas, estado vacío; si hay, la lista */}
            {tasks.length === 0 ? (
                <EmptyState />
            ) : (
                <FlatList
                    data={tasks}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <TaskItem
                            task={item}
                            onSelect={setSelectedTask}
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
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 50,
        backgroundColor: COLORS.background,
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "center",
        color: COLORS.text,
    },
})