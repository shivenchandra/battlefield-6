import { TiLocationArrow } from "react-icons/ti"
import { useState, useRef } from "react"

const BentoTilt = ({ children, className = '' }) => {
    const [transformStyle, setTransformStyle] = useState('');
    const itemRef = useRef(null);

    const handleMouseMove = (e) => {
        if (!itemRef.current) return;

        const { left, top, width, height } = itemRef.current.getBoundingClientRect();

        const relativeX = (e.clientX - left) / width;
        const relativeY = (e.clientY - top) / height;

        const tiltX = (relativeY - 0.5) * 7.5;
        const tiltY = (relativeX - 0.5) * -7.5;

        const newTransform = `perspective(700px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(0.95,0.95,0.95)`;

        setTransformStyle(newTransform)
    }
    const handleMouseLeave = () => {
        setTransformStyle('');
    }

    return (
        <div className={className} ref={itemRef} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave} style={{ transform: transformStyle }}>
            {children}
        </div>
    )
}

const BentoCard = ({ src, title, description, LearnMore }) => {
    const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
    const [hoverOpacity, setHoverOpacity] = useState(0);
    const hoverButtonRef = useRef(null);

    const handleMouseMove = (event) => {
        if (!hoverButtonRef.current) return;
        const rect = hoverButtonRef.current.getBoundingClientRect();

        setCursorPosition({
            x: event.clientX - rect.left,
            y: event.clientY - rect.top,
        });
    };

    const handleMouseEnter = () => setHoverOpacity(1);
    const handleMouseLeave = () => setHoverOpacity(0);
    return (
        <div className="relative size-full">
            <video
                src={src}
                loop
                muted
                autoPlay
                className="absolute left-0 top-0 size-full object-cover object-[100%_100%]"
            />

            {/* gradient + overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />

            <div className="relative z-10 flex size-full flex-col justify-between p-6">
                <div className="max-w-sm">
                    <h1 className="bento-title special-font text-white">
                        {title}
                    </h1>

                    <p className="mt-3 max-w-64 text-xs md:text-base text-blue-100">
                        {description}
                    </p>

                </div>
                {LearnMore && (
                    <div
                        ref={hoverButtonRef}
                        onMouseMove={handleMouseMove}
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                        className="border-hsla relative flex w-fit cursor-pointer items-center gap-1 overflow-hidden rounded-full bg-black px-5 py-2 text-xs uppercase text-white/20"
                    >
                        {/* Radial gradient hover effect */}
                        <div
                            className="pointer-events-none absolute -inset-px opacity-0 transition duration-300"
                            style={{
                                opacity: hoverOpacity,
                                background: `radial-gradient(100px circle at ${cursorPosition.x}px ${cursorPosition.y}px, #e2656588, #00000026)`,
                            }}
                        />
                        <TiLocationArrow className="relative z-20" />
                        <p className="relative z-20">coming soon</p>
                    </div>
                )}
            </div>
        </div>
    );
};

const Features = () => {
    return (
        <section id="features" className='bg-[url("/img/background.png")] bg-cover bg-center pb-52'>
            <div className='container mx-auto px-3 mid:px-10'>
                <div className='px-5 py-32'>
                    <p className='font-circular-web text-lg text-blue-50'>
                        THIS IS BATTLEFIELD 6
                    </p>
                    <p className='max-w-md font-general text-lg text-blue-50 tracking-wide opacity-50'>
                        All-out war, fast-paced close-quarters combat, tactical destruction – Welcome to the definitive Battlefield experience.
                    </p>
                </div>
                <BentoTilt className='border-hsla relative mb-7 h-96 w-full overflow-hidden rounded-md md:h-[65vh]'>
                    <BentoCard
                        src="https://qam4oe93ifx0kmcc.public.blob.vercel-storage.com/feature-1.mp4"
                        title={<>Mod<b>e</b>s</>}
                        description="Seize glory in large-scale modes like Conquest, Breakthrough, and Rush. Jump into fast-paced intense experiences with King of the Hill and Domination."
                        LearnMore
                    />
                </BentoTilt>
                <div className="grid h-[135vh] grid-cols-2 grid-rows-3 gap-7">
                    <BentoTilt className="bento-tilt_1 row-span-1 md:col-span-1 md:row-span-2">
                        <BentoCard
                            src="https://qam4oe93ifx0kmcc.public.blob.vercel-storage.com/feature-2.mp4"
                            title={<>M<b>a</b>ps</>}
                            description="Fight in iconic locations all over the world like Cairo, Brooklyn, Gibraltar and more."
                            LearnMore
                        />
                    </BentoTilt>
                    <BentoTilt className="bento-tilt_1 row-span-1 ms-32 md:col-span-1 md:ms-0">
                        <BentoCard
                            src="https://qam4oe93ifx0kmcc.public.blob.vercel-storage.com/feature-3.mp4"
                            title={<>Cl<b>a</b>ss<b>es</b></>}
                            description="Four classes, more ways to battle. Battlefield empowers your squad to play the way you want."
                            LearnMore
                        />
                    </BentoTilt>
                    <BentoTilt className="bento-tilt_1 me-14 md:col-span-1 md:me-0">
                        <BentoCard
                            src="https://qam4oe93ifx0kmcc.public.blob.vercel-storage.com/feature-4.mp4"
                            title={<>T<b>A</b>CTIC<b>A</b>L <b>D</b>ESTR<b>U</b>C<b>T</b>ION</>}
                            description="Transform your surroundings for a strategic advantage. More reactive, consistent, and tactical than ever before."
                            LearnMore
                        />
                    </BentoTilt>
                    <BentoTilt className="bento-tilt_2">
                        <div className="flex size-full flex-col justify-between bg-red-500 p-5">
                            <h1 className="bento-title special-font max-w-64 text-black">
                                Le<b>a</b>rn M<b>o</b>re!
                            </h1>
                            <TiLocationArrow className="m-5 scale-[5] self-end" />
                        </div>
                    </BentoTilt>
                    <BentoTilt className="bento-tilt_2">
                        <video
                            src="https://qam4oe93ifx0kmcc.public.blob.vercel-storage.com/feature-5.mp4"
                            loop
                            muted
                            autoPlay
                            className="size-full object-cover object-center"
                        />
                    </BentoTilt>
                </div>
            </div>
        </section>
    )
}

export default Features