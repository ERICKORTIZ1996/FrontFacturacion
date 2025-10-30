import NavBar from "./NavBar"

export default function MainLayout({ children }) {
    return (
        <div className="overflow-hidden w-screen h-screen flex flex-col md:flex-row main-background">
            {/* bg-gradient-to-r from-[#293c6b] via-[#2e556b] to-[#293c6b]  */}
            <NavBar />

            <main
                className="w-full h-full overflow-auto py-4 md:py-6 px-4 md:pr-7 md:pl-32 barra"
            >
                {children}
            </main>

        </div>
    )
}
