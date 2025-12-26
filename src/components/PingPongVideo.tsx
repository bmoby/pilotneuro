/* Ce composant gère une video qui fait des aller-retours (Ping-Pong).
   Elle attend le signal "isActive" pour jouer :
   1. Avance jusqu'au bout.
   2. Pause de 1s.
   3. Recule jusqu'au début (rewind visuel).
   4. Signale qu'elle a fini (onComplete) pour laisser la main à l'autre vidéo.
*/

"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./PingPongVideo.module.css";

type VideoSource = {
    src: string;
    type: string;
};

type PingPongVideoProps = {
    sources: VideoSource[];
    poster?: string;
    isActive: boolean;
    onComplete: () => void;
    width?: number;
    height?: number;
    loops?: number;
};

export default function PingPongVideo({
    sources,
    poster,
    isActive,
    onComplete,
    width = 120,
    height = 120,
    loops = 1,
}: PingPongVideoProps) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const currentLoopRef = useRef(0);

    const playSequence = async () => {
        const video = videoRef.current;
        if (!video) return;

        setIsPlaying(true);
        try {
            // 1. Jouer en avant
            video.playbackRate = 1;
            await video.play();
        } catch (err) {
            console.error("Autoplay failed", err);
            onComplete();
            setIsPlaying(false);
        }
    };

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        if (isActive && !isPlaying) {
            // Démarrage initial
            currentLoopRef.current = 0;
            playSequence();
        } else if (!isActive && isPlaying) {
            // Reset forcé si on devient inactif (ex: scroll out)
            video.pause();
            video.currentTime = 0;
            setIsPlaying(false);
        }
    }, [isActive, isPlaying]);

    const handleEnded = async () => {
        const video = videoRef.current;
        if (!video) return;

        // 2. Pause de 1 seconde à la fin de l'aller
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // 3. Retour en arrière
        const duration = video.duration;
        const rewindDuration = 1000;
        const startTime = performance.now();

        const animateRewind = (time: number) => {
            const elapsed = time - startTime;
            const progress = Math.min(elapsed / rewindDuration, 1);

            try {
                video.currentTime = Math.max(0, duration * (1 - progress));
            } catch (e) {
                // Ignore
            }

            if (progress < 1) {
                requestAnimationFrame(animateRewind);
            } else {
                // Fin du rewind
                video.pause();
                video.currentTime = 0;

                // Incrémenter le compteur de boucles
                currentLoopRef.current += 1;

                if (currentLoopRef.current < loops) {
                    // Si on n'a pas fini les boucles, on relance après une petite pause
                    setTimeout(() => {
                        playSequence();
                    }, 500); // Petite pause entre les répétitions
                } else {
                    // Tout fini, on relâche la main
                    setIsPlaying(false);
                    onComplete();
                }
            }
        };

        requestAnimationFrame(animateRewind);
    };

    return (
        <div className={styles.container} style={{ width, height }}>
            <video
                ref={videoRef}
                className={styles.video}
                muted
                playsInline
                poster={poster}
                onEnded={handleEnded}
                width={width}
                height={height}
            >
                {sources.map((s) => (
                    <source key={s.src} src={s.src} type={s.type} />
                ))}
            </video>
        </div>
    );
}
