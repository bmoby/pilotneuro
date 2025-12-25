/* Этот файл выводит секцию с отзывами студентов.
   Он показывает список карточек с именами и голосовыми сообщениями.
   Он использует компонент VoiceMessage для воспроизведения аудио. */

"use client";

import VoiceMessage from "./VoiceMessage";
import styles from "./StudentVoicesSection.module.css";

/* Список студентов и их аудио-файлов (маппинг на существующие файлы в /public/avis). */
const voices = [
    {
        name: "Андрей",
        src: "/avis/Musa.m4a", // Placeholder mapping
        duration: "0:28",
    },
    {
        name: "Мария",
        src: "/avis/Aslan.m4a", // Placeholder mapping
        duration: "0:19",
    },
    {
        name: "Рустам",
        src: "/avis/Shamil.m4a", // Placeholder mapping
        duration: "0:23",
    },
    {
        name: "Екатерина",
        src: "/avis/SHamil2.m4a", // Placeholder mapping
        duration: "0:17",
    },
    {
        name: "Илья",
        src: "/avis/ibra.m4a", // Placeholder mapping
        duration: "0:21",
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
