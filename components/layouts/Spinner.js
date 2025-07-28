export default function Spinner() {
    return (
        <div className='flex flex-col items-center justify-center h-full main-background'>
            <div className="loader"></div>

            <p className='text-gray-200'>Cargando...</p>
        </div>
    )
}