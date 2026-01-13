import { Outlet } from 'react-router-dom';

/**
 * Componente Layout
 *
 * Componente de layout principal de la aplicación.
 * Se utiliza como wrapper para las rutas anidadas.
 *
 * Funcionalidad:
 * - Utiliza <Outlet /> de React Router para renderizar los componentes hijos
 *   según la ruta actual.
 * - Aplica estilos base de flexbox para que el contenido crezca y ocupe
 *   el espacio disponible.
 * - Permite centralizar o aplicar padding/márgenes globales para todas las páginas.
 *
 * Ejemplo de uso en rutas:
 * <Route path="/" element={<Layout />}>
 *   <Route index element={<Home />} />
 *   <Route path="dashboard" element={<Dashboard />} />
 * </Route>
 */

const Layout = () => {
  return (
    <div className='flex flex-col'>
      <main className='flex-grow 2xl:w-full px-0 mx-auto'>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;