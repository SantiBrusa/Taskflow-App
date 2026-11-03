// Define qué parámetros recibe cada pantalla
export type HomeStackParamList = {
    TaskList: undefined
    TaskDetail: { taskId: string }   // solo viaja el id, no la tarea completa
    TaskForm: undefined
}

export type RootTabParamList = {
    Home: undefined
    Profile: undefined
}