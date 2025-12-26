/* Ce fichier affiche la section finale d'appel à l'action.
   Il contient une vidéo qui se lance automatiquement au scroll (et recommence si on revient).
   Il oblige l'utilisateur à cocher deux cases de confirmation avant de pouvoir s'inscrire. */

"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./CtaSection.module.css";

export default function CtaSection() {
    const videoRef = useRef<HTMLVideoElement>(null);

    // États pour les checkbox
    const [readAll, setReadAll] = useState(false);
    const [noQuestions, setNoQuestions] = useState(false);

    const canRegister = readAll && noQuestions;

    // Gestion de la lecture vidéo au scroll
    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        // Quand la section est visible : on joue
                        video.play().catch(() => { });
                    } else {
                        // Quand on quitte la section : on pause et on remet à zéro
                        video.pause();
                        video.currentTime = 0;
                    }
                });
            },
            {
                threshold: 0.4, // Déclenche quand 40% de la section est visible
            }
        );

        observer.observe(video);

        return () => {
            observer.disconnect();
        };
    }, []);

    const handleRegister = () => {
        if (!canRegister) return;
        // Logique d'inscription à ajouter ici (redirection, modal, etc.)
        alert("Redirection vers le paiement...");
    };

    return (
        <section className={styles.ctaSection}>
            {/* VIDÉO INTELLIGENTE */}
            <div className={styles.videoWrapper}>
                <video
                    ref={videoRef}
                    className={styles.video}
                    muted
                    playsInline
                    poster="/formula_helmet-intro-first.png"
                    aria-label="Casque Formula animation finale"
                >
                    {/* Ordre de préférence des formats */}
                    <source src="/formula_helmet-intro-hvc1.mp4" type='video/mp4; codecs="hvc1"' />
                    <source src="/formula_helmet-intro-h264.mp4" type='video/mp4; codecs="avc1.42E01E"' />
                </video>
            </div>

            {/* FORMULAIRE DE VALIDATION */}
            <div className={styles.formContainer}>
                <div className={styles.checkboxGroup}>
                    <label className={styles.checkboxLabel}>
                        <input
                            type="checkbox"
                            className={styles.inputCheckbox}
                            checked={readAll}
                            onChange={(e) => setReadAll(e.target.checked)}
                        />
                        <span>
                            J'ai lu l'intégralité du contenu plus haut en détail.
                        </span>
                    </label>

                    <label className={styles.checkboxLabel}>
                        <input
                            type="checkbox"
                            className={styles.inputCheckbox}
                            checked={noQuestions}
                            onChange={(e) => setNoQuestions(e.target.checked)}
                        />
                        <span>
                            Je n'ai pas de questions, je veux faire partie de l'équipe.
                        </span>
                    </label>
                </div>

                <button
                    className={styles.submitButton}
                    disabled={!canRegister}
                    onClick={handleRegister}
                >
                    S'INSCRIRE
                </button>
            </div>
        </section>
    );
}
