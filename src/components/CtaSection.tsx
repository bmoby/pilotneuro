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
    const [finalChoice, setFinalChoice] = useState(false);

    const canRegister = readAll && noQuestions && finalChoice;

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
        alert("Переход к оплате...");
    };

    return (
        <section className={styles.ctaSection}>
            <h2 className={styles.ctaTitle}>
                ВРЕМЯ ДЕЙСТВОВАТЬ
            </h2>

            {/* VIDÉO INTELLIGENTE */}
            <div className={styles.videoWrapper}>
                <video
                    ref={videoRef}
                    className={styles.video}
                    muted
                    playsInline
                    poster="/formula_helmet-intro-first.png"
                    aria-label="Анимация шлема Formula"
                >
                    {/* Ordre de préférence des formats */}
                    <source src="/formula_helmet-intro-hvc1.mp4" type='video/mp4; codecs="hvc1"' />
                    <source src="/formula_helmet-intro-h264.mp4" type='video/mp4; codecs="avc1.42E01E"' />
                </video>
            </div>

            {/* NEW: Price Display */}
            <div className={styles.priceContainer}>
                <div className={styles.priceValue}>1200 €</div>
                <div className={styles.installmentPrice}>400 € / мес (x3)</div>
                <div className={styles.priceSub}>Оплата: 1, 2 или 3 платежа</div>
            </div>

            {/* FORMULAIRE DE VALIDATION */}
            <div className={styles.formContainer}>
                <div className={styles.checkboxGroup}>
                    <label className={styles.checkboxLabel}>
                        <input
                            type="checkbox"
                            className={styles.visuallyHidden}
                            checked={readAll}
                            onChange={(e) => setReadAll(e.target.checked)}
                        />
                        <div className={styles.customCheckbox}>
                            <svg
                                className={styles.checkboxIcon}
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M20.707 5.293a1 1 0 010 1.414l-11 11a1 1 0 01-1.414 0l-5-5a1 1 0 011.414-1.414L9 15.586 19.293 5.293a1 1 0 011.414 0z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </div>
                        <span>
                            Я внимательно изучил(а) всю информацию выше.
                        </span>
                    </label>

                    <label className={styles.checkboxLabel}>
                        <input
                            type="checkbox"
                            className={styles.visuallyHidden}
                            checked={noQuestions}
                            onChange={(e) => setNoQuestions(e.target.checked)}
                        />
                        <div className={styles.customCheckbox}>
                            <svg
                                className={styles.checkboxIcon}
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M20.707 5.293a1 1 0 010 1.414l-11 11a1 1 0 01-1.414 0l-5-5a1 1 0 011.414-1.414L9 15.586 19.293 5.293a1 1 0 011.414 0z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </div>
                        <span>
                            У меня нет вопросов, я хочу попасть в команду.
                        </span>
                    </label>

                    {/* NEW: Final Choice Checkbox */}
                    <label className={styles.checkboxLabel}>
                        <input
                            type="checkbox"
                            className={styles.visuallyHidden}
                            checked={finalChoice}
                            onChange={(e) => setFinalChoice(e.target.checked)}
                        />
                        <div className={styles.customCheckbox}>
                            <svg
                                className={styles.checkboxIcon}
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M20.707 5.293a1 1 0 010 1.414l-11 11a1 1 0 01-1.414 0l-5-5a1 1 0 011.414-1.414L9 15.586 19.293 5.293a1 1 0 011.414 0z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </div>
                        <div className={styles.checkboxContent}>
                            <span>
                                Я подтверждаю: моё решение окончательное.
                            </span>
                            <span className={styles.checkboxNote}>
                                Мы ценим время друг друга.
                            </span>
                        </div>
                    </label>
                </div>

                {/* NEW: Warning Note */}
                <div className={styles.impulseWarning}>
                    Только узнали обо мне? Подождите день. <br />
                    Не делайте импульсивных покупок.
                </div>

                <button
                    className={styles.submitButton}
                    disabled={!canRegister}
                    onClick={handleRegister}
                >
                    ЗАПИСАТЬСЯ
                </button>
            </div>
        </section >
    );
}
