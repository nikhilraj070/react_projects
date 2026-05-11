import { Link } from "react-router-dom"

function Home() {
    return (<>

        <div className="min-w-full h-dvh bg-[#111827] ">
            <div className=" fixed top-0 z-50 w-full h-20 flex items-center justify-center bg-black/70 backdrop-blur-md border-b border-white/10 shadow-lg text-3xl md:text-5xl font-bold text-white tracking-wide ">
                React Projects
            </div>
            <div className="flex  h-dvh p-28 flex-col items-center gap-5">
                <Link to={"/counter"} className="project-card">Counter App</Link>
               <Link to={"/dark-light-mode"}className="project-card">Light/Dark Mode</Link>
            </div>
        </div>
            

            </>
    )
}

export default Home