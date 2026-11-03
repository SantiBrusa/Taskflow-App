# TaskFlow App

Aplicación móvil para gestionar tareas, desarrollada con **React Native**, **Expo** y **TypeScript**. Integra los componentes de las entregas anteriores en un flujo de navegación con **React Navigation**.

## Navegación

```
BottomTabNavigator
├── Home  →  NativeStackNavigator
│            ├── TaskList    (lista de tareas)
│            ├── TaskDetail  (detalle de la tarea seleccionada)
│            └── TaskForm    (formulario para agregar tareas)
└── Profile                  (tarjeta de perfil)
```

- **Tabs:** `Home` y `Profile`, con iconos de Ionicons (versión rellena en la pestaña activa).
- **TaskList → TaskDetail:** al tocar una tarea se navega pasando su `taskId` por parámetros. El detalle busca la tarea en el estado compartido.
- **TaskList → TaskForm:** el botón "+ Nueva tarea" abre el formulario.
- **TaskForm → TaskList:** al guardar, se vuelve a la lista (`navigation.navigate('TaskList')`).
- **TaskDetail:** se puede volver con la flecha nativa del header o con el botón "Volver".

## Funcionalidades

- Crear tareas con título, descripción y categoría, con validaciones y errores en pantalla.
- Lista con `FlatList` y estado vacío ("¡No tienes tareas pendientes! Empieza por crear una arriba.").
- Marcar tareas como completadas (el título se tacha).
- Ver el detalle de una tarea y eliminarla con confirmación.

## Estado compartido

Las pantallas del stack comparten las tareas mediante un **Context** (`src/context/TasksContext.tsx`), que expone `tasks`, `addTask`, `toggleTask` y `deleteTask`. Todas las actualizaciones son inmutables (`[...prev, task]`, `map` y `filter`).

## Estructura del proyecto

```
TaskFlow/
├── App.tsx                      # TasksProvider + AppNavigator
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
    ├── context/
    │   └── TasksContext.tsx     # Estado compartido de tareas
    ├── navigation/
    │   ├── AppNavigator.tsx     # Configuración principal (Tabs + Stack)
    │   └── types.ts             # Tipos de las rutas
    ├── screens/
    │   ├── TaskListScreen.tsx
    │   ├── TaskDetailScreen.tsx
    │   ├── TaskFormScreen.tsx
    │   └── ProfileScreen.tsx
    └── types/
        └── task.ts              # Tipo Task
```

## Dependencias principales

- `expo`, `react-native`, `typescript`
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
   git checkout feature/navigation
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
- [React Navigation](https://reactnavigation.org/)
- [TypeScript](https://www.typescriptlang.org/)