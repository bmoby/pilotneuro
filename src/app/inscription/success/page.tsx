import Link from "next/link";
import styles from "./page.module.css";

export default function SuccessPage() {
    return (
        <main className={styles.page}>
            <div className={styles.container}>
                <div className={styles.iconWrapper}>
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                    </svg>
                </div>

                <h1 className={styles.title}>Ваша заявка принята!</h1>

                <div className={styles.message}>
                    <p>
                        Спасибо за доверие. Мы уже обрабатываем ваши данные.
                    </p>
                    <p style={{ marginTop: "16px" }}>
                        В ближайшее время вы получите письмо на указанный Email (или сообщение в WhatsApp) со ссылкой на оплату. Ваше место в группе будет забронировано только после подтверждения оплаты.
                    </p>
                </div>

                <div className={styles.warningBox}>
                    Пожалуйста, не торопитесь. У вас есть время, чтобы еще раз все обдумать перед оплатой. Мы ценим осознанность и хотим работать с теми, кто действительно готов к серьезному обучению.
                </div>

                <Link href="/" className={styles.homeButton}>
                    Вернуться на главную
                </Link>
            </div>
        </main>
    );
}
