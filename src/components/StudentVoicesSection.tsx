/* Этот файл выводит секцию с отзывами студентов.
   Он показывает список карточек с именами и голосовыми сообщениями.
   Он использует компонент VoiceMessage для воспроизведения аудио. */

"use client";

import VoiceMessage from "./VoiceMessage";
import styles from "./StudentVoicesSection.module.css";

/* Список студентов и их аудио-файлов (маппинг на существующие файлы в /public/avis). */
const voices = [
    {
        name: "1:31",
        src: "/avis/Aslan2.m4a", // Placeholder mapping
        duration: "1:31",
    },
    {
        name: "02:05",
        src: "/avis/Aslan.m4a", // Placeholder mapping
        duration: "02:05",
    },
    {
        name: "01:52",
        src: "/avis/Musa.m4a", // Placeholder mapping
        duration: "01:52",
    },
    {
        name: "01:05",
        src: "/avis/Shamil.m4a", // Placeholder mapping
        duration: "01:05",
    },
    {
        name: "00:57",
        src: "/avis/SHamil2.m4a", // Placeholder mapping
        duration: "00:57",
    },
];

export default function StudentVoicesSection() {
    return (
        <section className={styles.section} id="temoignages">
            <div className={styles.wrap}>
                <div className={styles.header}>
                    <h2 className={styles.title}>Голоса студентов</h2>
                    <p className={styles.subtitle}>
                        Короткие голосовые от тех, кто уже прошёл программу и довёл проект
                        до результата.
                    </p>
                </div>

                <div className={styles.grid}>
                    {voices.map((voice) => (
                        <article key={voice.name} className={styles.card}>
                            <div className={styles.cardHeader}>
                                <span className={styles.name}>{voice.name}</span>
                            </div>
                            <VoiceMessage src={voice.src} title={`Голосовое сообщение — ${voice.name}`} />
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}
