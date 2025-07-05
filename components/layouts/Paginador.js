import { useMemo } from "react";

export default function Paginador({ totalPages, currentPage, setCurrentPage }) {
    const pages = useMemo(() => {
        const pagesSet = new Set([1, totalPages]);

        const middlePages = [
            Math.max(2, currentPage - 1),
            currentPage,
            Math.min(totalPages - 1, currentPage + 1),
        ];

        middlePages.forEach((p) => {
            if (p > 1 && p < totalPages) pagesSet.add(p);
        });

        return [...pagesSet].sort((a, b) => a - b);
    }, [currentPage, totalPages]);

    return (
        <div className="my-2 flex gap-3">
            <button
                className={`px-2 py-1 rounded-xl bg-[#2e4760] ${currentPage === 1
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-gray-800 hover:text-white cursor-pointer"
                    }`}
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                </svg>
            </button>

            {pages.map((page) => (
                <button
                    key={`page-${page}`}
                    className={`px-4 py-1 rounded-xl transition-colors cursor-pointer flex justify-center items-center ${currentPage === page
                        ? "bg-gray-800 text-white"
                        : "bg-[#2e4760] hover:bg-gray-800 hover:text-white"
                        }`}
                    onClick={() => setCurrentPage(page)}
                >
                    {page}
                </button>
            ))}

            <button
                className={`px-2 py-1 rounded-xl bg-[#2e4760] ${currentPage === totalPages
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-gray-800 hover:text-white cursor-pointer"
                    }`}
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                </svg>
            </button>
        </div>
    );
}
