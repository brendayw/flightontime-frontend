export default function Title( { titulo = '', className = ''}) {
    return (
        <div className='w-full'>
            <h4 className={`font-medium font-montserrat ${className}`}>{titulo}</h4>
        </div>
    );
}