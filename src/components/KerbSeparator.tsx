/* Этот компонент создаёт МИНИМАЛИСТИЧНЫЙ разделитель.
   Тонкие линии и маленький акцент в центре напоминают о треке,
   но не перегружают дизайн. */

import styles from "./KerbSeparator.module.css";

export default function KerbSeparator() {
    return (
        <div className={styles.container} role="separator" aria-hidden="true">
            <div className={`${styles.line} ${styles.lineLeft}`} />

            <div className={styles.accent}>
                <div className={`${styles.dash} ${styles.red}`} />
                <div className={`${styles.dash} ${styles.white}`} />
                <div className={`${styles.dash} ${styles.red}`} />
            </div>

            <div className={`${styles.line} ${styles.lineRight}`} />
        </div>
    );
}
