# TaskFlow App

Aplicación móvil desarrollada con **React Native**, **Expo** y **TypeScript**. Esta entrega suma a la estructura base un **formulario de creación de tareas** con validaciones, manejo de estado local y estilos dinámicos.

## Funcionalidades

### Formulario de creación de tareas (`AddTaskForm`)

Ubicado en `src/components/AddTaskForm.tsx`. Permite cargar una tarea con:

- **Título** (`TextInput`)
- **Descripción** (`TextInput` multilínea)
- **Categoría** (set de botones: Mantenimiento, Limpieza, Administración)

#### Estado local

Cada campo se maneja con `useState` como componente controlado (`value` + `onChangeText`). Además hay estados para los errores y para el campo que está enfocado.

#### Validaciones

| Campo | Regla |
| --- | --- |
| Título | Obligatorio, mínimo 5 caracteres |
| Descripción | Obligatoria, mínimo 10 caracteres |
| Categoría | Siempre hay una seleccionada por defecto (la primera) |

Se usa `trim()` para que los espacios en blanco no cuenten como contenido. Los errores aparecen en rojo debajo de cada campo al intentar guardar.

#### Interfaz

- El borde de cada input cambia de color: **gris** en reposo, **violeta** al estar en foco y **rojo** si hay error (el error tiene prioridad sobre el foco).
- La categoría seleccionada se resalta con el color primario.
- El botón **Guardar** es un `TouchableOpacity`.
- El teclado se cierra al tocar fuera de los campos (`Keyboard.dismiss`), útil en iPhone con el campo multilínea.
- `autoCapitalize="sentences"` en título y descripción para escribir más cómodo en mobile.

#### Simulación de API: `handleAddTask`

1. Valida los campos y actualiza los errores.
2. Si hay errores, corta y los muestra.
3. Si todo es válido, arma el objeto de la tarea, lo muestra por consola, dispara `Alert.alert("Éxito", "Tarea capturada localmente")` y limpia el formulario.

Ejemplo del objeto que se imprime en consola:

```json
{
  "title": "Revisar surtidores",
  "description": "Controlar el estado de las mangueras del sector 2",
  "category": "Mantenimiento"
}
```

### Componente `ProfileCard`

Tarjeta de perfil reutilizable ubicada en `src/components/ProfileCard.tsx`.

| Prop | Tipo | Descripción |
| --- | --- | --- |
| `name` | `string` | Nombre de la persona |
| `role` | `string` | Rol |
| `image` | `string` | URL de la imagen del avatar |

Recibe todos los datos por props y usa `StyleSheet` con bordes redondeados, sombra y padding.

```tsx
<ProfileCard
  name="Santino Vissani"
  role="Desarrollador Full Stack"
  image="https://i.pravatar.cc/150?img=55"
/>
```

## Pantallas

- **AddTaskForm**: es lo que se renderiza actualmente desde `App.tsx`.
- **ProfileScreen**: muestra el `ProfileCard` con datos de prueba.
- **HomeScreen**: creada y lista para desarrollarse; todavía no tiene navegación.

## Estructura del proyecto

```
taskflow-app/
├── App.tsx
├── app.json
├── index.ts
├── tsconfig.json
├── package.json
└── src/
    ├── assets/
    ├── components/
    │   ├── AddTaskForm.tsx      # Formulario de creación de tareas
    │   └── ProfileCard.tsx      # Tarjeta de perfil reutilizable
    ├── constants/
    │   └── theme.ts             # Paleta de colores (COLORS)
    └── screens/
        ├── HomeScreen.tsx
        └── ProfileScreen.tsx
```

## Paleta de colores

Definida en `src/constants/theme.ts` como `COLORS`:

| Nombre | Uso |
| --- | --- |
| `primary` | Color principal, foco de inputs y botones |
| `background` | Fondo de las pantallas |
| `card` | Fondo de inputs y tarjetas |
| `text` | Texto principal |
| `textLight` | Texto secundario y placeholders |
| `border` | Bordes en reposo |
| `success` | Estados exitosos |
| `danger` | Errores |

## Cómo ejecutarlo localmente

1. Clonar el repositorio e ingresar a la carpeta:

   ```bash
   git clone <url-del-repositorio>
   cd TaskFlow
   ```

2. Cambiar a la rama del formulario:

   ```bash
   git checkout feature/add-task-form
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