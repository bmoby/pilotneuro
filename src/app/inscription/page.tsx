/* Эта страница содержит форму регистрации на курс.
   Она показывает небольшое видео-интро и саму форму с полями.
   Она адаптирована для мобильных устройств. */

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
                <img
                    src="/flags.png"
                    alt="Flags"
                    className={styles.flagsImage}
                />
                <h1 className={styles.pageTitle}>Регистрация</h1>
                <p className={styles.pageSubtitle}>
                    Заполните форму ниже, чтобы забронировать свое место в PilotNeuro.
                </p>
            </div>

            {/* The main registration form */}
            <RegistrationForm />
        </main>
    );
}
