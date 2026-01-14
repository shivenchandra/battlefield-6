import gsap from "gsap";
import { useRef, useState } from "react";

import Button from "./Button";
import AnimatedTitle from "./AnimatedTitle";

// ArrowButton component
const ArrowButton = ({ direction, onClick, disabled }) => (
    <button
        onClick={onClick}
        disabled={disabled}
        className={`flex h-9 w-9 items-center justify-center border border-white/30 bg-transparent transition-colors ${disabled
            ? "cursor-not-allowed opacity-30"
            : "cursor-pointer hover:bg-white/10 text-white"
            }`}
    >
        {direction === "left" ? (
            <svg
                viewBox="0 0 24 24"
                fill="none"
                className="h-4 w-4 stroke-current stroke-2"
            >
                <path d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
        ) : (
            <svg
                viewBox="0 0 24 24"
                fill="none"
                className="h-4 w-4 stroke-current stroke-2"
            >
                <path d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
        )}
    </button>
);

const FloatingImage = () => {
    const frameRef = useRef(null);
    const [currentScrollIndex, setCurrentScrollIndex] = useState(0);

    const isDesktop =
        typeof window !== "undefined" &&
        window.matchMedia("(min-width: 768px)").matches;

    // --- GSAP ANIMATION LOGIC ---
    const handleMouseMove = (e) => {
        if (!isDesktop) return;

        const element = frameRef.current;
        if (!element) return;

        const rect = element.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -15;
        const rotateY = ((x - centerX) / centerX) * 15;

        gsap.to(element, {
            rotateX,
            rotateY,
            scale: 1.02,
            duration: 0.4,
            ease: "power3.out",
        });
    };

    const handleMouseLeave = () => {
        const element = frameRef.current;
        if (!element) return;

        gsap.to(element, {
            rotateX: 0,
            rotateY: 0,
            scale: 1,
            duration: 0.6,
            ease: "elastic.out(1, 0.5)",
        });
    };

    // --- NEWS DATA (4 ITEMS) ---
    const newsItems = [
        {
            id: 1,
            date: "JAN 13, 2026",
            title: "Battlefield 6 and REDSEC Season 1: January Update",
            desc: "Season 1 will be extended past Januray 20 - learn more about this update and get a sneak preview of Season 2.",
            src: "/img/News1.webp",
        },
        {
            id: 2,
            date: "DEC 19, 2025",
            title: "COMMUNITY UPDATE – HOLIDAY WRAP-UP",
            desc: "Looking back at our biggest moments and ahead at 2026.",
            src: "/img/News2.webp",
        },
        {
            id: 3,
            date: "DEC 11, 2025",
            title: "WINTER OFFENSIVE LAUNCH FEEDBACK",
            desc: "A status update on issues identified after Update 1.1.3.0.",
            src: "/img/News3.webp",
        },
        {
            id: 4,
            date: "DEC 03, 2025",
            title: "LATEST UPDATES AHEAD OF WINTER",
            desc: "With Winter Offensive around the corner, here is what you need to know.",
            src: "/img/News4.webp",
        },
    ];

    // --- CAROUSEL LOGIC ---
    const itemsToShow = 2;
    const totalItems = newsItems.length;
    const maxIndex = totalItems - itemsToShow;

    const handleNext = () => {
        if (currentScrollIndex < maxIndex) {
            setCurrentScrollIndex((prev) => prev + 1);
        }
    };

    const handlePrev = () => {
        if (currentScrollIndex > 0) {
            setCurrentScrollIndex((prev) => prev - 1);
        }
    };

    return (
        <section
            id="achievement"
            className="relative min-h-dvh w-screen overflow-hidden bg-[url('/img/background.png')] bg-cover bg-center text-blue-50"
        >
            <div className="flex w-full flex-col items-center py-10 pb-32">
                <p className="font-general text-sm uppercase md:text-[10px]">
                    Electronic Arts
                </p>

                {/* MAIN WRAPPER */}
                {/* Changed px-4 to px-6 for small screens, and added md:px-10 for medium+ */}
                <div className="relative w-full max-w-7xl px-6 md:px-10">
                    {/* TITLE */}
                    <AnimatedTitle
                        title="B<b>A</b>TTLEFI<b>E</b>LD 6 <br /> B<b>E</b>ST <b>F</b>PS of 2025"
                        containerClass="mt-5 pointer-events-none mix-blend-difference relative z-20 text-center md:text-left"
                    />

                    {/* IMAGE */}
                    <div className="relative z-10 mt-10 w-full">
                        <div className="aspect-[16/9] md:aspect-[21/9] rounded-xl perspective-[1000px]">
                            <img
                                ref={frameRef}
                                src="/img/achievement.webp"
                                alt="achievement"
                                onMouseMove={handleMouseMove}
                                onMouseLeave={handleMouseLeave}
                                className="
                  w-full h-auto
                  object-contain
                  md:h-full md:object-cover
                  will-change-transform
                  rounded-xl
                  origin-center
                "
                            />
                        </div>

                        {/* SVG FILTER */}
                        <svg
                            className="invisible absolute size-0"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <defs>
                                <filter id="flt_tag">
                                    <feGaussianBlur
                                        in="SourceGraphic"
                                        stdDeviation="8"
                                        result="blur"
                                    />
                                    <feColorMatrix
                                        in="blur"
                                        mode="matrix"
                                        values="1 0 0 0 0  
                            0 1 0 0 0  
                            0 0 1 0 0  
                            0 0 0 19 -9"
                                        result="flt_tag"
                                    />
                                    <feComposite
                                        in="SourceGraphic"
                                        in2="flt_tag"
                                        operator="atop"
                                    />
                                </filter>
                            </defs>
                        </svg>
                    </div>

                    {/* BOTTOM SECTION */}
                    <div className="relative z-30 mt-7 grid w-full grid-cols-1 gap-5 md:grid-cols-3">

                        {/* LEFT SIDE: NEWS SECTION (2 Columns) */}
                        <div className="flex flex-col gap-4 md:col-span-2">
                            {/* Header: Title Left, Controls Right */}
                            <div className="flex items-center justify-between">
                                <h3 className="font-general text-xs uppercase tracking-widest text-white/60">
                                    Latest News
                                </h3>

                                <div className="flex items-center gap-2">
                                    <ArrowButton
                                        direction="left"
                                        onClick={handlePrev}
                                        disabled={currentScrollIndex === 0}
                                    />
                                    <ArrowButton
                                        direction="right"
                                        onClick={handleNext}
                                        disabled={currentScrollIndex >= maxIndex}
                                    />
                                </div>
                            </div>

                            {/* CAROUSEL CONTAINER */}
                            <div className="w-full overflow-hidden">
                                <div
                                    className="flex gap-4 transition-transform duration-500 ease-in-out"
                                    style={{
                                        transform: `translateX(calc(-${currentScrollIndex} * (50% + 0.5rem)))`,
                                    }}
                                >
                                    {newsItems.map((item) => (
                                        <div
                                            key={item.id}
                                            className="group relative flex w-[calc(50%-0.5rem)] flex-shrink-0 flex-col justify-between overflow-hidden rounded-lg border border-white/10 bg-white/5 p-4 transition-colors hover:bg-white/10 cursor-pointer"
                                        >
                                            <div className="relative mb-3 aspect-[16/9] w-full overflow-hidden rounded-md bg-black">
                                                <img
                                                    src={item.src}
                                                    alt={item.title}
                                                    className="h-full w-full object-cover opacity-80 transition-transform duration-500 group-hover:scale-110 group-hover:opacity-100"
                                                />
                                            </div>

                                            <div className="flex flex-col gap-2">
                                                <div className="flex items-center gap-2">
                                                    <span className="rounded-[2px] bg-white/10 px-1.5 py-0.5 font-general text-[8px] uppercase tracking-wide text-white">
                                                        News
                                                    </span>
                                                    <span className="font-general text-[9px] uppercase tracking-wide text-white/40">
                                                        {item.date}
                                                    </span>
                                                </div>

                                                <h4 className="font-circular-web text-xs font-bold uppercase leading-tight text-white transition-colors group-hover:text-red-500">
                                                    {item.title}
                                                </h4>

                                                <p className="line-clamp-2 font-circular-web text-[10px] text-violet-50/60">
                                                    {item.desc}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* RIGHT SIDE: TEXT + CTA (1 Column) */}
                        <div className="flex w-full flex-col items-center justify-end md:col-span-1 md:items-end md:justify-end pb-2">
                            <p className="mb-4 max-w-xs text-center md:text-right font-general text-xs tracking-wider text-white/60">
                                Reinforce yourself for the best-selling shooter of 2025 with the Battlefield™ 6 Phantom Edition. Includes a Battlefield Pro Token, the Phantom Pack, and more.
                            </p>

                            <Button
                                id="buy-btn"
                                title="buy now"
                                containerClass="mt-5"
                                href="https://www.ea.com/en/games/battlefield/battlefield-6/buy/checkout?platform=EA-APP&edition=standard"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FloatingImage;