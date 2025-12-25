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

          {/* VIDEO */}
          <HeroVideo />

          {/* TITRE */}
          <h1 className={styles.heroTitle}>
            Научитесь создавать <br />
            с Искусственным Интеллектом
          </h1>

          {/* VOICE MESSAGE */}
          <div
            className={styles.voiceArea}
            aria-label="Пример голосового сообщения"
          >
            <VoiceMessage src="/avis/Musa.m4a" title="Голосовое сообщение — Муса" />
          </div>
        </div>
      </div>
    </section>
  );
}
