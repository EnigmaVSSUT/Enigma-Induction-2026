
import { useEffect, useState } from 'react';
import type { FC } from 'react';
import ProjectCard from './Sub-components/ProjectCard';
const Projects: FC = () => {
    const text = "projects";
    const [typed, setTyped] = useState("");
    useEffect(() => {
        let i = 0;
        setTyped("");
        const interval = setInterval(() => {
            if (i < text.length) {
                setTyped(text.slice(0, i + 1));
                i++;
            } else {
                clearInterval(interval);
            }
        }, 180);
        return () => clearInterval(interval);
    }, []);
    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center px-5 sm:px-8">
            <div className="max-w-5xl w-full text-center space-y-5 md:space-y-10 py-20">

                <div className="inline-flex items-center gap-2.5">


                    <div className=" comment-badge mb-10">
                        <span className="opacity-60">{"//"}</span>
                        <span className={typed.length < text.length ? "cursor-blink" : ""}>
                            {typed}
                        </span>
                    </div>
                </div>


                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight">
                    Explore Our <span className='text-green-400'> Projects </span>
                </h1>
                <div className="flex justify-center w-full">
                    <ProjectCard />
                </div>

            </div>
        </div>
    );
};

export default Projects;