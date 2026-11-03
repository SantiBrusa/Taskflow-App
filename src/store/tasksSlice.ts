import { createSlice, createSelector, nanoid, PayloadAction } from "@reduxjs/toolkit"
import type { RootState } from "./store"
import { Task, NewTask } from "../types/task"

export type Filter = "all" | "completed" | "pending"

type TasksState = {
    items: Task[]
    filter: Filter
}

const initialState: TasksState = {
    items: [],
    filter: "all",
}

const tasksSlice = createSlice({
    name: "tasks",
    initialState,
    reducers: {
        addTask: {
            // El reducer solo guarda; es puro y predecible
            reducer: (state, action: PayloadAction<Task>) => {
                state.items.push(action.payload)
            },
            // prepare genera el id y la fecha ANTES de llegar al reducer
            prepare: (data: NewTask) => ({
                payload: {
                    ...data,
                    id: nanoid(),
                    createdAt: new Date().toLocaleDateString(),
                    completed: false,
                },
            }),
        },
        // Dentro de createSlice se puede "mutar": Immer genera la copia inmutable
        toggleTaskStatus: (state, action: PayloadAction<string>) => {
            const task = state.items.find((t) => t.id === action.payload)
            if (task) {
                task.completed = !task.completed
            }
        },
        deleteTask: (state, action: PayloadAction<string>) => {
            state.items = state.items.filter((t) => t.id !== action.payload)
        },
        setFilter: (state, action: PayloadAction<Filter>) => {
            state.filter = action.payload
        },
    },
})

export const { addTask, toggleTaskStatus, deleteTask, setFilter } = tasksSlice.actions
export default tasksSlice.reducer

// Selectores
export const selectTasks = (state: RootState) => state.tasks.items
export const selectFilter = (state: RootState) => state.tasks.filter

// createSelector memoiza: solo recalcula si cambian las tareas o el filtro
export const selectFilteredTasks = createSelector(
    [selectTasks, selectFilter],
    (tasks, filter) => {
        if (filter === "completed") return tasks.filter((t) => t.completed)
        if (filter === "pending") return tasks.filter((t) => !t.completed)
        return tasks
    }
)