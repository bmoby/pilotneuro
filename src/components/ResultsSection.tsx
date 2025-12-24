/* Этот файл собирает секцию «Ожидаемые результаты».
   Он повторяет блок из accueil.html: статичный заголовок, три иконки-видео и тексты этапов.
   Он даёт человеку понять, чего он достигнет, и сразу перейти к программе. */

"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import VoiceMessage from "./VoiceMessage";
import styles from "./ResultsSection.module.css";

type Step = {
  id: string;
  label: string;
  title: string;
  body: string;
  video: string;
  placeholder: string;
};

/* В этом списке лежат все этапы пути: 4, 8 и 12 недель. */
const steps: Step[] = [
  {
    id: "step-1",
    label: "4 недели",
    title: "Вы за рулём",
    body:
      "Вы понимаете, как работает веб, и больше не боитесь технических терминов. Вы можете делать простые сайты с помощью ИИ, но у вас ещё нет полного мастерства.",
    video: "/moto-icon-h264.mp4",
    placeholder: "/moto-icon.png",
  },
  {
    id: "step-2",
    label: "8 недель",
    title: "Вы пилот",
    body:
      "Вы прекрасно понимаете, как создавать сайт со всеми инструментами, которыми пользуются разработчики. Вы владеете ИИ и работаете чисто и структурно на любом масштабе проекта.",
    video: "/formula-icon-h264.mp4",
    placeholder: "/formula-icon.png",
  },
  {
    id: "step-3",
    label: "12 недель",
    title: "Вы боевой пилот",
    body:
      "Вы умеете видеть проблемы в жизни и бизнесе, предлагать решения, от которых сложно отказаться, и создавать индивидуальные продукты. Вы точно знаете, что и для кого нужно сделать.",
    video: "/avion-icon-h264.mp4",
    placeholder: "/avion-icon.png",
  },
];

/* Этот помощник создаёт плавную анимацию для иконки-ролика. */
function createAnimator(video: HTMLVideoElement) {
  let rafId: number | null = null;
  let state: "idle" | "activating" | "deactivating" = "idle";

  const cancel = () => {
    if (rafId) cancelAnimationFrame(rafId);
    rafId = null;
  };

  const activate = () => {
    cancel();
    state = "activating";

    const duration = video.duration || 2;
    const start = 0;
    const peak = duration;
    const end = duration * 0.6;

    const phase1 = 600;
    const phase2 = 800;
    const startTime = performance.now();

    const tick = (now: number) => {
      const elapsed = now - startTime;

      if (elapsed < phase1) {
        const p = elapsed / phase1;
        const ease = p < 0.5 ? 16 * p ** 5 : 1 - (-(2 * p - 2)) ** 5 / 32;
        video.currentTime = start + (peak - start) * ease;
        rafId = requestAnimationFrame(tick);
      } else if (elapsed < phase1 + phase2) {
        const p = (elapsed - phase1) / phase2;
        const ease = 1 - (1 - p) ** 3;
        video.currentTime = peak - (peak - end) * ease;
        rafId = requestAnimationFrame(tick);
      } else {
        video.currentTime = end;
        state = "idle";
      }
    };

    rafId = requestAnimationFrame(tick);
  };

  const deactivate = () => {
    cancel();
    state = "deactivating";

    const start = video.currentTime;
    const end = 0;
    const duration = 600;
    const startTime = performance.now();

    const tick = (now: number) => {
      const elapsed = now - startTime;
      if (elapsed < duration) {
        const p = elapsed / duration;
        const ease = 1 - (1 - p) ** 3;
        video.currentTime = start - (start - end) * ease;
        rafId = requestAnimationFrame(tick);
      } else {
        video.currentTime = end;
        state = "idle";
      }
    };

    rafId = requestAnimationFrame(tick);
  };

  return { activate, deactivate, cancel, get state() { return state; } };
}

