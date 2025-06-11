import NavBar from "./NavBar"

export default function MainLayout({ children }) {
    return (
        <div className="overflow-hidden w-screen h-screen flex bg-gradient-to-r from-[#293c6b] via-[#2e556b] to-[#293c6b]">

            <NavBar />

            <main
                className="w-full h-full overflow-auto py-6 pr-7 pl-32"
            >
                {children}
            </main>

        </div>
    )
}
