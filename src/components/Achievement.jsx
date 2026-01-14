import gsap from "gsap";
import { useRef } from "react";

import Button from "./Button";
import AnimatedTitle from "./AnimatedTitle";

const FloatingImage = () => {
    const frameRef = useRef(null);

    const isDesktop =
        typeof window !== "undefined" &&
        window.matchMedia("(min-width: 768px)").matches;

    const handleMouseMove = (e) => {
        if (!isDesktop) return;

        const element = frameRef.current;
        if (!element) return;

        const rect = element.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -10;
        const rotateY = ((x - centerX) / centerX) * 10;

        gsap.to(element, {
            rotateX,
            rotateY,
            transformPerspective: 600,
            duration: 0.3,
            ease: "power1.out",
        });
    };

    const handleMouseLeave = () => {
        const element = frameRef.current;
        if (!element) return;

        gsap.to(element, {
            rotateX: 0,
            rotateY: 0,
            duration: 0.4,
            ease: "power2.out",
        });
    };

    return (
        <section
            id="story"
            className="relative min-h-dvh w-screen overflow-hidden bg-black text-blue-50"
        >
            <div className="flex w-full flex-col items-center py-10 pb-32">
                <p className="font-general text-sm uppercase md:text-[10px]">
                    Electronic Arts
                </p>

                {/* MAIN WRAPPER */}
                <div className="relative w-full max-w-7xl px-4">
                    {/* TITLE */}
                    <AnimatedTitle
                        title="B<b>A</b>TTLEFI<b>E</b>LD 6 <br /> B<b>E</b>ST <b>F</b>PS of 2025"
                        containerClass="mt-5 pointer-events-none mix-blend-difference relative z-20 text-center md:text-left"
                    />

                    {/* IMAGE */}
                    <div className="relative z-10 mt-10 w-full">
                        {/* Added 'transform' to help fix overflow issues during animation */}
                        <div className="aspect-[16/9] md:aspect-[21/9] overflow-hidden rounded-xl transform">
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
                "
                            />
                        </div>

                        {/* SVG FILTER (kept intact) */}
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

                    {/* TEXT + CTA */}
                    <div
                        className="
              relative z-30 mt-16
              flex w-full justify-center
              md:mt-10 md:justify-end
            "
                    >
                        <div className="flex max-w-md flex-col items-center md:items-start">
                            <p className="mt-3 text-center font-circular-web text-violet-50 md:text-left">
                                Reinforce yourself for the best-selling shooter of 2025 with the
                                Battlefield™ 6 Phantom Edition. Includes a Battlefield Pro
                                Token, the Phantom Pack, and more.
                            </p>

                            <Button
                                id="buy-btn"
                                title="buy now"
                                containerClass="mt-5"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FloatingImage;