# TaskFlow App

Aplicación móvil para gestionar tareas, desarrollada con **React Native**, **Expo** y **TypeScript**. Permite crear tareas con un formulario validado, verlas en una lista, marcarlas como completadas, consultar su detalle y eliminarlas.

## Funcionalidades

- **Crear tareas** con título, descripción y categoría, con validaciones y errores en pantalla.
- **Lista de tareas** con `FlatList` (virtualizada y con identificadores estables).
- **Estado vacío:** si no hay tareas se muestra el mensaje "¡No tienes tareas pendientes! Empieza por crear una arriba."
- **Marcar como completada:** el círculo de cada fila alterna entre pendiente (○) y completada (✓), y el título se tacha.
- **Detalle de tarea:** al tocar una tarea se oculta la lista y el formulario y se muestra su información completa.
- **Volver:** el botón regresa a la lista.
- **Eliminar:** borra la tarea (con confirmación) y vuelve a la lista; si era la última, reaparece el estado vacío.

## Pantallas y componentes

### `HomeScreen`

Pantalla principal. Concentra el estado de la app:

- `tasks`: arreglo de tareas (arranca vacío).
- `selectedTask`: tarea seleccionada, o `null` si no hay ninguna.

Usa **renderizado condicional**:

- Si `selectedTask` tiene valor, muestra solo `TaskDetail`.
- Si no, muestra `AddTaskForm` y, debajo, el `EmptyState` (sin tareas) o la `FlatList` (con tareas).

Todas las actualizaciones del estado son **inmutables**: `[...tasks, task]` para agregar, `map` para completar y `filter` para eliminar.

### `AddTaskForm`

Formulario de creación (`src/components/AddTaskForm.tsx`).

| Campo | Regla |
| --- | --- |
| Título | Obligatorio, mínimo 5 caracteres |
| Descripción | Obligatoria, mínimo 10 caracteres |
| Categoría | Siempre hay una seleccionada por defecto |

- Inputs controlados con `useState`.
- Borde dinámico: gris en reposo, violeta en foco y rojo con error (el error tiene prioridad).
- Mensajes de error en rojo debajo de cada campo al intentar guardar.
- Al tocar fuera de los campos se cierra el teclado.
- Si todo es válido, arma la tarea, muestra un `Alert`, la entrega a `HomeScreen` mediante la prop `onAddTask` y limpia el formulario.

### `TaskItem`

Fila de la lista. Tocar el título selecciona la tarea; el botón de la derecha alterna su estado de completada. Recibe todo por props (`task`, `onSelect`, `onToggle`).

### `EmptyState`

Mensaje que se muestra cuando no hay tareas.

### `TaskDetail`

Muestra el detalle de la tarea seleccionada.

| Prop | Tipo | Descripción |
| --- | --- | --- |
| `task` | `Task` | Tarea a mostrar |
| `onBack` | `() => void` | Vuelve a la lista |
| `onDelete` | `(id: string) => void` | Elimina la tarea |

Muestra título, descripción, categoría, fecha de creación y estado, con los botones **Volver** y **Eliminar**.

### `ProfileCard`

Tarjeta de perfil reutilizable de la entrega anterior (`name`, `role` e `image` por props). Se mantiene en `src/components/`.

## Modelo de datos

Definido en `src/types/task.ts`:

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
├── App.tsx
├── app.json
├── index.ts
├── tsconfig.json
├── package.json
└── src/
    ├── assets/
    ├── components/
    │   ├── AddTaskForm.tsx      # Formulario con validaciones
    │   ├── EmptyState.tsx       # Mensaje cuando no hay tareas
    │   ├── ProfileCard.tsx      # Tarjeta de perfil reutilizable
    │   ├── TaskDetail.tsx       # Detalle de una tarea
    │   └── TaskItem.tsx         # Fila de la lista
    ├── constants/
    │   └── theme.ts             # Paleta de colores (COLORS)
    ├── screens/
    │   ├── HomeScreen.tsx       # Pantalla principal y estado
    │   └── ProfileScreen.tsx
    └── types/
        └── task.ts              # Tipo Task
```

## Paleta de colores

Definida en `src/constants/theme.ts` como `COLORS`:

| Nombre | Uso |
| --- | --- |
| `primary` | Color principal, foco de inputs y botones |
| `background` | Fondo de las pantallas |
| `card` | Fondo de inputs, filas y tarjetas |
| `text` | Texto principal |
| `textLight` | Texto secundario y placeholders |
| `border` | Bordes en reposo |
| `success` | Estados exitosos |
| `danger` | Errores y botón de eliminar |

## Cómo ejecutarlo localmente

1. Clonar el repositorio e ingresar a la carpeta:

   ```bash
   git clone <url-del-repositorio>
   cd TaskFlow
   ```

2. Cambiar a la rama de esta entrega:

   ```bash
   git checkout feature/task-detail
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
- [TypeScript](https://www.typescriptlang.org/)