

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Github, ExternalLink } from "lucide-react";


interface Tab {
    id: string;
    label: string;
    content: React.ReactNode;
}

interface AnimatedTabsProps {
    tabs?: Tab[];
    defaultTab?: string;
    className?: string;
}

const defaultTabs: Tab[] = [
    {
        id: "tab1",
        label: "Project-1",
        content: (
            <div className="grid border-green-400 grid-cols-2 gap-4 w-full h-full">
                <img
                    src="./Project-2.png"
                    alt="Tab 1"
                    className="rounded-lg w-full h-60 object-cover mt-0 !m-0 shadow-[0_0_20px_rgba(0,0,0,0.2)] border-none"
                />

                <div className="flex flex-col h-full justify-between py-2">
                    <div className="flex flex-col gap-y-2">
                        <h2 className="text-2xl font-bold text-green-400 mb-0 mt-0 !m-0">
                            Club Management System
                        </h2>
                        <p className="text-sm text-white mt-0">
                            A comprehensive platform designed to streamline club management operations.
                        </p>
                    </div>
                    <div className="pt-2 flex items-center gap-3">
                        <a href="https://github.com/EnigmaVSSUT/EnigmaCMS-FrontEnd" target="_blank" rel="noopener noreferrer" className="inline-block text-white hover:text-green-400 transition-colors">
                            <Github size={24} />
                        </a>
                        <a href="https://enigma-dev-web.web.app/" target="_blank" rel="noopener noreferrer" className="inline-block text-white hover:text-green-400 transition-colors">
                            <ExternalLink size={24} />
                        </a>
                    </div>
                </div>
            </div>
        ),
    },
    {
        id: "tab2",
        label: "Project-2",
        content: (
            <div className="grid grid-cols-2 gap-4 w-full h-full">
                <img
                    src="./Project-1.png"
                    alt="Tab 2"
                    className="rounded-lg w-full h-60 object-cover mt-0 !m-0 shadow-[0_0_20px_rgba(0,0,0,0.2)] border-none"
                />
                <div className="flex flex-col h-full justify-between py-2">
                    <div className="flex flex-col gap-y-2">
                        <h2 className="text-2xl font-bold mb-0 text-green-400 mt-0 !m-0">
                            Samavesh X VSSUANT
                        </h2>
                        <p className="text-sm text-white mt-0">
                            A dynamic platform which showcases our college's annual fest. It comprises of two events : Samavesh (Our Tech Fest) and VSSUANT (Our Cultural Fest)
                        </p>
                    </div>
                    <div className="pt-2 flex items-center gap-3">
                        <a href="https://github.com/EnigmaVSSUT/sxv_website_2026" target="_blank" rel="noopener noreferrer" className="inline-block text-white hover:text-green-400 transition-colors">
                            <Github size={24} />
                        </a>
                        <a href="https://www.festvssut.in/" target="_blank" rel="noopener noreferrer" className="inline-block text-white hover:text-green-400 transition-colors">
                            <ExternalLink size={24} />
                        </a>
                    </div>
                </div>
            </div>
        ),
    },
    {
        id: "tab3",
        label: "Project-3",
        content: (
            <div className="grid grid-cols-2 gap-4 w-full h-full">
                <img
                    src="./Project3.png"
                    alt="Tab 3"
                    className="rounded-lg w-full h-60 object-cover mt-0 !m-0  shadow-[0_0_20px_rgba(0,0,0,0.2)] border-none"
                />
                <div className="flex flex-col h-full justify-between py-2">
                    <div className="flex flex-col gap-y-2">
                        <h2 className="text-2xl text-green-400 font-bold mb-0 mt-0 !m-0">
                            Inductions-2026
                        </h2>
                        <p className="text-sm text-white mt-0">
                            A dynamic website made for the inductions of 2026 batch.This website plays a important role in registering the candidates for the inductions.
                        </p>
                    </div>
                    <div className="pt-2 flex items-center gap-3">
                        <a href="https://github.com/EnigmaVSSUT/Enigma-Induction-2026" target="_blank" rel="noopener noreferrer" className="inline-block text-white hover:text-green-400 transition-colors">
                            <Github size={24} />
                        </a>

                    </div>
                </div>
            </div>
        ),
    },
];

const ProjectCard = ({
    tabs = defaultTabs,
    defaultTab,
}: AnimatedTabsProps) => {
    const [activeTab, setActiveTab] = useState<string>(defaultTab || tabs[0]?.id);

    if (!tabs?.length) return null;

    return (
        <div className="w-full max-w-lg flex flex-col gap-y-1">
            <div className="flex gap-2 flex-wrap bg-[#11111198] bg-opacity-50 backdrop-blur-sm p-1 rounded-xl">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}

                        className="relative px-3 py-1.5 text-sm font-medium rounded-lg text-white hover:text-green-400 outline-none transition-colors"
                    >
                        {activeTab === tab.id && (
                            <motion.div
                                layoutId="active-tab"
                                className="absolute inset-0 bg-[#111111d1] bg-opacity-50 shadow-[0_0_20px_rgba(0,0,0,0.2)] backdrop-blur-sm !rounded-lg"
                                transition={{ type: "spring", duration: 0.6 }}
                            />
                        )}
                        <span className="relative z-10">{tab.label}</span>
                    </button>
                ))}
            </div>

            <div className="p-4 bg-[#11111198] shadow-[0_0_20px_rgba(0,0,0,0.2)] text-white bg-opacity-50 backdrop-blur-sm rounded-xl border min-h-60 h-full">
                {tabs.map(
                    (tab) =>
                        activeTab === tab.id && (
                            <motion.div
                                key={tab.id}
                                initial={{
                                    opacity: 0,
                                    scale: 0.95,
                                    x: -10,
                                    filter: "blur(10px)",
                                }}
                                animate={{ opacity: 1, scale: 1, x: 0, filter: "blur(0px)" }}
                                exit={{ opacity: 0, scale: 0.95, x: -10, filter: "blur(10px)" }}
                                transition={{
                                    duration: 0.5,
                                    ease: "circInOut",
                                    type: "spring",
                                }}
                            >
                                {tab.content}
                            </motion.div>
                        )
                )}
            </div>
        </div>
    );
};

export default ProjectCard;
