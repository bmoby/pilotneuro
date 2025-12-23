/* Этот файл собирает HERO с логотипом и голосовым блоком.
   Он показывает анимированный логотип PilotNeuro и короткий текст о курсе.
   Он даёт возможность сразу послушать пример голосового сообщения. */

"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import VoiceMessage from "./VoiceMessage";
import styles from "./HeroSection.module.css";

/* В этом флаге храним момент, когда обводка должна смениться на заливку. */
const fillDelayReserve = 260;

export default function HeroSection() {
  /* В этой переменной отмечаем, что логотип закончил прорисовку и заполнился. */
  const [isLogoFilled, setIsLogoFilled] = useState(false);
  /* В этой ссылке держим сам SVG, чтобы настроить длины штрихов после загрузки. */
  const logoRef = useRef<SVGSVGElement | null>(null);

  /* Этот эффект запускает расчёт анимации обводки при первом рендере. */
  useEffect(() => {
    const svg = logoRef.current;
    if (!svg) return;

    const clampLen = (value: number, min: number, max: number) =>
      Math.max(min, Math.min(max, value));

    const segments =
      svg.querySelectorAll<SVGPathElement>("[data-trace-segment]");
    const baseDelay = 90;
    const jitter = 30;
    const colorDuration = 1250;
    let maxTime = 0;

    segments.forEach((segment, index) => {
      if (typeof segment.getTotalLength !== "function") return;
      const length = segment.getTotalLength();
      const duration = clampLen(length / 520, 0.55, 1.1);
      const delay = index * baseDelay + Math.random() * jitter;

      segment.style.setProperty("--len", `${length}`);
      segment.style.setProperty("--dur", `${duration}s`);
      segment.style.setProperty("--delay", `${delay}ms`);
      segment.style.setProperty("--color-dur", `${colorDuration / 1000}s`);

      maxTime = Math.max(
        maxTime,
        delay + Math.max(duration * 1000, colorDuration)
      );
    });

    const swapTime = maxTime || 1200;
    const timer = window.setTimeout(
      () => setIsLogoFilled(true),
      swapTime + fillDelayReserve
    );

    return () => window.clearTimeout(timer);
  }, []);

  return (
    /* Этот блок формирует верхнюю секцию с логотипом и описанием. */
    <section className={styles.hero} aria-labelledby="hero-title">
      <div className={styles.wrap}>
        <div className={styles.heroBody}>
          {/* Этот блок рисует логотип: сначала контур, потом заливка. */}
          <div className={styles.heroHead}>
            <h1 className={styles.heroTitle} id="hero-title">
              <span className={styles.srOnly}>PilotNeuro</span>
              <span
                className={`${styles.logoWrap} ${
                  isLogoFilled ? styles.isFilled : ""
                }`}
              >
                <svg
                  ref={logoRef}
                  className={styles.heroDraw}
                  viewBox="0 0 739.15 98.96"
                  aria-hidden="true"
                >
                  <path
                    data-trace-segment
                    d="M75.74,78.72V9.52c0-4.53-5.07-8.89-8.89-8.89H11.4C6.12.62.5,4.11.5,11.53v67.2h16.51V15.12c0-2.3,1.64-3.17,3.17-3.17h35.82c2.49,0,3.9,2.01,3.9,3.9v62.87h15.84Z"
                  />
                  <path
                    data-trace-segment
                    d="M88.41,19.99h14.86v41.67s25.01-34.27,30.7-39.96c4.71-4.71,16.57-3.42,16.57,7.55v49.47h-15.11v-41.67s-21.52,29.68-29.15,39.69c-4.93,6.48-18.14,2.74-17.89-8.26.27-11.68,0-48.49,0-48.49Z"
                  />
                  <path
                    data-trace-segment
                    d="M156.15,78.72l23.88-53.61s2.67-6.34,10.72-6.34c7.34,0,9.8,5.24,9.8,5.24l25.53,54.71h-16.81l-18.15-46.54-19.37,46.54h-15.6Z"
                  />
                  <path
                    data-trace-segment
                    d="M260.7,18.78c-28.89,0-32.9,20.46-32.9,31.92,0,19.23,9.65,28.02,32.9,28.02,8,0,33.63,2.22,33.63-29.97,0-16.26-7.78-29.97-33.63-29.97Z"
                  />
                  <path
                    data-trace-segment
                    d="M261.06,30.47c-11.59,0-18.4,4.2-18.4,18.89,0,11.09,3.35,19.62,18.4,19.62,12.09,0,18.15-6.06,18.15-19.25s-5.33-19.25-18.15-19.25Z"
                  />
                  <polygon
                    data-trace-segment
                    points="297.49 30.47 297.49 19.99 355.73 19.99 355.73 30.47 334.29 30.47 334.05 78.72 319.42 78.72 319.42 30.47 297.49 30.47"
                  />
                  <polygon
                    data-trace-segment
                    points="382.54 .5 398.13 .5 398.13 31.45 440.05 31.45 440.05 .5 455.4 .5 455.4 78.72 438.83 78.72 438.59 43.88 398.38 44.12 397.89 78.72 382.54 78.72 382.54 .5"
                  />
                  <path
                    data-trace-segment
                    d="M524.12,78.72v-9.75h-30.7c-15.14,0-14.13-15.11-14.13-15.11h42.35s3.63-4.82,4.12-8.75,1.03-7.24-2.02-14.64c-1.73-4.19-8.98-10.72-17.28-10.72h-20.83c-7.23,0-13.11,4.88-16.57,10.23-3,4.65-4.99,16.19-4.39,21.69s.58,15.21,6.58,21.2c3.71,3.71,11.16,5.85,16.81,5.85h36.07Z"
                  />
                  <path
                    data-trace-segment
                    d="M511.21,43.13h-31.44s.38-3.52,1.22-5.84c1.18-3.25,4.33-6.82,8.29-6.82h11.94c4.11,0,7.16,3.42,8.53,6.09,1.56,3.05,1.46,6.57,1.46,6.57Z"
                  />
                  <path
                    data-trace-segment
                    d="M534.6,19.75h14.62v42.65s24.59-33.66,29.97-40.94c3.87-5.22,15.69-3.47,15.6,6.61s0,50.65,0,50.65h-14.62v-42.16s-25.44,34.44-30.22,40.94c-3.48,4.74-15.35,1.97-15.35-6.09V19.75Z"
                  />
                  <path
                    data-trace-segment
                    d="M542.64.5h10.97s1.47,7.61,11.09,7.61c9.01,0,10.84-7.61,10.84-7.61h11.21s-3.15,16.33-22.05,16.33c-20.51,0-22.05-16.33-22.05-16.33Z"
                  />
                  <path
                    data-trace-segment
                    d="M605.76,98.46h15.35v-19.74h22.66c10.83,0,15.7-7.57,18.82-12.93,3.91-6.74,4.67-25.94,1.04-32.85-2.55-4.85-10.58-13.19-18.4-13.19h-28.75c-5.6,0-10.72,4.87-10.72,10.72v67.99Z"
                  />
                  <path
                    data-trace-segment
                    d="M621.11,30.47v37.04h16.81c8.58,0,12.32-7.42,12.32-10.97,0-4.17.18-6.69.18-11.61,0-4.32-4.04-14.46-10.8-14.46h-18.52Z"
                  />
                  <path
                    data-trace-segment
                    d="M705.02,18.96c-28.89,0-32.9,20.46-32.9,31.92,0,19.23,9.65,28.02,32.9,28.02,8,0,33.63,2.22,33.63-29.97,0-16.26-7.78-29.97-33.63-29.97Z"
                  />
                  <path
                    data-trace-segment
                    d="M705.38,30.66c-11.59,0-18.4,4.2-18.4,18.89,0,11.09,3.35,19.62,18.4,19.62,12.09,0,18.15-6.06,18.15-19.25s-5.33-19.25-18.15-19.25Z"
                  />
                </svg>
                <Image
                  className={styles.heroFilled}
                  src="/filledLogo.svg"
                  alt=""
                  fill
                  sizes="(min-width: 960px) 720px, 90vw"
                  priority
                />
              </span>
            </h1>
          </div>

          <p className={styles.lede}>
            вы поймёте, как работает веб, научитесь создавать сайты полностью под
            заказ с любым функционалом и освоите ИИ как инструмент — понимая,
            проверяя и улучшая то, что он выдаёт, вместо того чтобы слепо ему
            доверять
          </p>

          {/* Этот блок ставит голосовое сообщение точно по центру. */}
          <div className={styles.voiceArea} aria-label="Пример голосового сообщения">
            <VoiceMessage src="/avis/Musa.m4a" title="Message vocal — Musa" />
          </div>
        </div>
      </div>
    </section>
  );
}
