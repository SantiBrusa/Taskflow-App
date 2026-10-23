# TaskFlow App

Aplicación móvil desarrollada con **React Native**, **Expo** y **TypeScript**. En esta entrega se transformó el proyecto base en una app con una estructura profesional, enfocada en la organización del código y en la creación de componentes reutilizables.

## Pantallas visualizadas

- **ProfileScreen**: pantalla que se renderiza actualmente desde `App.tsx`. Muestra el componente `ProfileCard` con datos de prueba (nombre, rol e imagen de placeholder) recibidos por props.
- **HomeScreen**: pantalla inicial creada y lista para desarrollarse. Todavía no tiene navegación, por lo que no se muestra en la app.

## Componente `ProfileCard`

Tarjeta de perfil reutilizable ubicada en `src/components/ProfileCard.tsx`.

| Prop | Tipo | Descripción |
| --- | --- | --- |
| `name` | `string` | Nombre de la persona |
| `role` | `string` | Rol |
| `image` | `string` | URL de la imagen del avatar |

Características:

- Recibe toda la información por props (no hay datos escritos a fuego dentro del componente).
- Usa `<Image />` de React Native para el avatar.
- Estilos con `StyleSheet`: bordes redondeados, sombra y padding.
- Los colores se toman desde `src/constants/`, sin valores repetidos en el componente.

Ejemplo de uso:

```tsx
<ProfileCard
  name="Santino Vissani"
  role="Desarrollador Full Stack"
  image="https://i.pravatar.cc/150?img=55"
/>
```

## Estructura del proyecto

```
taskflow-app/
├── App.tsx                      # Renderiza ProfileScreen
├── app.json
├── index.ts
├── tsconfig.json
├── package.json
└── src/
    ├── assets/                  # Imágenes y recursos
    ├── components/
    │   └── ProfileCard.tsx      # Tarjeta de perfil reutilizable
    ├── constants/
    │   └── theme.ts            # Paleta de colores de TaskFlow
    └── screens/
        ├── HomeScreen.tsx
        └── ProfileScreen.tsx
```

## Paleta de colores

Definida en `src/constants/colors.ts`:

| Nombre | Uso |
| --- | --- |
| `primary` | Color principal de la app |
| `background` | Fondo de las pantallas |
| `card` | Fondo de las tarjetas |
| `text` | Texto principal |
| `textLight` | Texto secundario |
| `border` | Bordes y divisores |
| `success` | Estados exitosos |
| `danger` | Errores y acciones destructivas |

## Cómo ejecutarlo localmente

1. Clonar el repositorio e ingresar a la carpeta:

   ```bash
   git clone <url-del-repositorio>
   cd taskflow-app
   ```

2. Instalar las dependencias:

   ```bash
   npm install
   ```

3. Iniciar el servidor de desarrollo:

   ```bash
   npx expo start
   ```

4. Abrir la app:
   - **Celular:** escanear el QR con Expo Go (misma red Wi-Fi).
   - **Emulador Android:** presionar `a` en la terminal.
   - **Navegador:** presionar `w` en la terminal.

## Tecnologías

- [React Native](https://reactnative.dev/)
- [Expo](https://expo.dev/)
- [TypeScript](https://www.typescriptlang.org/)