export default function ResultsSection() {
  /* В этом состоянии лежит текущий выбранный этап. */
  const [activeId, setActiveId] = useState(steps[0].id);
  /* Здесь храним все видео, чтобы запускать анимацию при выборе. */
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  /* Здесь держим менеджеры анимации для каждого ролика. */
  const animatorsRef = useRef<Map<string, ReturnType<typeof createAnimator>>>(
    new Map()
  );
  /* Здесь запоминаем прошлый активный шаг, чтобы плавно выключать его. */
  const prevActiveRef = useRef<string | null>(steps[0].id);

  /* Этот эффект подключает анимацию видеороликов. */
  useEffect(() => {
    steps.forEach((step, index) => {
      const video = videoRefs.current[index];
      if (!video || animatorsRef.current.has(step.id)) return;
      if (video.readyState < 1) video.load();
      animatorsRef.current.set(step.id, createAnimator(video));
    });

    const current = animatorsRef.current.get(activeId);
    const prevId = prevActiveRef.current;

    if (prevId && prevId !== activeId) {
      const prevAnim = animatorsRef.current.get(prevId);
      if (prevAnim) prevAnim.deactivate();
    }

    if (prevId === activeId && current) {
      current.activate();
    } else if (current) {
      current.activate();
    }

    prevActiveRef.current = activeId;

    const cleanup = () => {
      animatorsRef.current.forEach((anim) => anim.cancel());
    };
    return cleanup;
  }, [activeId]);

  /* Эта функция ставит новую вкладку активной и запускает её иконку. */
  const handleSelect = (id: string) => {
    setActiveId((prev) => (prev === id ? prev : id));
  };

  /* Этот обработчик повторно запускает анимацию, если кликаем по уже активной. */
  const handleClick = (id: string) => {
    if (id === activeId) {
      const anim = animatorsRef.current.get(id);
      if (anim) anim.activate();
      return;
    }
    handleSelect(id);
  };

  return (
    <section className={styles.section} id="resultats" aria-labelledby="results-title">
      <div className={styles.wrap}>
        <div className={styles.lead}>
          <h2 className={styles.title} id="results-title">Ожидаемые результаты</h2>
          <p className={styles.muted}>
            Только индивидуальные решения, никаких шаблонов
          </p>
        </div>

        <div className={styles.stepsContainer}>
          {/* Здесь расположены кнопки с анимированными иконками для каждого срока. */}
          <div className={styles.nav} role="tablist" aria-label="Этапы курса">
            {steps.map((step, index) => (
              <button
                key={step.id}
                id={`${step.id}-tab`}
                className={`${styles.navBtn} ${
                  activeId === step.id ? styles.navBtnActive : ""
                }`}
                role="tab"
                aria-selected={activeId === step.id}
                aria-controls={`${step.id}-panel`}
                onClick={() => handleClick(step.id)}
                onFocus={() => handleSelect(step.id)}
              >
                <span className={styles.iconWrap}>
                  <Image
                    className={styles.navPlaceholder}
                    src={step.placeholder}
                    alt=""
                    width={90}
                    height={90}
                    priority={false}
                  />
                  <video
                    ref={(node) => {
                      videoRefs.current[index] = node;
                    }}
                    className={styles.navVideo}
                    muted
                    playsInline
                    preload="metadata"
                    aria-hidden="true"
                  >
                    <source src={step.video} type="video/mp4" />
                  </video>
                </span>
                <span className={styles.stepLabel}>{step.label}</span>
              </button>
            ))}
          </div>

          {/* Здесь показываем текст и детали выбранного этапа. */}
          <div className={styles.display}>
            {steps.map((step) => (
              <div
                key={step.id}
                id={`${step.id}-panel`}
                role="tabpanel"
                aria-labelledby={`${step.id}-tab`}
                className={`${styles.slide} ${
                  activeId === step.id ? styles.slideActive : ""
                }`}
              >
                <div className={styles.slideBody}>
                  <h3>{step.title}</h3>
                  <p className={styles.muted}>{step.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.ctaRow}>
          <div className={styles.voiceArea}>
            <VoiceMessage src="/avis/SHamil2.m4a" title="Message vocal — Résultats" />
          </div>
          <Link className={styles.ctaBtn} href="#deroule">
            Посмотреть программу подробно
          </Link>
        </div>
      </div>
    </section>
  );
}
