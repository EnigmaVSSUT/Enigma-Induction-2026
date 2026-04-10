
import { useState, useEffect } from "react";

const NAV_LINKS = [
    { name: "Home", link: "#home" },
    { name: "Team", link: "#team" },
    { name: "Projects", link: "#projects" },
    { name: "Blogs", link: "#blogs" },
    { name: "Contact", link: "#contact" }
];

export default function Navbar() {
    const [activeNav, setActiveNav] = useState("Home");
    const [typedLogo, setTypedLogo] = useState("");
    const logoText = "ENIGMA";

    useEffect(() => {
        let i = 0;
        setTypedLogo("");
        const interval = window.setInterval(() => {
            if (i < logoText.length) {
                setTypedLogo(logoText.slice(0, i + 1));
                i++;
            } else {
                window.clearInterval(interval);
            }
        }, 150);
        return () => window.clearInterval(interval);
    }, []);

    return (
        <nav className="flex  justify-between items-center px-12 py-5 relative z-10">
            <div className="flex items-center gap-1.5 font-mono text-[18px] font-bold text-[#22c55e]">
                <img src="Enigma_logo.png" alt="Enigma Logo" className="h-20 w-auto" />
                <h2>
                    <span className={typedLogo.length < logoText.length ? "cursor-blink" : ""}>
                        {typedLogo}
                    </span>
                </h2>
            </div>

            <div className="flex items-center gap-1">
                {NAV_LINKS.map((navItem) =>
                    activeNav === navItem.name ? (
                        <a
                            key={navItem.name}
                            href={navItem.link}
                            className="nav-active font-JetBrains Mono-[14px] font-bold border-none cursor-pointer"
                            onClick={() => setActiveNav(navItem.name)}
                        >
                            {navItem.name}
                        </a>
                    ) : (
                        <a
                            key={navItem.name}
                            href={navItem.link}
                            className="nav-link"
                            onClick={() => setActiveNav(navItem.name)}
                        >
                            {navItem.name}
                        </a>
                    )
                )}
            </div>
        </nav>
    );
}
