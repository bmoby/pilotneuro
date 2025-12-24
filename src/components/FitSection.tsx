/* Этот файл строит секцию «Это для вас?».
   Он показывает заголовок с плавным проявлением букв при прокрутке и две ленты карточек.
   Он даёт человеку быстро понять, подходит ему курс или нет, и послушать голосовое. */

"use client";

import { useEffect, useRef } from "react";
import VoiceMessage from "./VoiceMessage";
import FitCard, { FitCardData } from "./FitCard";
import styles from "./FitSection.module.css";

/* В этом списке лежат пункты, где участие точно «да». */
const fitYes: FitCardData[] = [
  {
    title: "ДА, ЕСЛИ",
    detail: "Готовы включиться всерьёз.",
    icon: "/goodsvg.svg",
    ariaLabel: "Подходит",
  },
  {
    title: "Вы хотите перейти в сферу IT",
    detail: "Вам это действительно интересно, и вам нравится работать за компьютером.",
  },
  {
    title: "Вы хотите работать на себя",
    detail: "Вы умеете общаться с клиентами, слушать и адаптироваться под их потребности",
  },
  {
    title: "Вы готовы адаптироваться",
    detail:
      "Вы готовы менять свои привычки, чтобы подстраиваться к ИИ, и хотите быть среди тех, кого ИИ не сможет заменить",
  },
  {
    title: "Вы доступны",
    detail: "Вы можете уделять работе минимум 10–14 часов в неделю на протяжении 3 месяцев",
  },
  {
    title: "Вам нравится создавать",
    detail: "Вы смешиваете идеи, сравниваете и создаёте новое с помощью ИИ",
  },
];

/* В этом списке лежат пункты, где участие лучше отложить. */
const fitNo: FitCardData[] = [
  {
    title: "НЕТ, ЕСЛИ",
    detail: "Нет времени или «просто посмотреть»",
    icon: "/bad.svg",
    ariaLabel: "Не подходит",
  },
  {
    title: "У вас нет времени",
    detail:
      "Недостаточно просто приходить на занятия: обучение интенсивное и требует работы и внимательного слушания",
  },
  {
    title: "Вы хотите диплом",
    detail:
      "Вы хотите получить диплом, чтобы устроиться на работу в компанию? Здесь мы учимся конкурировать с компаниями.",
  },
  {
    title: "Вы не общительны",
    detail: "Вам не нравится общение, работа в команде, и вы не хотите это менять",
  },
  {
    title: "Вы не терпеливы",
    detail:
      "Когда мы работаем с ИИ, нам нужно итеративно улучшать результат и часто переделывать всё заново. Если вы не готовы начинать сначала, тестировать и улучшать, это не для вас",
  },
];

export default function FitSection() {
  /* Здесь держим ссылку на заголовок, чтобы разбить его на буквы и анимировать. */
  const titleRef = useRef<HTMLHeadingElement | null>(null);

  /* Этот эффект оборачивает каждую букву в span и плавно проявляет их при скролле. */
  useEffect(() => {
    const el = titleRef.current;
    if (!el || el.dataset.scrollWrapped) return;

    const text = el.textContent?.trim() ?? "";
    const frag = document.createDocumentFragment();
    [...text].forEach((ch, idx) => {
      const span = document.createElement("span");
      span.className = styles.titleChar;
      span.dataset.index = String(idx);
      span.textContent = ch === " " ? "\u00a0" : ch;
      frag.appendChild(span);
    });
    el.textContent = "";
    el.classList.add(styles.scrollTitle);
    el.appendChild(frag);
    el.dataset.scrollWrapped = "1";

    const clamp = (v: number, min: number, max: number) =>
      Math.max(min, Math.min(max, v));

    const updateOpacity = () => {
      const vh = window.innerHeight || 1;
      const start = vh;
      const end = vh / 2;
      const rect = el.getBoundingClientRect();
      let progress = 1 - (rect.top - end) / Math.max(start - end, 1);
      progress = clamp(progress, 0, 1);
      const chars = el.querySelectorAll<HTMLElement>("span");
      const total = chars.length || 1;
      chars.forEach((span, idx) => {
        const fill = clamp(progress * total - idx, 0, 1);
        const opacity = 0.2 + 0.8 * fill;
        span.style.opacity = opacity.toFixed(3);
      });
    };

    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          updateOpacity();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    updateOpacity();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <section className={styles.section} id="pourvous" aria-labelledby="fit-title">
      <div className={styles.wrap}>
        <div className={styles.lead}>
          <h2 className={styles.title} id="fit-title" ref={titleRef}>
            Это для вас?
          </h2>
          <p className={styles.lede}>
            Внимательно прочитайте, если не хотите потерять деньги и время
          </p>
        </div>

        {/* Здесь две ленты карточек и ниже голосовое сообщение. */}
        <div className={styles.stack}>
          <div className={`${styles.fitBlock} ${styles.fitYes}`}>
            <div
              className={styles.carousel}
              role="list"
              aria-label="Подходит, если"
            >
              {fitYes.map((card) => (
                <FitCard key={card.title} {...card} />
              ))}
            </div>
          </div>

          <div className={`${styles.fitBlock} ${styles.fitNo}`}>
            <div
              className={styles.carousel}
              role="list"
              aria-label="Не подойдёт, если"
            >
              {fitNo.map((card) => (
                <FitCard key={card.title} {...card} />
              ))}
            </div>
          </div>

          <div className={styles.voiceArea}>
            <VoiceMessage src="/avis/Aslan.m4a" title="Message vocal — Aslan" />
          </div>
        </div>
      </div>
    </section>
  );
}
