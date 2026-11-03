import { TasksProvider } from "./src/context/TasksContext"
import AppNavigator from "./src/navigation/AppNavigator"

export default function App() {
  return (
    // El Provider envuelve todo para que cualquier pantalla acceda a las tareas
    <TasksProvider>
      <AppNavigator />
    </TasksProvider>
  )
}