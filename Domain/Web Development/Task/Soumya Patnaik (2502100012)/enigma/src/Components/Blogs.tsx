
import { useEffect, useState } from 'react';
import type { FC } from 'react';
import BlogCard from './Sub-components/BlogCard';
const Blogs: FC = () => {
    const text = "blogs";
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
                    From our <span className='text-green-400'> Developers </span>
                </h1>
                <div className="flex justify-center w-full">
                    <BlogCard
                        title="Google Gemini"
                        src="./blog-1.jpg"
                        description=""
                        link="https://enigma-dev-web.web.app/blogs/1"
                    />
                    <BlogCard
                        className='m-2'
                        title="Quantum Crypto"
                        src="./blog-2.jpg"
                        description=""
                        link="https://enigma-dev-web.web.app/blogs/2"
                    />
                    <BlogCard
                        className='m-2'
                        title="Project IDX"
                        src="./blog-3.jpg"
                        description=""
                        link="https://enigma-dev-web.web.app/blogs/3"
                    />
                    <BlogCard
                        className='m-2'
                        title="Bun.sh"
                        src="./blog-4.jpg"
                        description=""
                        link="https://enigma-dev-web.web.app/blogs/4"
                    />
                </div>

            </div>
        </div>
    );
};

export default Blogs;