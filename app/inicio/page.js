import MainLayout from "@/components/layouts/MainLayout"
import Image from "next/image"
import Link from "next/link"

export default function Inicio() {
    return (
        <MainLayout>
            <div className="flex justify-between items-start">

                <div>
                    <p className="text-xl">Bienvenido, <span className="font-semibold text-gray-200">ERICK</span></p>
                    <p>Aquí esta el resumen de tu negocio</p>
                </div>

                <div className="relative flex justify-end">
                    <button
                        type="button"
                        className="bg-[#102940] rounded-full p-2"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
                        </svg>

                    </button>

                    <span className="absolute top-0 right-0 w-3 h-3 bg-[#d24148] rounded-full"></span>
                </div>
            </div>


            <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-5">
                <div className="min-w-0">

                    <div className="relative bg-gradient-to-b from-[#3b46bf] to-[#3f6caf] rounded-3xl mr-5 my-5 shadow-lg flex items-center justify-between px-8 py-6">
                        <div className="flex flex-col gap-1">

                            <div className="flex items-center gap-3">
                                <div className="flex items-center bg-gray-100 font-semibold rounded-full px-4 py-1 w-fit text-gray-800 gap-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                                    </svg>

                                    <p>Inicio</p>
                                </div>

                                <Link
                                    href={'/perfil/informacion'}
                                    className="font-semibold rounded-full px-4 py-1 mt-1 w-fit text-gray-200 hover:bg-gray-200 hover:text-gray-800 transition-colors flex items-center gap-2 border border-gray-200"
                                >

                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                                    </svg>

                                    Mi Perfil
                                </Link>
                            </div>

                            <h2 className="text-2xl font-semibold text-gray-100 mt-2">Sistema de Facturación</h2>

                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione magni commodi ad, nobis impedit temporibus.</p>


                        </div>

                        <div className="relative w-xl">
                            <Image
                                src={'/images/banner_principal.png'}
                                width={500}
                                height={500}
                                alt="imagen-bienvenida"
                                className="absolute -bottom-32 -right-20 w-full"
                                priority
                            />
                        </div>
                    </div>

                    <h2 className="font-semibold text-gray-100 text-lg mb-5">Últimas facturas</h2>

                    <div className="overflow-x-auto whitespace-nowrap barra p-2 mb-5">
                        <div className="inline-block px-4 py-2 mr-2 w-52 h-52 rounded-3xl fondo_card">
                            <div className="relative w-full h-full flex flex-col justify-end items-center pb-5">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-32 absolute -top-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                </svg>
                                <p className="text-3xl font-bold text-[#102940]">$ 50.25</p>
                                <h2 className="text-gray-200">Ganacias del día</h2>
                            </div>
                        </div>

                        <div className="inline-block px-4 py-2 mr-2 w-52 h-52 rounded-3xl fondo_card2">
                            <div className="relative w-full h-full flex flex-col justify-end items-center pb-5">

                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-32 absolute -top-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941" />
                                </svg>

                                <p className="text-3xl font-bold text-[#102940]">$ 50.25</p>
                                <h2 className="text-gray-200">Ganacias del</h2>
                            </div>
                        </div>

                        <div className="inline-block px-4 py-2 mr-2 w-52 h-52 rounded-3xl fondo_card3">
                            <div className="relative w-full h-full flex flex-col justify-end items-center pb-5">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-32 absolute -top-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z" />
                                </svg>

                                <p className="text-3xl font-bold text-[#102940]">$ 50.25</p>
                                <h2 className="text-gray-200">Ganacias del día</h2>
                            </div>
                        </div>
                    </div>

                    <h2 className="font-semibold text-gray-100 text-lg mb-5">Balances</h2>

                    <div className="bg-gradient-to-t from-[#102940] to-[#182a3b] flex justify-between rounded-3xl px-8 py-6">
                        <div>
                            sdf
                        </div>

                        <div>
                            asdf
                        </div>
                    </div>

                </div>

                <div>

                    <h2 className="font-semibold text-gray-100 text-lg my-5">Gestionar</h2>

                    <div className="flex flex-col gap-3">
                        <div className="bg-gradient-to-t from-[#102940] to-[#182a3b] shadow-lg rounded-3xl pl-3 pr-6 py-2 flex justify-between items-center gap-3">
                            <div className="flex justify-between items-center gap-4">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-11 bg-[#2e556b] rounded-2xl p-1">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z" />
                                </svg>

                                <div>
                                    <p className="font-semibold text-[#478bb3]">Emitir Facturas</p>
                                    <p>Lorem, ipsum dolor sit</p>
                                </div>
                            </div>

                            <Link
                                href={'/emitir-facturas'}
                                className="hover:bg-[#2e556b] rounded-full p-1 transition-colors"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                                </svg>

                            </Link>

                        </div>

                        <div className="bg-gradient-to-t from-[#102940] to-[#182a3b] bg-opacity-60 shadow-lg border-gray-400 rounded-3xl pl-3 pr-6 py-2 flex justify-between items-center gap-3">
                            <div className="flex justify-between items-center gap-4">

                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-11 bg-[#2e556b] rounded-2xl p-1">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75M12 20.25c1.472 0 2.882.265 4.185.75M18.75 4.97A48.416 48.416 0 0 0 12 4.5c-2.291 0-4.545.16-6.75.47m13.5 0c1.01.143 2.01.317 3 .52m-3-.52 2.62 10.726c.122.499-.106 1.028-.589 1.202a5.988 5.988 0 0 1-2.031.352 5.988 5.988 0 0 1-2.031-.352c-.483-.174-.711-.703-.59-1.202L18.75 4.971Zm-16.5.52c.99-.203 1.99-.377 3-.52m0 0 2.62 10.726c.122.499-.106 1.028-.589 1.202a5.989 5.989 0 0 1-2.031.352 5.989 5.989 0 0 1-2.031-.352c-.483-.174-.711-.703-.59-1.202L5.25 4.971Z" />
                                </svg>


                                <div>
                                    <p className="font-semibold text-[#478bb3]">Balances</p>
                                    <p>Lorem, ipsum dolor sit</p>
                                </div>
                            </div>

                            <Link
                                href={'/'}
                                className="hover:bg-[#2e556b] rounded-full p-1 transition-colors"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                                </svg>

                            </Link>

                        </div>

                        <div className="bg-gradient-to-t from-[#102940] to-[#182a3b] bg-opacity-60 shadow-lg border-gray-400 rounded-3xl pl-3 pr-6 py-2 flex justify-between items-center gap-3">
                            <div className="flex justify-between items-center gap-4">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-11 bg-[#2e556b] rounded-2xl p-1">

                                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0 1 18 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3 1.5 1.5 3-3.75" />
                                </svg>


                                <div>
                                    <p className="font-semibold text-[#478bb3]">Autorizar Facturas</p>
                                    <p>Lorem, ipsum dolor sit</p>
                                </div>
                            </div>

                            <Link
                                href={'/'}
                                className="hover:bg-[#2e556b] rounded-full p-1 transition-colors"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                                </svg>

                            </Link>

                        </div>
                    </div>


                    <h2 className="font-semibold text-gray-100 text-lg my-5">Facturas</h2>

                    <div className="shadow-lg border-gray-400 rounded-3xl px-8 py-6 fondo">

                        <div className="flex justify-center">
                            <div className="w-52 h-52 bg-[#478bb3] rounded-full mb-5"></div>

                        </div>

                        <div className="flex justify-center gap-5">
                            <div>
                                <div className="w-10 h-10 bg-[#478bb3] rounded-full"></div>
                                <p>lorem</p>
                            </div>

                            <div>
                                <div className="w-10 h-10 bg-[#478bb3] rounded-full"></div>
                                <p>lorem</p>
                            </div>

                            <div>
                                <div className="w-10 h-10 bg-[#478bb3] rounded-full"></div>
                                <p>lorem</p>
                            </div>
                        </div>
                    </div>


                </div>
            </div>
        </MainLayout>
    )
}
