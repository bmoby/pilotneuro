/* Этот файл показывает главную страницу.
   Он берет HERO из accueil.html и ставит его на главное место.
   Он даёт человеку сразу увидеть логотип и услышать пример голосового. */

import styles from "./page.module.css";
import HeroSection from "../components/HeroSection";
import KerbSeparator from "../components/KerbSeparator";
import FitSection from "../components/FitSection";
import ResultsSection from "../components/ResultsSection";
import StudentVoicesSection from "../components/StudentVoicesSection";
import CourseFlowSection from "../components/CourseFlowSection";
import FaqSection from "../components/FaqSection";
import CtaSection from "../components/CtaSection";

/* Этот компонент выводит только HERO с логотипом и голосовым сообщением. */
export default function Home() {
  return (
    <main className={styles.page}>
      {/* Этот блок вставляет готовую HERO-секцию с анимированным логотипом. */}
      <HeroSection />

      {/* Разделитель Minimal (Yellow/White Dash) */}
      <KerbSeparator />

      {/* Этот блок добавляет секцию «Это для вас?» с карточками и голосовым. */}
      <FitSection />
      <KerbSeparator />

      {/* Этот блок показывает ожидаемые результаты и анимированные иконки. */}
      <ResultsSection />
      <KerbSeparator />

      {/* Этот блок показывает отзывы реальных студентов. */}
      <StudentVoicesSection />
      <KerbSeparator />

      {/* Этот блок описывает, как проходит курс: ритм, записи и формат. */}
      <CourseFlowSection />
      <KerbSeparator />

      {/* Этот блок отвечает на частые вопросы. */}
      <FaqSection />
      <KerbSeparator />

      {/* FINAL CTA: Video auto-play + Checkboxes */}
      <CtaSection />
    </main>
  );
}
