/**
 * Title Component
 * 
 * Componente simple para mostrar títulos en la aplicación.
 * Permite pasar texto y clases adicionales para personalizar estilos.
 * 
 * Props:
 * @param {string} titulo - Texto que se mostrará dentro del título. Por defecto es cadena vacía.
 * @param {string} className - Clases CSS adicionales para personalizar el estilo. Por defecto es cadena vacía.
 * 
 * Uso:
 * <Title titulo="Distribución de predicciones" className="text-xl text-blue-600" />
 * 
 * Estilos:
 * - Aplica la fuente 'Montserrat' y peso de fuente medio por defecto
 * - Permite agregar clases adicionales para modificar tamaño, color, márgenes, etc.
 */
const Title = ( { titulo = '', className = ''}) => {
    return (
        <div className='w-full'>
            <h4 className={`font-medium font-montserrat ${className}`}>{titulo}</h4>
        </div>
    );
}

export default Title;