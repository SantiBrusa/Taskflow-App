# TaskFlow App

Aplicación móvil para gestionar tareas, desarrollada con **React Native**, **Expo** y **TypeScript**. Cada usuario se registra con su email, y sus tareas se guardan en la nube (**Firebase**) y se sincronizan en tiempo real con el estado global (**Redux Toolkit**).

## Funcionalidades

- **Autenticación:** registro e inicio de sesión con email y contraseña, con mensajes de error claros (email inválido, contraseña incorrecta, sin conexión, etc.).
- **Persistencia de sesión:** si el usuario cierra y vuelve a abrir la app, no tiene que loguearse de nuevo.
- **Rutas protegidas:** sin sesión solo existen las pantallas de login y registro; las tareas no son accesibles.
- **Tareas en la nube:** crear, completar y eliminar tareas, guardadas en Firestore.
- **Datos por usuario:** cada persona ve únicamente sus tareas.
- **Filtro global** (Todas, Pendientes, Completadas) guardado en el store.
- Lista con estado vacío, detalle de tarea y cierre de sesión desde el perfil.

## Arquitectura

```
Pantallas ──► useTaskActions ──► Firestore (colección "tasks")
                                      │
                                 onSnapshot (tiempo real)
                                      ▼
                               Redux (tasks) ──► Pantallas
```

Firestore es la **fuente de verdad**: las pantallas escriben en la base y un listener (`onSnapshot`) actualiza el store de Redux. Así la interfaz siempre muestra lo que hay guardado y no pueden quedar datos desincronizados.

### Navegación

```
AppNavigator
├── Sin sesión  →  AuthStack
│                  ├── Login
│                  └── Register
└── Con sesión  →  BottomTabNavigator
                   ├── Home  →  NativeStackNavigator
                   │            ├── TaskList
                   │            ├── TaskDetail
                   │            └── TaskForm
                   └── Profile
```

### Autenticación y sesión

- `createAccount` y `signIn` están en `src/services/authService.ts`.
- `onAuthStateChanged` (en `src/hooks/useFirebaseSync.ts`) restaura la sesión al abrir la app y guarda el usuario (`uid` y `email`) en Redux.
- La persistencia usa `AsyncStorage`, configurada en `src/firebase/firebaseConfig.ts`.

### CRUD en Firestore

Colección `tasks`, con documentos de esta forma:

```json
{
  "title": "Revisar surtidores",
  "description": "Controlar el estado de las mangueras",
  "category": "Mantenimiento",
  "completed": false,
  "createdAt": "3/11/2026",
  "userId": "<uid del usuario>"
}
```

| Operación | Implementación |
| --- | --- |
| Crear | `addDoc` con el `userId` del usuario logueado |
| Leer | `onSnapshot` con `where("userId", "==", uid)` |
| Actualizar | `updateDoc` para el estado completada/pendiente |
| Borrar | `deleteDoc` |

### Estado global con Redux Toolkit

- **`authSlice`:** guarda el usuario actual (`setUser`).
- **`tasksSlice`:** guarda las tareas recibidas de Firestore (`setTasks`) y el filtro (`setFilter`), con los selectores `selectTasks`, `selectFilter` y `selectFilteredTasks`.

### Seguridad

Las reglas de Firestore garantizan que cada usuario solo acceda a sus propios datos:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /tasks/{taskId} {
      allow read, update, delete: if request.auth != null
                                  && resource.data.userId == request.auth.uid;
      allow create: if request.auth != null
                    && request.resource.data.userId == request.auth.uid;
    }
  }
}
```

### Manejo de errores

- Los errores de autenticación se traducen a mensajes para el usuario.
- Los formularios se validan antes de llamar a Firebase.
- Las escrituras y lecturas fallidas muestran una alerta en lugar de cerrar la app.
- Sin conexión, Firestore deja las escrituras en cola y las envía al reconectar.

## Estructura del proyecto

```
taskflow-app/
├── App.tsx                      # Provider de Redux + AppNavigator
├── .env.example                 # Plantilla de variables de entorno
├── package.json
└── src/
    ├── components/
    │   ├── AddTaskForm.tsx
    │   ├── AuthForm.tsx         # Formulario reutilizable de login y registro
    │   ├── EmptyState.tsx
    │   ├── ProfileCards.tsx
    │   ├── TaskDetail.tsx
    │   └── TaskItem.tsx
    ├── constants/
    │   └── theme.ts
    ├── firebase/
    │   └── firebaseConfig.ts    # Exporta auth y db
    ├── hooks/
    │   ├── useFirebaseSync.ts   # Sesión y listener de tareas
    │   └── useTaskActions.ts    # Crear, completar y borrar
    ├── navigation/
    │   ├── AppNavigator.tsx
    │   └── types.ts
    ├── screens/
    │   ├── LoginScreen.tsx
    │   ├── RegisterScreen.tsx
    │   ├── TaskListScreen.tsx
    │   ├── TaskDetailScreen.tsx
    │   ├── TaskFormScreen.tsx
    │   └── ProfileScreens.tsx
    ├── services/
    │   ├── authService.ts
    │   └── tasksService.ts
    ├── store/
    │   ├── authSlice.ts
    │   ├── hooks.ts
    │   ├── store.ts
    │   └── tasksSlice.ts
    └── types/
        └── task.ts
```

## Dependencias principales

- `expo`, `react-native`, `typescript`
- `firebase`
- `@react-native-async-storage/async-storage`
- `@reduxjs/toolkit` y `react-redux`
- `@react-navigation/native`, `@react-navigation/native-stack` y `@react-navigation/bottom-tabs`
- `react-native-screens` y `react-native-safe-area-context`
- `@expo/vector-icons`

## Configuración de Firebase

1. Creá un proyecto en la [consola de Firebase](https://console.firebase.google.com/) y registrá una app **Web** para obtener la configuración.
2. En **Authentication → Sign-in method**, activá **Email/Password**.
3. En **Firestore Database**, creá la base de datos en modo producción y publicá las reglas de la sección *Seguridad*.
4. Copiá `.env.example` a `.env` y completá tus credenciales:

   ```
   EXPO_PUBLIC_FIREBASE_API_KEY=
   EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=
   EXPO_PUBLIC_FIREBASE_PROJECT_ID=
   EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=
   EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
   EXPO_PUBLIC_FIREBASE_APP_ID=
   ```

   El archivo `.env` está en `.gitignore` y no se sube al repositorio.

## Cómo ejecutarlo localmente

1. Clonar el repositorio e ingresar a la carpeta:

   ```bash
   git clone <url-del-repositorio>
   cd taskflow-app
   ```

2. Cambiar a la rama de esta entrega:

   ```bash
   git checkout feature/firebase
   ```

3. Instalar las dependencias:

   ```bash
   npm install
   ```

4. Configurar Firebase (sección anterior).

5. Iniciar el servidor de desarrollo:

   ```bash
   npx expo start
   ```

6. Abrir la app:
   - **Celular:** escanear el QR con Expo Go (misma red Wi-Fi).
   - **Emulador Android:** presionar `a` en la terminal.
   - **Navegador:** presionar `w` en la terminal.

## Tecnologías

- [React Native](https://reactnative.dev/)
- [Expo](https://expo.dev/)
- [Firebase](https://firebase.google.com/) (Authentication y Firestore)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [React Navigation](https://reactnavigation.org/)
- [TypeScript](https://www.typescriptlang.org/)