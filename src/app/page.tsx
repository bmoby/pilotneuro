/* Этот файл показывает главную страницу.
   Он помогает быстро проверить внешний вид и работу аудио-компонента.
   Он выводит карточку с приветствием и тестовым голосовым сообщением. */

import styles from "./page.module.css";
import VoiceMessage from "../components/VoiceMessage";

/* Этот компонент показывает приветственный блок на главной странице. */
export default function Home() {
  return (
    <main className={styles.page}>
      {/* Этот блок собирает приветствие и тестовый плеер в центре экрана. */}
      <div className={styles.content}>
        {/* Этот заголовок сообщает, что ниже находится тестовый плеер. */}
        <h1 className={styles.title}>Message vocal test</h1>
        {/* Этот абзац объясняет, что используется пример Musa.aif. */}
        <p className={styles.subtitle}>Lecture du message vocal Musa.aif.</p>
        {/* Этот блок показывает компонент голосового сообщения для проверки. */}
        <div className={styles.voiceZone}>
          <VoiceMessage src="/avis/Musa.m4a" title="Message vocal — Musa" />
        </div>
      </div>
    </main>
  );
}
