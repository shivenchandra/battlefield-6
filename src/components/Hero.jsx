import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import { TiLocationArrow } from "react-icons/ti";
import { FaWindows, FaPlaystation, FaXbox, FaSteam } from "react-icons/fa";
import { SiEpicgames } from "react-icons/si";
import { useEffect, useRef, useState, memo, useCallback } from "react";

import Button from "./Button";
import VideoPreview from "./VideoPreview";

gsap.registerPlugin(ScrollTrigger);

const BackgroundVideo = memo(({ src, onLoadedData }) => (
    <video
        src={src}
        autoPlay
        loop
        muted
        className="absolute left-0 top-0 size-full object-cover object-center"
        onLoadedData={onLoadedData}
    />
));

const videoUrls = [
    "https://qam4oe93ifx0kmcc.public.blob.vercel-storage.com/hero-1.mp4",
    "https://qam4oe93ifx0kmcc.public.blob.vercel-storage.com/hero-2.mp4",
    "https://qam4oe93ifx0kmcc.public.blob.vercel-storage.com/hero-3.mp4",
    "https://qam4oe93ifx0kmcc.public.blob.vercel-storage.com/hero-4.mp4",
];

const Hero = () => {
    const [currentIndex, setCurrentIndex] = useState(1);
    const [hasClicked, setHasClicked] = useState(false);
    const [currentPlayingIndex, setCurrentPlayingIndex] = useState(1);

    const [loading, setLoading] = useState(true);
    const [loadedVideos, setLoadedVideos] = useState(0);

    const totalVideos = videoUrls.length;
    const nextVdRef = useRef(null);

    const handleVideoLoad = useCallback(() => {
        setLoadedVideos((prev) => prev + 1);
    }, []);

    const getVideoSrc = (index) => videoUrls[index - 1];

    useEffect(() => {
        if (loadedVideos === totalVideos - 1) {
            setLoading(false);
        }
    }, [loadedVideos]);

    const handleMiniVdClick = () => {
        setHasClicked(true);
        setCurrentIndex((prev) => (prev % totalVideos) + 1);
    };

    useGSAP(
        () => {
            if (hasClicked) {
                gsap.set("#next-video", { visibility: "visible" });

                gsap.to("#next-video", {
                    transformOrigin: "center center",
                    scale: 1,
                    width: "100%",
                    height: "100%",
                    duration: 1,
                    ease: "power1.inOut",
                    onStart: () => nextVdRef.current.play(),
                    onComplete: () => {
                        setCurrentPlayingIndex(currentIndex);
                    },
                });

                gsap.from("#current-video", {
                    transformOrigin: "center center",
                    scale: 0,
                    duration: 1.5,
                    ease: "power1.inOut",
                });
            }
        },
        { dependencies: [currentIndex], revertOnUpdate: true }
    );

    useGSAP(() => {
        gsap.set("#video-frame", {
            clipPath: "polygon(14% 0, 72% 0, 88% 90%, 0 95%)",
            borderRadius: "0% 0% 40% 10%",
        });

        gsap.from("#video-frame", {
            clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
            borderRadius: "0% 0% 0% 0%",
            ease: "power1.inOut",
            scrollTrigger: {
                trigger: "#video-frame",
                start: "center center",
                end: "bottom center",
                scrub: true,
            },
        });
    });



    return (
        <div id="home" className="relative h-dvh w-screen overflow-x-hidden">
            {loading && (
                <div className="flex-center absolute z-[100] h-dvh w-screen overflow-hidden bg-violet-50">
                    <div className="three-body">
                        <div className="three-body__dot" />
                        <div className="three-body__dot" />
                        <div className="three-body__dot" />
                    </div>
                </div>
            )}

            <div
                id="video-frame"
                className="relative z-10 h-dvh w-screen overflow-hidden rounded-lg bg-blue-75"
            >
                <div>
                    <div className="mask-clip-path absolute-center absolute z-50 size-64 cursor-pointer overflow-hidden rounded-lg">
                        <VideoPreview>
                            <div
                                onClick={handleMiniVdClick}
                                className="origin-center scale-50 opacity-0 transition-all duration-500 ease-in hover:scale-100 hover:opacity-100"
                            >
                                <video
                                    src={getVideoSrc((currentIndex % totalVideos) + 1)}
                                    loop
                                    muted
                                    id="current-video"
                                    className="size-64 origin-center scale-150 object-cover object-center"
                                    onLoadedData={handleVideoLoad}
                                />
                            </div>
                        </VideoPreview>
                    </div>

                    <video
                        ref={nextVdRef}
                        src={getVideoSrc(currentIndex)}
                        loop
                        muted
                        id="next-video"
                        className="absolute-center invisible absolute z-20 size-64 object-cover object-center"
                        onLoadedData={handleVideoLoad}
                    />

                    <BackgroundVideo
                        src={getVideoSrc(currentPlayingIndex)}
                        onLoadedData={handleVideoLoad}
                    />
                </div>

                {/* === SECOND CODE TEXT === */}
                <h1 className="special-font hero-heading absolute bottom-5 right-5 z-40 text-[#DC3401]">
                    E<b>A</b>
                </h1>

                <div className="absolute left-0 top-0 z-40 size-full">
                    <div className="mt-24 px-5 sm:px-10">
                        <h1 className="special-font hero-heading text-blue-100">
                            B<b>a</b>ttlefield 6
                        </h1>

                        <p className="mb-5 max-w-[19.5rem] md:max-w-[40rem] font-general text-blue-100 text-sm md:text-base">
                            There is no better time to experience the Best FPS of the Year.
                            <br className="hidden md:block" />
                            Join the all-out war between NATO and Pax Armata with new maps,
                            <br className="hidden md:block" />
                            hardware, and features from Season 1, and prepare for endless
                            <br className="hidden md:block" />
                            epic moments that are only in Battlefield.
                        </p>

                        <div className="mb-3 flex items-center gap-3 text-blue-100">
                            <span className="font-general text-xs uppercase">Available on</span>
                            <div className="flex items-center gap-2 text-xl">
                                <FaWindows />
                                <img src="/img/ea app.svg" alt="EA App" className="h-5 invert opacity-100" />
                                <FaPlaystation />
                                <FaXbox />
                                <FaSteam />
                                <SiEpicgames />
                            </div>
                        </div>

                        <Button
                            id="watch-trailer"
                            title="Watch Trailer"
                            leftIcon={<TiLocationArrow />}
                            containerClass="!bg-[#DC3401] flex-center gap-1"
                            href="https://youtu.be/pgNCgJG0vnY?si=kkhN25otB63oQ4nv"
                        />
                    </div>
                </div>
            </div>

            <h1 className="special-font hero-heading absolute bottom-5 right-5 text-black">
                E<b>A</b>
            </h1>
        </div>
    );
};

export default Hero;
