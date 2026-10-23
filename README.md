# TaskFlow App

Aplicación móvil para organizar tareas, desarrollada con **React Native** y **Expo**. El proyecto parte de la plantilla *Blank* de Expo, por lo que la estructura se construye desde cero.

## Requisitos previos

- [Node.js](https://nodejs.org/) (versión LTS recomendada)
- npm (incluido con Node.js)
- La app **Expo Go** en tu celular (Android / iOS) o un emulador configurado

## Ejecución local

1. Clonar el repositorio e ingresar a la carpeta del proyecto:

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
   - **Celular:** escaneá el código QR con Expo Go (el celular y la PC deben estar en la misma red Wi-Fi).
   - **Emulador Android:** presioná `a` en la terminal.
   - **Navegador:** presioná `w` en la terminal.

## Scripts disponibles

| Comando | Descripción |
| --- | --- |
| `npm install` | Instala las dependencias |
| `npx expo start` | Inicia el servidor de desarrollo |
| `npm run android` | Abre la app en un emulador Android |
| `npm run ios` | Abre la app en un simulador iOS (solo macOS) |
| `npm run web` | Ejecuta la app en el navegador |

## Estructura del proyecto

```
taskflow-app/
├── App.tsx         # Componente raíz
├── app.json        # Configuración de Expo
├── index.ts        # Punto de entrada
├── tsconfig.json   # Configuración de TypeScript
├── package.json
└── assets/         # Íconos e imágenes
```

## Tecnologías

- [React Native](https://reactnative.dev/)
- [Expo](https://expo.dev/)
- [TypeScript](https://www.typescriptlang.org/)