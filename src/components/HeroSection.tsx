/* Этот файл собирает HERO с логотипом, интро-видео и голосовым блоком.
   Он показывает статичный чёрный логотип PilotNeuro, короткий ролик и текст о курсе.
   Он даёт возможность сразу послушать пример голосового сообщения и увидеть каску крупным планом.
   После первого показа ролик бесконечно играет последние полсекунды туда-обратно. */

"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import VoiceMessage from "./VoiceMessage";
import styles from "./HeroSection.module.css";

export default function HeroSection() {
  /* В этой ссылке держим элемент видео, чтобы запустить его без задержек. */
  const introVideoRef = useRef<HTMLVideoElement | null>(null);
  /* Здесь храним кадр requestAnimationFrame для пинг-понга. */
  const pingPongFrameRef = useRef<number | null>(null);
  /* Эти границы задают последние 0.5 секунды, которые гоняем туда-обратно. */
  const pingPongStartRef = useRef(0);
  const pingPongEndRef = useRef(0);
  /* Здесь запоминаем момент старта цикла, чтобы шаг был плавным. */
  const pingPongOriginRef = useRef<number | null>(null);

  /* Этот эффект принудительно стартует видео сразу, как только есть данные. */
  useEffect(() => {
    const video = introVideoRef.current;
    if (!video) return;

    const startPlayback = () => {
      const playPromise = video.play();
      if (playPromise && typeof playPromise.then === "function") {
        playPromise.catch(() => {});
      }
    };

    if (video.readyState >= 2) {
      startPlayback();
      return;
    }

    video.addEventListener("loadeddata", startPlayback, { once: true });
    return () => video.removeEventListener("loadeddata", startPlayback);
  }, []);

  /* Эта функция гасит пинг-понг, когда он больше не нужен. */
  const stopPingPong = () => {
    if (pingPongFrameRef.current !== null) {
      cancelAnimationFrame(pingPongFrameRef.current);
      pingPongFrameRef.current = null;
    }
    pingPongOriginRef.current = null;
  };

  /* Эта функция гоняет последние 0.5 секунды ролика туда-обратно. */
  const stepPingPong = () => {
    const video = introVideoRef.current;
    if (!video) {
      stopPingPong();
      return;
    }

    const start = pingPongStartRef.current;
    const end = pingPongEndRef.current;
    const span = Math.max(end - start, 0);
    if (span === 0) {
      stopPingPong();
      return;
    }

    const now = performance.now();
    if (pingPongOriginRef.current === null) {
      pingPongOriginRef.current = now;
    }

    const elapsed = ((now - pingPongOriginRef.current) / 1000) % (span * 2);
    const offset = elapsed <= span ? elapsed : span * 2 - elapsed;

    video.currentTime = start + offset;
    pingPongFrameRef.current = requestAnimationFrame(stepPingPong);
  };

  /* Эта функция запускает пинг-понг после первого полного показа ролика. */
  const handleVideoFinish = () => {
    const video = introVideoRef.current;
    if (!video) return;

    const duration = video.duration;
    if (!Number.isFinite(duration) || duration <= 0) return;

    stopPingPong();

    pingPongStartRef.current = Math.max(duration - 0.5, 0);
    pingPongEndRef.current = duration;
    pingPongOriginRef.current = null;
    video.pause();
    video.currentTime = duration;

    pingPongFrameRef.current = requestAnimationFrame(stepPingPong);
  };

  /* Этот эффект останавливает пинг-понг, если секция размонтирована. */
  useEffect(() => {
    return () => {
      stopPingPong();
    };
  }, []);

  return (
    /* Этот блок формирует верхнюю секцию с логотипом и описанием. */
    <section className={styles.hero} aria-labelledby="hero-title">
      <div className={styles.wrap}>
        <div className={styles.heroBody}>
          {/* Этот блок показывает короткое видео каски шириной 350px с автозапуском. */}
          <div className={styles.heroMedia}>
            <video
              ref={introVideoRef}
              className={styles.heroVideo}
              preload="auto"
              muted
              playsInline
              autoPlay
              aria-label="Courte vidéo d'introduction sur le casque Formula"
              onEnded={handleVideoFinish}
            >
              <source
                src="/formula_helmet-intro-hvc1.mp4"
                type='video/mp4; codecs="hvc1"'
              />
              <source
                src="/formula_helmet-intro-vp9.webm"
                type='video/webm; codecs="vp9"'
              />
              <source
                src="/formula_helmet-intro-h264.mp4"
                type='video/mp4; codecs="avc1.42E01E"'
              />
            </video>
          </div>

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
