/* Этот файл отвечает ТОЛЬКО за видео-часть (Интро + Луп).
   Он клиентский, так как управляет воспроизведением, refs и событиями. */

"use client";

import { useEffect, useRef } from "react";
import styles from "./HeroVideo.module.css";

export default function HeroVideo() {
    /* В этой ссылке держим элемент видео, чтобы запустить его без задержек. */
    const introVideoRef = useRef<HTMLVideoElement | null>(null);
    /* Здесь держим второй ролик, чтобы сразу показать бесконечную версию. */
    const loopVideoRef = useRef<HTMLVideoElement | null>(null);

    /* Этот эффект заставляет Safari на телефонах не блокировать автоматический старт. */
    useEffect(() => {
        const intro = introVideoRef.current;
        const loop = loopVideoRef.current;
        if (!intro || !loop) return;

        intro.muted = true;
        loop.muted = true;
        intro.playsInline = true;
        loop.playsInline = true;
        intro.setAttribute("muted", "true");
        loop.setAttribute("muted", "true");
        intro.setAttribute("playsinline", "true");
        loop.setAttribute("playsinline", "true");
        intro.setAttribute("webkit-playsinline", "true");
        loop.setAttribute("webkit-playsinline", "true");

        const unlockPlayback = () => {
            const introPlay = intro.play();
            if (introPlay && typeof introPlay.then === "function") {
                introPlay.catch(() => { });
            }

            // FIX: Restore iOS "warmup" pattern. 
            // Safari requires direct interaction or specific "blessing" for smooth chain playback.
            // Playing and immediately pausing authorizes the video element.
            const loopPlay = loop.play();
            if (loopPlay && typeof loopPlay.then === "function") {
                loopPlay
                    .then(() => {
                        loop.pause();
                        loop.currentTime = 0;
                    })
                    .catch(() => { });
            } else {
                loop.pause();
                loop.currentTime = 0;
            }
        };

        unlockPlayback();

        const handleFirstTap = () => {
            unlockPlayback();
            document.removeEventListener("touchstart", handleFirstTap);
            document.removeEventListener("click", handleFirstTap);
        };

        document.addEventListener("touchstart", handleFirstTap, { once: true });
        document.addEventListener("click", handleFirstTap, { once: true });

        return () => {
            document.removeEventListener("touchstart", handleFirstTap);
            document.removeEventListener("click", handleFirstTap);
        };
    }, []);

    /* Этот эффект принудительно стартует ИНТРО видео сразу, как только есть данные. */
    useEffect(() => {
        const video = introVideoRef.current;
        if (!video) return;

        const startPlayback = () => {
            const playPromise = video.play();
            if (playPromise && typeof playPromise.then === "function") {
                playPromise.catch(() => { });
            }
        };

        if (video.readyState >= 2) {
            startPlayback();
            return;
        }

        video.addEventListener("loadeddata", startPlayback, { once: true });
        return () => video.removeEventListener("loadeddata", startPlayback);
    }, []);

    /* Этот эффект отвечает за предзагрузку лупа. Мы даем интро фору в 1с, затем грузим луп. */
    useEffect(() => {
        const loop = loopVideoRef.current;
        if (!loop) return;

        const preloadLoop = () => {
            if (loop.preload === "none") {
                loop.preload = "auto";
                loop.load();
            }
        };

        // Даем интро 500мс форы на старт загрузки, затем начинаем качать луп
        const timer = setTimeout(preloadLoop, 500);
        return () => clearTimeout(timer);
    }, []);

    /* Этот эффект плавно включает зацикленную часть без вспышек после интро. */
    useEffect(() => {
        const intro = introVideoRef.current;
        const loop = loopVideoRef.current;
        if (!intro || !loop) return;

        let loopReady = loop.readyState >= 2;
        let introEnded = false;

        const startLoop = () => {
            // Make loop visible immediately (it might be paused on first frame)
            loop.classList.add(styles.heroVideoVisible);

            const loopPlay = loop.play();
            if (loopPlay && typeof loopPlay.then === "function") {
                loopPlay.then(() => {
                    // Hide intro ONLY after loop has actually started playing
                    intro.classList.add(styles.heroVideoHidden);
                }).catch(() => {
                    // Even if error, ensure intro is hidden if we really wanted to swap, 
                    // OR keep intro if loop failed? Better to hide intro to avoid stuck frame if we are desperate.
                    // But safer:
                    intro.classList.add(styles.heroVideoHidden);
                });
            } else {
                intro.classList.add(styles.heroVideoHidden);
            }
        };

        const markLoopReady = () => {
            loopReady = true;
            if (introEnded) {
                startLoop();
            }
        };

        // Если луп пока не готов, ждём его.
        if (!loopReady) {
            loop.addEventListener("loadeddata", markLoopReady, { once: true });
        }

        const swapToLoop = () => {
            introEnded = true;

            // Если мы уже дошли до конца интро, а луп еще "none", форсируем немедленно
            if (loop.preload === "none") {
                loop.preload = "auto";
                loop.load();
            }

            if (!loopReady) {
                // Если интро закончилось, а луп не готов -> ждем loadeddata (подписались выше)
                return;
            }
            startLoop();
        };

        intro.addEventListener("ended", swapToLoop);
        return () => {
            intro.removeEventListener("ended", swapToLoop);
            loop.removeEventListener("loadeddata", markLoopReady);
        };
    }, []);

    return (
        <div className={styles.heroMedia}>
            <video
                ref={introVideoRef}
                className={styles.heroVideo}
                preload="auto"
                muted
                playsInline
                autoPlay
                aria-label="Courte vidéo d'introduction sur le casque Formula"
                poster="/hero-poster.jpg"
            >
                {/* Сначала отдаём мобильные версии, чтобы телефон тратил меньше трафика. */}
                <source
                    src="/two_helmets-intro-hvc1.mp4"
                    type='video/mp4; codecs="hvc1"'
                />

                <source
                    src="/two_helmets-intro-h264.mp4"
                    type='video/mp4; codecs="avc1.42E01E"'
                />
            </video>
            {/* Этот второй ролик загружается c preload="none" и крутится бесконечно после первого. */}
            <video
                ref={loopVideoRef}
                className={`${styles.heroVideo} ${styles.heroVideoLoop}`}
                preload="none"
                muted
                playsInline
                loop
                aria-label="Suite en boucle sur le casque Formula"
            >
                <source
                    src="/two_helmets_loop-intro-hvc1.mp4"
                    type='video/mp4; codecs="hvc1"'
                />
                <source
                    src="/two_helmets_loop-intro-h264.mp4"
                    type='video/mp4; codecs="avc1.42E01E"'
                />
            </video>
        </div>
    );
}
