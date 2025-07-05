"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import Image from "next/image";

export default function NavBar() {

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
                        {/* 077eeb - azul*/}
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
                                className={`${pathname === '/emitir-facturas' ? ' shadow-lg text-white  shadow-[#03284b] bg-[#077eeb]' : ''} block rounded-full hover:bg-[#077eeb] hover:shadow-lg hover:shadow-[#03284b] text-white p-2 w-fit transition-all`}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-7">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z" />
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
