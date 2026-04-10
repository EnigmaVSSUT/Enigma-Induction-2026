
import { Send, Github, Twitter, Linkedin, Mail } from 'lucide-react';
import { useState } from 'react';

export default function Contact() {


    const fullText = "contact";


    

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    });

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
      
        console.log('Form submitted:', formData);
       
    };

    return (
        <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-4 py-16">
            <div className="w-full max-w-lg">

                <div className="text-center mb-10">

                    <code className="comment-badge mb-10    ">{fullText}</code>


                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                        Contact <span className="text-green-500">Us</span>
                    </h1>

                    <p className="text-gray-400 text-lg">
                        Have a project idea or want to join the club? Drop us a line.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Name"
                            required
                            className="
                w-full px-5 py-4 
                bg-gray-900/60 
                border border-gray-700 
                rounded-lg 
                text-white 
                placeholder-gray-500
                focus:outline-none 
                focus:border-green-500/50 
                focus:ring-1 
                focus:ring-green-500/30
                transition-all duration-200
              "
                        />
                    </div>

                    <div>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Email"
                            required
                            className="
                w-full px-5 py-4 
                bg-gray-900/60 
                border border-gray-700 
                rounded-lg 
                text-white 
                placeholder-gray-500
                focus:outline-none 
                focus:border-green-500/50 
                focus:ring-1 
                focus:ring-green-500/30
                transition-all duration-200
              "
                        />
                    </div>

                    <div>
                        <textarea
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            placeholder="Your message..."
                            rows={5}
                            required
                            className="
                w-full px-5 py-4 
                bg-gray-900/60 
                border border-gray-700 
                rounded-lg 
                text-white 
                placeholder-gray-500
                focus:outline-none 
                focus:border-green-500/50 
                focus:ring-1 
                focus:ring-green-500/30
                transition-all duration-200
                resize-none
              "
                        />
                    </div>

                    <button
                        type="submit"
                        className="
              w-full 
              bg-green-600 
              hover:bg-green-500 
              active:bg-green-700
              text-white 
              font-medium 
              py-4 
              rounded-lg 
              flex items-center justify-center gap-2.5
              transition-colors duration-200
              shadow-lg shadow-green-900/30
              group
            "
                    >
                        <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        Send Message
                    </button>
                </form>

                {/* Social Icons */}
                <div className="flex justify-center gap-8 mt-12 text-gray-500">
                    <a
                        href="https://github.com/EnigmaVSSUT"
                        className="hover:text-green-400 transition-colors"
                        aria-label="GitHub"
                    >
                        <Github className="w-6 h-6" />
                    </a>
                    <a
                        href="https://x.com/Enigma_VSSUT"
                        className="hover:text-green-400 transition-colors"
                        aria-label="Twitter"
                    >
                        <Twitter className="w-6 h-6" />
                    </a>
                    <a
                        href="https://www.linkedin.com/company/enigma-vssut/posts/?feedView=all"
                        className="hover:text-green-400 transition-colors"
                        aria-label="LinkedIn"
                    >
                        <Linkedin className="w-6 h-6" />
                    </a>
                    <a
                        href="#"
                        className="hover:text-green-400 transition-colors"
                        aria-label="Email"
                    >
                        <Mail className="w-6 h-6" />
                    </a>
                </div>
            </div>
        </div>
    );
}