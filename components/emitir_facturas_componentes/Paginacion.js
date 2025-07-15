"use client"

import Paginador from '../layouts/Paginador'
import { useState } from 'react'

export default function Paginacion({ data }) {


    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);


    return (
        <div className="flex flex-col justify-center items-center mt-10">
            <Paginador totalPages={totalPages} currentPage={currentPage} setCurrentPage={setCurrentPage} />
            <span className="text-center text-[11px] font-semibold mt-[-5px]">{totalPages} Registros</span>
        </div>
    )
}
