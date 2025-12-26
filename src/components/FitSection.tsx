/* Этот файл строит секцию «Это для вас?».
   Он показывает статичный заголовок и две ленты карточек с условиями участия.
   Он даёт человеку быстро понять, подходит ему курс или нет, и послушать голосовое. */

"use client";

import { useEffect, useRef, useState } from "react";
import VoiceMessage from "./VoiceMessage";
import FitCard, { FitCardData } from "./FitCard";
import PingPongVideo from "./PingPongVideo";
import styles from "./FitSection.module.css";

/* В этом списке лежат пункты, где участие точно «да». */
const fitYes: FitCardData[] = [
  {
    title: "ДА, ЕСЛИ",
    detail: "Готовы включиться всерьёз.",
    // icon: "/goodsvg.svg", // Remplacé par la vidéo
    ariaLabel: "Подходит",
    id: "good",
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
    // icon: "/bad.svg", // Remplacé par la vidéo
    ariaLabel: "Не подходит",
    id: "bad",
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
  const sectionRef = useRef<HTMLElement>(null);
  const [sequenceStep, setSequenceStep] = useState(0);

  // Dérivé de l'étape de séquençage
  // 1: Good, 2: Bad, 3: Stop
  const activeVideo =
    (sequenceStep === 1) ? "good" :
      (sequenceStep === 2) ? "bad" : null;

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Démarrer la séquence si on est à 0
            setSequenceStep((prev) => (prev === 0 ? 1 : prev));
          } else {
            // Reset quand on sort de l'écran pour pouvoir rejouer au retour
            setSequenceStep(0);
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(section);

    return () => {
      observer.disconnect();
    };
  }, []);

  const handleGoodComplete = () => {
    // Étape 1 (Good) -> Étape 2 (Bad)
    setSequenceStep((prev) => prev + 1);
  };

  const handleBadComplete = () => {
    // Étape 2 (Bad) -> Étape 3 (Stop)
    setSequenceStep((prev) => prev + 1);
  };

  const goodVideoSources = [
    { src: "/goodvideo-intro-hvc1.mp4", type: 'video/mp4; codecs="hvc1"' },
    { src: "/goodvideo-intro-h264.mp4", type: 'video/mp4; codecs="avc1.42E01E"' },
  ];

  const badVideoSources = [
    { src: "/badvideo-intro-hvc1.mp4", type: 'video/mp4; codecs="hvc1"' },
    { src: "/badvideo-intro-h264.mp4", type: 'video/mp4; codecs="avc1.42E01E"' },
  ];

  return (
    <section className={styles.section} id="pourvous" aria-labelledby="fit-title" ref={sectionRef}>
      <div className={styles.wrap}>
        <div className={styles.lead}>
          <h2 className={styles.title} id="fit-title">Это для вас?</h2>
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
              {fitYes.map((card) => {
                if (card.id === "good") {
                  return (
                    <FitCard
                      key={card.title}
                      {...card}
                      customIcon={
                        <PingPongVideo
                          sources={goodVideoSources}
                          poster="/goodvideo-intro-poster.png"
                          isActive={activeVideo === "good"}
                          onComplete={handleGoodComplete}
                        />
                      }
                    />
                  );
                }
                return <FitCard key={card.title} {...card} />;
              })}
            </div>
          </div>

          <div className={`${styles.fitBlock} ${styles.fitNo}`}>
            <div
              className={styles.carousel}
              role="list"
              aria-label="Не подойдёт, если"
            >
              {fitNo.map((card) => {
                if (card.id === "bad") {
                  return (
                    <FitCard
                      key={card.title}
                      {...card}
                      customIcon={
                        <PingPongVideo
                          sources={badVideoSources}
                          poster="/badvideo-intro-poster.png"
                          isActive={activeVideo === "bad"}
                          onComplete={handleBadComplete}
                        />
                      }
                    />
                  );
                }
                return <FitCard key={card.title} {...card} />;
              })}
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
