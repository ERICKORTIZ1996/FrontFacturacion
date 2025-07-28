"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import Image from "next/image";
import { useMainStore } from "@/store/mainStore";

export default function NavBar() {

    const cerrarSesion = useMainStore((state) => state.cerrarSesion);
    const pathname = usePathname();

    return (
        <nav
            className="absolute h-screen p-5 z-10"
        >

            <div
                className="bg-gradient-to-t from-[#102940]/60 to-[#182a3b]/60 rounded-4xl shadow-lg shadow-[#13222f] h-full flex flex-col justify-between"
            >
                <div>
                    <div className="flex justify-center">
                        <Image
                            src={'/images/logo.jpeg'}
                            width={50}
                            height={50}
                            alt="logo"
                            className="rounded-full object-cover aspect-square mt-5"
                        />
                    </div>

                    <ul className="px-5 pt-8 space-y-3">
                        <li>
                            <Link
                                href={'/inicio'}
                                className={`${pathname === '/inicio' ? ' shadow-lg text-white  shadow-[#03284b] bg-[#077eeb]' : ''} block rounded-full hover:bg-[#077eeb] hover:shadow-lg hover:shadow-[#03284b] text-white p-2 w-fit transition-all`}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-7">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                                </svg>
                            </Link>
                        </li>

                        <li>
                            <Link
                                href={'/emitir-facturas'}
                                className={`${pathname.startsWith('/emitir-facturas') ? ' shadow-lg text-white  shadow-[#03284b] bg-[#077eeb]' : ''} block rounded-full hover:bg-[#077eeb] hover:shadow-lg hover:shadow-[#03284b] text-white p-2 w-fit transition-all`}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-7">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z" />
                                </svg>

                            </Link>
                        </li>

                        <li>
                            <Link
                                href={'/mi-empresa'}
                                className={`${pathname === '/mi-empresa' ? ' shadow-lg text-white  shadow-[#03284b] bg-[#077eeb]' : ''} block rounded-full hover:bg-[#077eeb] hover:shadow-lg hover:shadow-[#03284b] text-white p-2 w-fit transition-all`}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-7">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
                                </svg>

                            </Link>
                        </li>

                        <li>
                            <Link
                                href={'/balances'}
                                className={`${pathname === '/balances' ? ' shadow-lg text-white  shadow-[#03284b] bg-[#077eeb]' : ''} block rounded-full hover:bg-[#077eeb] hover:shadow-lg hover:shadow-[#03284b] text-white p-2 w-fit transition-all`}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-7">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75M12 20.25c1.472 0 2.882.265 4.185.75M18.75 4.97A48.416 48.416 0 0 0 12 4.5c-2.291 0-4.545.16-6.75.47m13.5 0c1.01.143 2.01.317 3 .52m-3-.52 2.62 10.726c.122.499-.106 1.028-.589 1.202a5.988 5.988 0 0 1-2.031.352 5.988 5.988 0 0 1-2.031-.352c-.483-.174-.711-.703-.59-1.202L18.75 4.971Zm-16.5.52c.99-.203 1.99-.377 3-.52m0 0 2.62 10.726c.122.499-.106 1.028-.589 1.202a5.989 5.989 0 0 1-2.031.352 5.989 5.989 0 0 1-2.031-.352c-.483-.174-.711-.703-.59-1.202L5.25 4.971Z" />
                                </svg>

                            </Link>
                        </li>

                        <li>
                            <Link
                                href={'/productos'}
                                className={`${pathname === '/productos' ? ' shadow-lg text-white  shadow-[#03284b] bg-[#077eeb]' : ''} block rounded-full hover:bg-[#077eeb] hover:shadow-lg hover:shadow-[#03284b] text-white p-2 w-fit transition-all`}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-7">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z" />
                                </svg>

                            </Link>
                        </li>

                        {/* <li>
                            <Link
                                href={'/emitir-facturas/autorizar-facturas'}
                                className={`${pathname === '/autorizar-facturas' ? ' shadow-lg text-white  shadow-[#03284b] bg-[#077eeb]' : ''} block rounded-full hover:bg-[#077eeb] hover:shadow-lg hover:shadow-[#03284b] text-white p-2 w-fit transition-all`}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-7">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0 1 18 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3 1.5 1.5 3-3.75" />
                                </svg>
                            </Link>
                        </li> */}

                        <li>
                            <Link
                                href={'/reportes'}
                                className={`${pathname === '/reportes' ? ' shadow-lg text-white  shadow-[#03284b] bg-[#077eeb]' : ''} block rounded-full hover:bg-[#077eeb] hover:shadow-lg hover:shadow-[#03284b] text-white p-2 w-fit transition-all`}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-7">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9.776c.112-.017.227-.026.344-.026h15.812c.117 0 .232.009.344.026m-16.5 0a2.25 2.25 0 0 0-1.883 2.542l.857 6a2.25 2.25 0 0 0 2.227 1.932H19.05a2.25 2.25 0 0 0 2.227-1.932l.857-6a2.25 2.25 0 0 0-1.883-2.542m-16.5 0V6A2.25 2.25 0 0 1 6 3.75h3.879a1.5 1.5 0 0 1 1.06.44l2.122 2.12a1.5 1.5 0 0 0 1.06.44H18A2.25 2.25 0 0 1 20.25 9v.776" />
                                </svg>


                            </Link>
                        </li>

                    </ul>
                </div>

                <ul className="px-5 mb-5">
                    {/* 077eeb - azul*/}
                    <li>
                        <Link
                            href={'/'}
                            className="block rounded-full hover:bg-[#d24148] hover:shadow-lg hover:shadow-[#391a1d] text-white p-2 w-fit transition-all"
                            onClick={() => cerrarSesion()}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-7 -rotate-90">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 8.25H7.5a2.25 2.25 0 0 0-2.25 2.25v9a2.25 2.25 0 0 0 2.25 2.25h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25H15m0-3-3-3m0 0-3 3m3-3V15" />
                            </svg>

                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    )
}
