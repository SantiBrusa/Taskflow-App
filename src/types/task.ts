export type Task = {
    id: string
    title: string
    description: string
    category: string
    createdAt: string
    completed: boolean
    userId: string
}

// Lo que aporta el formulario; el resto lo completa el servicio
export type NewTask = Omit<Task, "id" | "createdAt" | "completed" | "userId">