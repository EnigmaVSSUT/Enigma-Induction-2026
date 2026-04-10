

import { useEffect, useState } from "react";
import "../index.css";
import TeamCard from "./Sub-components/TeamCard";







export default function TeamSection() {
    // const [isVisible, setIsVisible] = useState(false);
    const [typed, setTyped] = useState("");
    const text = "team";

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
        <section className="min-h-screen bg-[#0a0a0a] py-16 px-5 md:px-10 lg:px-16 text-gray-200">
            <div className="max-w-7xl mx-auto">

                <div className="text-center mb-16">

                    <div className=" comment-badge mb-10">
                        <span className="opacity-60">{"//"}</span>
                        <span className={typed.length < text.length ? "cursor-blink" : ""}>
                            {typed}
                        </span>
                    </div>

                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4">
                        Meet Our <span className="text-green-400">Team</span>
                    </h1>

                </div>
                <TeamCard />
            </div>
        </section>
    );
}