/* Этот файл показывает главную страницу.
   Он выводит простое приветствие, чтобы проверить внешний вид проекта.
   Он даёт возможность увидеть общие стили в действии. */

import styles from "./page.module.css";

/* Этот компонент показывает приветственный блок на главной странице. */
export default function Home() {
  return (
    <main className={styles.page}>
      {/* Этот блок собирает текст приветствия и делает его центром экрана. */}
      <div className={styles.content}>
        {/* Этот заголовок приветствует посетителя. */}
        <h1 className={styles.title}>Hello world</h1>
        {/* Этот абзац объясняет, что страница пока служит заготовкой. */}
        <p className={styles.subtitle}>
          Mise en place initiale de PilotNeuro avec un style global inspiré de
          la maquette d&apos;accueil.
        </p>
      </div>
    </main>
  );
}
