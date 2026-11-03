import { View, Text, TouchableOpacity, StyleSheet } from "react-native"
import { COLORS } from "../constants/theme"
import { Task } from "../types/task"

type TaskDetailProps = {
    task: Task
    onBack: () => void
    onDelete: (id: string) => void
    onToggle: () => void
}

export function TaskDetail({ task, onBack, onDelete, onToggle }: TaskDetailProps) {
    return (
        <View style={styles.container}>
            <View style={styles.card}>
                <Text style={styles.title}>{task.title}</Text>

                <Text style={styles.label}>Descripción</Text>
                <Text style={styles.value}>{task.description}</Text>

                <Text style={styles.label}>Categoría</Text>
                <Text style={styles.value}>{task.category}</Text>

                <Text style={styles.label}>Fecha de creación</Text>
                <Text style={styles.value}>{task.createdAt}</Text>

                <Text style={styles.label}>Estado</Text>
                <Text style={styles.value}>{task.completed ? "Completada" : "Pendiente"}</Text>
            </View>

            <TouchableOpacity style={styles.toggleButton} onPress={onToggle}>
                <Text style={styles.toggleText}>
                    {task.completed ? "Marcar como pendiente" : "Marcar como completada"}
                </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={onBack}>
                <Text style={styles.buttonText}>Volver</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.deleteButton} onPress={() => onDelete(task.id)}>
                <Text style={styles.buttonText}>Eliminar</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: COLORS.background,
    },
    card: {
        backgroundColor: COLORS.card,
        borderRadius: 12,
        padding: 20,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 3,
    },
    title: {
        fontSize: 22,
        fontWeight: "bold",
        color: COLORS.text,
        marginBottom: 12,
    },
    label: {
        fontSize: 13,
        fontWeight: "600",
        color: COLORS.textLight,
        marginTop: 12,
    },
    value: {
        fontSize: 16,
        color: COLORS.text,
        marginTop: 2,
    },
    button: {
        backgroundColor: COLORS.primary,
        borderRadius: 20,
        paddingVertical: 10,
        alignItems: "center",
        marginTop: 20,
    },
    buttonText: {
        color: COLORS.card,
        fontWeight: "bold",
        fontSize: 16,
    },
    deleteButton: {
        backgroundColor: COLORS.danger,
        borderRadius: 20,
        paddingVertical: 10,
        alignItems: "center",
        marginTop: 12,
    },
    toggleButton: {
        borderWidth: 1.5,
        borderColor: COLORS.primary,
        borderRadius: 20,
        paddingVertical: 10,
        alignItems: "center",
        marginTop: 20,
    },
    toggleText: {
        color: COLORS.primary,
        fontWeight: "bold",
        fontSize: 16,
    },
})