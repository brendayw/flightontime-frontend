# ✈️ Equipo 27 - Frontend de Flight On Time

Este es el frontend para la aplicación de predicción de puntualidad de vuelos, Flight On Time. Desarrollado en React, permite a los usuarios interactuar con formularios de predicción, subir archivos para predicciones masivas y visualizar resultados en gráficos y listas.

## 🔗 Demo y Video

- **Demo en vivo (deploy)**: [Ver aplicación en producción](https://flightontime-drab.vercel.app/)
- **Video demostrativo**: [Ver video en YouTube](https://youtu.be/rUkILmz6EX4?si=U5Q9j3Ib3m9uZTji)

## Características principales

- **Predicción Individual**: Formulario para ingresar los detalles de un vuelo y obtener una predicción instantánea.
- **Predicción por Lote**: Funcionalidad para subir archivos CSV y procesar múltiples predicciones de una sola vez.
- **Dashboard de Administrador**: Visualización de métricas clave, como el total de predicciones, porcentajes de puntualidad y retrasos, a través de gráficos interactivos. Incluye:
    -   Distribución de predicciones (a tiempo vs. retraso).
    -   Evolución de probabilidades por vuelo a lo largo del tiempo.
    -   Analísis de vuelo individual.
- **Gestión de Perfil**: Espacio para que los usuarios vean sus datos y predicciones recientes con seguimiento.
- **Seguimiento y Notificaciones**: Opción para que los usuarios sigan un vuelo y reciban notificaciones sobre su estado.
- **Diseño Responsivo**: Interfaz adaptada para una correcta visualización en dispositivos de escritorio y móviles.
- **Autenticación y Rutas Protegidas**: Sistema de login/signup con rutas diferenciadas para usuarios `INVITADO`, `USER` y `ADMIN`.

## Tecnologías utilizadas

- **React +19**
- **Vite** como empaquetador de módulos.
- **Tailwind CSS** y **Material-UI (MUI)** para el diseño de la interfaz.
- **React Router** para la navegación y el enrutamiento.
- **Axios** para las peticiones a la API.
- **Framer Motion** para animaciones fluidas.
- **React Router** (para navegación entre páginas)
- **@mui/x-charts** y **@mui/icons-material** para la visualización de datos en gráficos e íconos.

## Requisitos previos

- Node.js >= 18  
- npm >= 9 o yarn >= 1  


## Instalación

1.  **Clonar el repositorio:**
    ```bash
    git clone https://github.com/brendayw/flightontime-frontend.git
    ```

2.  **Navegar al directorio del proyecto:**
    ```bash
    cd flightontime-frontend
    ```

3.  **Instalar las dependencias:**
    ```bash
    npm install
    ```

4. **Ejecutar la aplicación en modo desarrollo:**
    ```bash
    npm run dev
    ```

## Configuración

Para que la aplicación se conecte con el backend, es necesario configurar la variable de entorno.

1.  Crea un archivo `.env` en la raíz del proyecto.
2.  Añade la siguiente variable con la URL de tu API backend:

    ```env
    VITE_API_URL=https://equipo27-prediction-backend-production.up.railway.app/
    ```
    *Nota: Las llamadas a la API en el código actual utilizan `https://equipo27-prediction-backend-production.up.railway.app/`. 
    En caso de terminarse los créditos en Railway, se puede ejectuar el backend localmente descargando el repositorio y cambiando la URL a `http://localhost:8080`*

## Estructura del proyecto

    src/
    ├─ api/             # Lógica para las llamadas a la API (pública y privada).
    ├─ assets/          # Imágenes, íconos y otros recursos estáticos.
    ├─ components/      # Componentes reutilizables de UI (formularios, tarjetas, gráficos).
    ├─ contexts/        # Proveedores de contexto, como el de autenticación (AuthProvider).
    ├─ hooks/           # Hooks personalizados para la lógica de negocio (e.g., usePrediction, useDashboard).
    ├─ pages/           # Componentes que representan las páginas completas de la aplicación.
    ├─ routes/          # Componentes para gestionar rutas públicas y protegidas.
    ├─ services/        # Servicios auxiliares (e.g., formateo de datos, autenticación).
    └─ utils/           # Funciones utilitarias (e.g., manipulación de JWT, validadores).

## Flujo de funcionamiento

La aplicación maneja tres tipos de usuarios: `INVITADO`, `USER` y `ADMIN`.  
El flujo de funcionamiento varía según el rol autenticado.

                                                        Inicio  
                                                           ↓  
                                            Usuario accede a la aplicación  
                                                            ↓  
                                                    ¿Está autenticado?  
                                                    ↓               ↓ 
                                                    Sí              No  
                                                    ↓                └──———————————————————  INVITADO  
                                        Backend devuelve JWT con rol                             ↓  
                                                    ↓                               Acceso a rutas públicas  
                            Se inicializa el contexto de autenticación                            ↓  
                                                    ↓                              ¿Intenta acceder a ruta protegida?  
                                            ¿Rol del usuario?                               ↓                   ↓ 
                        USER                                    ADMIN                      SI                  NO
                        ↓                                         ↓                 Redirección a Login    Continúa navegación
                Acceso a rutas protegidas de usuario    Acceso a rutas administrativas
                        ↓                                           ↓
        Realiza predicciones (individual / CSV)     Visualización de métricas y dashboards
                        ↓                                           ↓
    Visualiza historial y seguimiento de vuelos     Gestión y análisis de datos del sistema 

### Usuario GUEST
1. Accede a rutas públicas de la aplicación.
2. Puede visualizar información general y utilizar funcionalidades limitadas (predicción individual y por lote).
3. No requiere autenticación ni token.
4. Al intentar acceder a rutas protegidas, es redirigido al login.

### Usuario USER
1. Se autentica mediante login.
2. El backend devuelve un JWT con la información del usuario y su rol `USER`.
3. El token se almacena y se gestiona desde el contexto de autenticación.
4. Puede acceder a rutas protegidas para usuarios autenticados.
5. Puede realizar predicciones individuales y por lote (CSV).
6. Puede visualizar su historial de predicciones y realizar seguimiento de vuelos.
7. Las peticiones al backend se realizan mediante Axios incluyendo el token de autorización.

### Usuario ADMIN
1. Se autentica mediante login.
2. Recibe un JWT con rol `ADMIN`.
3. Accede a rutas exclusivas de administración.
4. Puede visualizar métricas globales y estadísticas en el dashboard.
5. Accede a gráficos e información consolidada del sistema.
6. Todas las peticiones administrativas requieren autenticación y autorización.

## Endpoints consumidos

- `POST /auth/login` – Autenticación de usuarios
- `POST /auth/register` – Registro
- `GET /api/aeropuertos` – Listado de aeropuertos
- `GET /api/aerolíneas` – Listado de aerolineas
- `GET /api/usuario/vuelos` – Predicciones del usuario  
- `POST /api/predict` – Predicción individual
- `POST /api/predict/csv` – Predicción por lote (CSV)
- `POST /api/distancia` – Calcula la distancia entre aeropuertos a partir de la latitud y longitud
- `GET /api/dashboard/history` – Historial temporal por vuelo
- `GET /api/dashboard/summary` – Resumen de predicciones
- `GET /api/dashboard/global-history` – Historial global por vuelo
- `GET /api/admin/usuarioos` - Listado de todos los usuarios  

## 📝 Scripts disponibles

- `npm run dev` → Inicia la app en modo desarrollo  
- `npm run build` → Compila la app para producción en `dist/`  
- `npm run lint` → Analiza el código con ESLint  
- `npm run preview` → Previsualiza el build de producción 

## Autores
H12-25-L-Equipo 27-Backend

- José Oswaldo Valencia Moreno
- Yadir García Córdoba
- Brenda Yañez
- Maria Vanessa Vaca Lopez