import { FaTwitch, FaInstagram, FaYoutube, FaTwitter } from "react-icons/fa";

const socialLinks = [
    { href: "https://www.twitch.tv/battlefield", icon: <FaTwitch /> },
    { href: "https://www.instagram.com/battlefield", icon: <FaInstagram /> },
    { href: "https://www.youtube.com/Battlefield", icon: <FaYoutube /> },
    { href: "https://x.com/Battlefield", icon: <FaTwitter /> },
];

const Footer = () => {
    return (
        <footer className="w-screen bg-red-500 py-4 text-black">
            {/* Changed flex to grid with 3 columns for desktop */}
            <div className="container mx-auto grid grid-cols-1 gap-4 px-4 md:grid-cols-3 items-center">

                {/* Left Section: Aligned start */}
                <p className="text-center text-sm font-light md:text-left justify-self-center md:justify-self-start">
                    ©Shiven Chandra 2025. All rights reserved
                </p>

                {/* Middle Section: Aligned center */}
                <div className="flex justify-center gap-4 justify-self-center">
                    {socialLinks.map((link, index) => (
                        <a
                            key={index}
                            href={link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-black transition-colors duration-500 ease-in-out hover:text-white"
                        >
                            {link.icon}
                        </a>
                    ))}
                </div>

                {/* Right Section: Aligned end */}
                <a
                    href="#privacy-policy"
                    className="text-center text-sm font-light hover:underline md:text-right justify-self-center md:justify-self-end"
                >
                    Privacy Policy
                </a>
            </div>
        </footer>
    );
};

export default Footer;