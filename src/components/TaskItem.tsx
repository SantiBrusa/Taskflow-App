import { Text, TouchableOpacity, View, StyleSheet } from "react-native"
import { COLORS } from "../constants/theme"
import { Task } from "../types/task"

type TaskItemProps = {
    task: Task
    onSelect: (task: Task) => void
    onToggle: (id: string) => void
}

export function TaskItem({ task, onSelect, onToggle }: TaskItemProps) {
    return (
        <View style={styles.item}>
            {/* Tocar el título abre el detalle */}
            <TouchableOpacity style={styles.info} onPress={() => onSelect(task)}>
                <Text style={[styles.text, task.completed && styles.textCompleted]}>
                    {task.title}
                </Text>
                <Text style={styles.category}>{task.category}</Text>
            </TouchableOpacity>

            {/* Botón aparte para marcar como completada (lo del ejercicio anterior) */}
            <TouchableOpacity onPress={() => onToggle(task.id)}>
                <Text style={styles.check}>{task.completed ? "✓" : "○"}</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    item: {
        flexDirection: "row",
        alignItems: "center",
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.border,
        backgroundColor: COLORS.card,
    },
    info: {
        flex: 1,
    },
    text: {
        fontSize: 16,
        color: COLORS.text,
    },
    textCompleted: {
        textDecorationLine: "line-through",
        color: COLORS.textLight,
    },
    category: {
        fontSize: 13,
        color: COLORS.textLight,
        marginTop: 2,
    },
    check: {
        fontSize: 22,
        color: COLORS.primary,
        paddingHorizontal: 8,
    },
})