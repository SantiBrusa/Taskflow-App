import { View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { COLORS } from "../constants/theme"
import { HomeStackParamList } from "../navigation/types"
import { useAppDispatch, useAppSelector } from "../store/hooks"
import {
    Filter,
    selectTasks,
    selectFilter,
    selectFilteredTasks,
    setFilter,
    toggleTaskStatus,
} from "../store/tasksSlice"
import { TaskItem } from "../components/TaskItem"
import { EmptyState } from "../components/EmptyState"

type Props = NativeStackScreenProps<HomeStackParamList, "TaskList">

const FILTERS: { value: Filter; label: string }[] = [
    { value: "all", label: "Todas" },
    { value: "pending", label: "Pendientes" },
    { value: "completed", label: "Completadas" },
]

export function TaskListScreen({ navigation }: Props) {
    const dispatch = useAppDispatch()
    const allTasks = useAppSelector(selectTasks)
    const tasks = useAppSelector(selectFilteredTasks)
    const filter = useAppSelector(selectFilter)

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.newButton} onPress={() => navigation.navigate("TaskForm")}>
                <Text style={styles.newButtonText}>+ Nueva tarea</Text>
            </TouchableOpacity>

            {/* Filtro global: vive en el store, así que no se pierde al cambiar de pestaña */}
            <View style={styles.filters}>
                {FILTERS.map((f) => (
                    <TouchableOpacity
                        key={f.value}
                        style={[styles.chip, f.value === filter && styles.chipSelected]}
                        onPress={() => dispatch(setFilter(f.value))}
                    >
                        <Text style={[styles.chipText, f.value === filter && styles.chipTextSelected]}>
                            {f.label}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>

            {/* Sin tareas en absoluto → estado vacío; si el filtro no encuentra nada → aviso corto */}
            {allTasks.length === 0 ? (
                <EmptyState />
            ) : (
                <FlatList
                    data={tasks}
                    keyExtractor={(item) => item.id}
                    ListEmptyComponent={<Text style={styles.noResults}>No hay tareas con este filtro</Text>}
                    renderItem={({ item }) => (
                        <TaskItem
                            task={item}
                            onSelect={(task) => navigation.navigate("TaskDetail", { taskId: task.id })}
                            onToggle={(id) => dispatch(toggleTaskStatus(id))}
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
        marginHorizontal: 20,
        marginTop: 20,
    },
    newButtonText: {
        color: COLORS.card,
        fontWeight: "bold",
        fontSize: 16,
    },
    filters: {
        flexDirection: "row",
        gap: 8,
        margin: 20,
    },
    chip: {
        paddingHorizontal: 14,
        paddingVertical: 8,
        borderRadius: 20,
        borderWidth: 1.5,
        borderColor: COLORS.border,
        backgroundColor: COLORS.card,
    },
    chipSelected: {
        backgroundColor: COLORS.primary,
        borderColor: COLORS.primary,
    },
    chipText: {
        color: COLORS.textLight,
    },
    chipTextSelected: {
        color: COLORS.card,
    },
    noResults: {
        textAlign: "center",
        color: COLORS.textLight,
        marginTop: 20,
    },
})