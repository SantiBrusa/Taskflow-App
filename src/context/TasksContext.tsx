import { createContext, useContext, useState, ReactNode } from "react"
import { Task } from "../types/task"

type TasksContextType = {
    tasks: Task[]
    addTask: (task: Task) => void
    toggleTask: (id: string) => void
    deleteTask: (id: string) => void
}

const TasksContext = createContext<TasksContextType | undefined>(undefined)

// Provider: guarda el estado y lo reparte a toda la app
export function TasksProvider({ children }: { children: ReactNode }) {
    const [tasks, setTasks] = useState<Task[]>([])

    const addTask = (task: Task) => setTasks((prev) => [...prev, task])

    const toggleTask = (id: string) =>
        setTasks((prev) =>
            prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
        )

    const deleteTask = (id: string) =>
        setTasks((prev) => prev.filter((t) => t.id !== id))

    return (
        <TasksContext.Provider value={{ tasks, addTask, toggleTask, deleteTask }}>
            {children}
        </TasksContext.Provider>
    )
}

// Hook para usar el estado desde cualquier pantalla
export function useTasks() {
    const context = useContext(TasksContext)
    if (!context) {
        throw new Error("useTasks debe usarse dentro de un TasksProvider")
    }
    return context
}