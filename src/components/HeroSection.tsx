/* Этот файл собирает HERO с логотипом, интро-видео и голосовым блоком.
   Он показывает статичный чёрный логотип PilotNeuro, короткий ролик и текст о курсе.
   Он даёт возможность сразу послушать пример голосового сообщения и увидеть каску крупным планом.
   Он является Server Component для лучшего SEO (текст виден сразу). */

import Image from "next/image";
import VoiceMessage from "./VoiceMessage";
import HeroVideo from "./HeroVideo";
import styles from "./HeroSection.module.css";

export default function HeroSection() {
  return (
    /* Этот блок формирует верхнюю секцию с логотипом и описанием. */
    <section className={styles.hero} aria-labelledby="hero-title">
      <div className={styles.wrap}>
        <div className={styles.heroBody}>
          {/* Этот блок показывает компактное видео каски с автозапуском. */}
          {/* Вся логика видео вынесена в клиентский компонент HeroVideo. */}
          <HeroVideo />

          {/* Этот блок ставит компактный логотип сразу под видео. */}
          <div className={styles.heroHead}>
            <h1 className={styles.heroTitle} id="hero-title">
              <span className={styles.srOnly}>PilotNeuro</span>
              <span className={styles.logoWrap}>
                <Image
                  className={styles.heroLogo}
                  src="/filledLogo.svg"
                  alt=""
                  width={740}
                  height={100}
                  priority
                />
              </span>
            </h1>
          </div>

          <p className={styles.lede}>
            Обучающий курс по ИИ, который даст вам навыки для создания,
            инноваций и продажи уникальных услуг.
          </p>

          {/* Этот блок ставит голосовое сообщение точно по центру. */}
          <div
            className={styles.voiceArea}
            aria-label="Пример голосового сообщения"
          >
            <VoiceMessage src="/avis/Musa.m4a" title="Message vocal — Musa" />
          </div>
        </div>
      </div>
    </section>
  );
}
