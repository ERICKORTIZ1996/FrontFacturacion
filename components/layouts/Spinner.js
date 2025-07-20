export default function Spinner() {
    return (
        <div className='flex flex-col items-center justify-center h-full main-background'>
            <div className=''>
                <div className="sk-folding-cube">
                    <div className="sk-cube1 sk-cube"></div>
                    <div className="sk-cube2 sk-cube"></div>
                    <div className="sk-cube4 sk-cube"></div>
                    <div className="sk-cube3 sk-cube"></div>
                </div>
            </div>

            <p className='text-gray-200'>Por favor, espere...</p>
        </div>
    )
}