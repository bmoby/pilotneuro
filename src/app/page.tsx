/* Этот файл показывает главную страницу.
   Он берет HERO из accueil.html и ставит его на главное место.
   Он даёт человеку сразу увидеть логотип и услышать пример голосового. */

import styles from "./page.module.css";
import HeroSection from "../components/HeroSection";
import FitSection from "../components/FitSection";
import ResultsSection from "../components/ResultsSection";

/* Этот компонент выводит только HERO с логотипом и голосовым сообщением. */
export default function Home() {
  return (
    <main className={styles.page}>
      {/* Этот блок вставляет готовую HERO-секцию с анимированным логотипом. */}
      <HeroSection />
      {/* Этот блок добавляет секцию «Это для вас?» с карточками и голосовым. */}
      <FitSection />
      {/* Этот блок показывает ожидаемые результаты и анимированные иконки. */}
      <ResultsSection />
    </main>
  );
}
