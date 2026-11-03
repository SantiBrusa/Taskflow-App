import { createSlice, createSelector, PayloadAction } from "@reduxjs/toolkit"
import type { RootState } from "./store"
import { Task } from "../types/task"

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
        // Reemplaza la lista con lo que llega de Firestore
        setTasks: (state, action: PayloadAction<Task[]>) => {
            state.items = action.payload
        },
        setFilter: (state, action: PayloadAction<Filter>) => {
            state.filter = action.payload
        },
    },
})

export const { setTasks, setFilter } = tasksSlice.actions
export default tasksSlice.reducer

export const selectTasks = (state: RootState) => state.tasks.items
export const selectFilter = (state: RootState) => state.tasks.filter

export const selectFilteredTasks = createSelector(
    [selectTasks, selectFilter],
    (tasks, filter) => {
        if (filter === "completed") return tasks.filter((t) => t.completed)
        if (filter === "pending") return tasks.filter((t) => !t.completed)
        return tasks
    }
)