"use client";

import Link from "next/link";
import styles from "./page.module.css";
import RegistrationForm from "../../components/RegistrationForm";

export default function InscriptionPage() {
    return (
        <main className={styles.page}>
            <Link href="/" className={styles.backButton}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M19 12H5M12 19l-7-7 7-7" />
                </svg>
            </Link>

            <div className={styles.heroWrapper}>
                <div className={styles.videoWrapper}>
                    <video
                        className={styles.video}
                        autoPlay
                        muted
                        playsInline
                        /* No loop, so it will freeze on last frame */
                        poster="/formula_helmet-intro-first.png"
                        aria-label="Анимация шлема Formula"
                    >
                        <source src="/formula_helmet-intro-hvc1.mp4" type='video/mp4; codecs="hvc1"' />
                        <source src="/formula_helmet-intro-h264.mp4" type='video/mp4; codecs="avc1.42E01E"' />
                    </video>
                </div>
                <h1 className={styles.pageTitle}>Регистрация</h1>
                <p className={styles.pageSubtitle}>
                    Заполните форму ниже, чтобы забронировать свое место в PilotNeuro.
                </p>
                <div className={styles.infoBadge}>
                    Старт 23 марта 2026
                </div>
            </div>

            {/* The main registration form */}
            <RegistrationForm />
        </main>
    );
}
