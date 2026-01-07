# Equipo 27 - Frontend de Flight On Time

Este es el **frontend** de la aplicación de predicciones, desarrollado en **React** utilizando **Material-UI (MUI)**. Permite al usuario interactuar con formularios de predicción, subir archivos para predicciones masivas y visualizar resultados en gráficos y listas.

## Características principales

- Formulario para predicción individual.
- Subida de archivos (CSV) para predicciones en lote.
- Visualización de predicciones recientes.
- Gráficos de distribución y resultados por vuelo usando `@mui/x-charts`.
- Diseño responsive.
- Menú lateral y encabezado con navegación integrada.
- Gestión de estado con `useState` y hooks personalizados.
- Animaciones con `framer-motion`.

## Tecnologías utilizadas

- **React +19 & Vite**
- **Tailwind**
- **Material-UI (MUI)**
- **Framer Motion**
- **Axios** (para llamadas a la API)
- **React Router** (para navegación entre páginas)
- **@mui/x-charts** (para gráficos)

## Instalación

1. Clonar el repositorio:

    ```bash
    git clone https://github.com/brendayw/flightontime-frontend.git

2. Entrar al directorio del proyecto:

    cd flightontime-frontend

3. Instalar dependencias:

    npm install

## Configuración

Crear un archivo .env en la raíz del proyecto con la URL del backend:

    REACT_APP_API_URL=http://localhost:8080/api

## Estructura de carpetas recomendada

    src/
    ├─ components/      # Componentes reutilizables (formularios, listas, cards)
    ├─ pages/           # Páginas principales (Home, Predictions, Batch, Dashboard)
    ├─ hooks/           # Custom hooks (useDashboard, usePredictions)
    ├─ services/        # Funciones para llamadas a la API
    ├─ assets/          # Imágenes, íconos y estilos
    ├─ utils/           # Funciones utilitarias
    ├─ App.js          
    ├─ index.css
    └─ main.js