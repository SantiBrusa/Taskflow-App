# TaskFlow App

Aplicación móvil para gestionar tareas, desarrollada con **React Native**, **Expo** y **TypeScript**. Usa **React Navigation** para la navegación y **Redux Toolkit** como estado global.

## Funcionalidades

- Crear tareas con título, descripción y categoría, con validaciones y errores en pantalla.
- Lista de tareas con `FlatList` y estado vacío ("¡No tienes tareas pendientes! Empieza por crear una arriba.").
- **Filtro global** (Todas, Pendientes, Completadas) guardado en el store: no se pierde al cambiar de pestaña.
- Marcar tareas como completadas desde la lista o desde el detalle.
- Ver el detalle de una tarea y eliminarla con confirmación.

## Navegación

```
BottomTabNavigator
├── Home  →  NativeStackNavigator
│            ├── TaskList    (lista, filtros y botón "+ Nueva tarea")
│            ├── TaskDetail  (detalle, completar y eliminar)
│            └── TaskForm    (formulario para agregar tareas)
└── Profile                  (tarjeta de perfil)
```

## Estado global con Redux Toolkit

Todo el estado de las tareas vive en el store; las pantallas no manejan datos locales. Los componentes reciben props y delegan la lógica al store.

**Store:** `src/store/store.ts`, configurado con `configureStore`.

**Slice `tasks`:** `src/store/tasksSlice.ts`, creado con `createSlice`.

Estado inicial:

```ts
{ items: Task[], filter: "all" | "completed" | "pending" }
```

| Reducer | Qué hace |
| --- | --- |
| `addTask` | Recibe los datos del formulario y genera el ID único (`nanoid`), la fecha y `completed: false` |
| `toggleTaskStatus` | Invierte `completed` de la tarea con ese ID |
| `deleteTask` | Elimina la tarea con ese ID |
| `setFilter` | Actualiza el filtro global |

**Selectores:** `selectTasks`, `selectFilter` y `selectFilteredTasks` (con `createSelector`, que solo recalcula cuando cambian las tareas o el filtro).

**Hooks tipados:** `useAppDispatch` y `useAppSelector` en `src/store/hooks.ts`.

## Modelo de datos

```ts
export type Task = {
  id: string
  title: string
  description: string
  category: string
  createdAt: string
  completed: boolean
}
```

## Estructura del proyecto

```
TaskFlow/
├── App.tsx                      # Provider de Redux + AppNavigator
├── package.json
└── src/
    ├── assets/
    ├── components/
    │   ├── AddTaskForm.tsx      # Formulario con validaciones
    │   ├── EmptyState.tsx       # Mensaje cuando no hay tareas
    │   ├── ProfileCard.tsx      # Tarjeta de perfil
    │   ├── TaskDetail.tsx       # Vista de detalle
    │   └── TaskItem.tsx         # Fila de la lista
    ├── constants/
    │   └── theme.ts             # Paleta de colores (COLORS)
    ├── navigation/
    │   ├── AppNavigator.tsx     # Tabs + Stack
    │   └── types.ts             # Tipos de las rutas
    ├── screens/
    │   ├── TaskListScreen.tsx
    │   ├── TaskDetailScreen.tsx
    │   ├── TaskFormScreen.tsx
    │   └── ProfileScreen.tsx
    ├── store/
    │   ├── store.ts             # configureStore
    │   ├── tasksSlice.ts        # createSlice + selectores
    │   └── hooks.ts             # useAppDispatch / useAppSelector
    └── types/
        └── task.ts              # Tipos Task y NewTask
```

## Dependencias principales

- `expo`, `react-native`, `typescript`
- `@reduxjs/toolkit`
- `react-redux`
- `@react-navigation/native`
- `@react-navigation/native-stack`
- `@react-navigation/bottom-tabs`
- `react-native-screens`
- `react-native-safe-area-context`
- `@expo/vector-icons`

## Cómo ejecutarlo localmente

1. Clonar el repositorio e ingresar a la carpeta:

   ```bash
   git clone <url-del-repositorio>
   cd TaskFlow
   ```

2. Cambiar a la rama de esta entrega:

   ```bash
   git checkout feature/redux
   ```

3. Instalar las dependencias:

   ```bash
   npm install
   ```

4. Iniciar el servidor de desarrollo:

   ```bash
   npx expo start
   ```

5. Abrir la app:
   - **Celular:** escanear el QR con Expo Go (misma red Wi-Fi).
   - **Emulador Android:** presionar `a` en la terminal.
   - **Navegador:** presionar `w` en la terminal.

## Tecnologías

- [React Native](https://reactnative.dev/)
- [Expo](https://expo.dev/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [React Navigation](https://reactnavigation.org/)
- [TypeScript](https://www.typescriptlang.org/)