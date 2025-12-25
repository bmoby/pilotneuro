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
          <div className={styles.heroHead}>
            {/* LOGO TEXTUEL: Чистый, простой, эффективный. */}
            <div className={styles.brandName}>PILOT NEURO</div>

            <h1 className={styles.heroTitle}>
              Научитесь создавать <br />
              с Искусственным Интеллектом
            </h1>
          </div>

          <p className={styles.lede}>
            Уникальный курс для освоения инструментов ИИ и создания собственных
            веб-продуктов в рекордные сроки.
          </p>

          {/* Этот блок показывает компактное видео каски с автозапуском. */}
          {/* Вся логика видео вынесена в клиентский компонент HeroVideo. */}
          <HeroVideo />

          {/* Этот блок ставит голосовое сообщение точно по центру. */}
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
