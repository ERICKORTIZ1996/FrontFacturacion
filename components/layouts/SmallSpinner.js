export default function SmallSpinner() {
    return (
        <div className='flex flex-col items-center justify-center h-full'>
            <div className="loader"></div>

            <p className='text-green-200'>Cargando...</p>
        </div>
    )
}