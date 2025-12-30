/* Этот файл собирает HERO с логотипом, интро-видео и голосовым блоком.
   Он показывает статичный чёрный логотип PilotNeuro, короткий ролик и текст о курсе.
   Он даёт возможность сразу послушать пример голосового сообщения и увидеть каску крупным планом.
   Он является Server Component для лучшего SEO (текст виден сразу). */

import HeroVideo from "./HeroVideo";
import VoiceMessage from "./VoiceMessage";
import styles from "./HeroSection.module.css";

export default function HeroSection() {
  return (
    <section className={styles.hero}>
      <div className={styles.wrap}>
        <div className={styles.heroBody}>
          {/* LOGO TEXTUEL */}
          <div className={styles.brandName}>PILOT NEURO</div>

          {/* LIMITED SPOTS BADGE */}
          <div className={styles.promoBadge}>
            Набор 30 мест
          </div>

          {/* VIDEO */}
          <HeroVideo />

          {/* TITRE */}
          <h1 className={styles.heroTitle}>
            КУРС АРХИТЕКТОР <br />ИИ ВЕБ РЕШЕНИЙ
          </h1>

          {/* VOICE MESSAGE */}
          <div
            className={styles.voiceArea}
            aria-label="Пример голосового сообщения"
          >
            <VoiceMessage src="/vocals/01.m4a" title="Голосовое сообщение — Tsarag" />
          </div>

          {/* DESCRIPTION DU COURS */}
          <p className={styles.heroDescription}>
            Не просто курсы, а отбор в команду. Мы готовим разработчиков нового поколения, создающих решения с ИИ быстрее конкурентов. Моя цель сформировать группу архитекторов решений.
          </p>

          {/* DATE BADGE */}
          <div className={styles.promoBadge} style={{ marginTop: "16px", marginBottom: "8px" }}>
            Старт 23 марта 2026
          </div>
        </div>
      </div>
    </section >
  );
}
