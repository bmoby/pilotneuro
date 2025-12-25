/* Этот файл собирает HERO с логотипом, интро-видео и голосовым блоком.
   Он показывает статичный чёрный логотип PilotNeuro, короткий ролик и текст о курсе.
   Он даёт возможность сразу послушать пример голосового сообщения и увидеть каску крупным планом.
   Он подставляет облегчённое видео на телефонах, чтобы оно стартовало быстрее, и после конца плавно включает петлю. */

"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import VoiceMessage from "./VoiceMessage";
import styles from "./HeroSection.module.css";

export default function HeroSection() {
  /* В этой ссылке держим элемент видео, чтобы запустить его без задержек. */
  const introVideoRef = useRef<HTMLVideoElement | null>(null);
  /* Здесь держим второй ролик, чтобы сразу показать бесконечную версию. */
  const loopVideoRef = useRef<HTMLVideoElement | null>(null);

  /* Этот эффект заставляет Safari на телефонах не блокировать автоматический старт. */
  useEffect(() => {
    const intro = introVideoRef.current;
    const loop = loopVideoRef.current;
    if (!intro || !loop) return;

    intro.muted = true;
    loop.muted = true;
    intro.playsInline = true;
    loop.playsInline = true;
    intro.setAttribute("muted", "true");
    loop.setAttribute("muted", "true");
    intro.setAttribute("playsinline", "true");
    loop.setAttribute("playsinline", "true");
    intro.setAttribute("webkit-playsinline", "true");
    loop.setAttribute("webkit-playsinline", "true");

    const unlockPlayback = () => {
      const introPlay = intro.play();
      if (introPlay && typeof introPlay.then === "function") {
        introPlay.catch(() => {});
      }
      const loopPlay = loop.play();
      if (loopPlay && typeof loopPlay.then === "function") {
        loopPlay
          .then(() => {
            loop.pause();
            loop.currentTime = 0;
          })
          .catch(() => {});
      } else {
        loop.pause();
        loop.currentTime = 0;
      }
    };

    unlockPlayback();

    const handleFirstTap = () => {
      unlockPlayback();
      document.removeEventListener("touchstart", handleFirstTap);
      document.removeEventListener("click", handleFirstTap);
    };

    document.addEventListener("touchstart", handleFirstTap, { once: true });
    document.addEventListener("click", handleFirstTap, { once: true });

    return () => {
      document.removeEventListener("touchstart", handleFirstTap);
      document.removeEventListener("click", handleFirstTap);
    };
  }, []);

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

  /* Этот эффект плавно включает зацикленную часть без вспышек после интро. */
  useEffect(() => {
    const intro = introVideoRef.current;
    const loop = loopVideoRef.current;
    if (!intro || !loop) return;

    let loopReady = loop.readyState >= 2;
    let introEnded = false;

    const startLoop = () => {
      loop.classList.add(styles.heroVideoVisible);
      const loopPlay = loop.play();
      if (loopPlay && typeof loopPlay.then === "function") {
        loopPlay.catch(() => {});
      }
      intro.classList.add(styles.heroVideoHidden);
    };

    const markLoopReady = () => {
      loopReady = true;
      if (introEnded) {
        startLoop();
      }
    };

    if (!loopReady) {
      loop.addEventListener("loadeddata", markLoopReady, { once: true });
    }

    const swapToLoop = () => {
      introEnded = true;
      if (!loopReady) return;
      startLoop();
    };

    intro.addEventListener("ended", swapToLoop);
    return () => {
      intro.removeEventListener("ended", swapToLoop);
      loop.removeEventListener("loadeddata", markLoopReady);
    };
  }, []);

  return (
    /* Этот блок формирует верхнюю секцию с логотипом и описанием. */
    <section className={styles.hero} aria-labelledby="hero-title">
      <div className={styles.wrap}>
        <div className={styles.heroBody}>
          {/* Этот блок показывает компактное видео каски с автозапуском и без повторов. */}
          <div className={styles.heroMedia}>
            <video
              ref={introVideoRef}
              className={styles.heroVideo}
              preload="auto"
              muted
              playsInline
              autoPlay
              aria-label="Courte vidéo d'introduction sur le casque Formula"
            >
              {/* Сначала отдаём мобильные версии, чтобы телефон тратил меньше трафика. */}
              <source
                src="/two_helmets-intro-hvc1.mp4"
                type='video/mp4; codecs="hvc1"'
              />
              <source
                src="/two_helmets-intro-vp9.webm"
                type='video/webm; codecs="vp9"'
              />
              <source
                src="/two_helmets-intro-h264.mp4"
                type='video/mp4; codecs="avc1.42E01E"'
              />
            </video>
            {/* Этот второй ролик загружается заранее и крутится бесконечно после первого. */}
            <video
              ref={loopVideoRef}
              className={`${styles.heroVideo} ${styles.heroVideoLoop}`}
              preload="auto"
              muted
              playsInline
              loop
              aria-label="Suite en boucle sur le casque Formula"
            >
              <source
                media="(max-width: 767px)"
                src="/two_helmets_mobile_loop-intro-hvc1.mp4"
                type='video/mp4; codecs="hvc1"'
              />
              <source
                media="(max-width: 767px)"
                src="/two_helmets_mobile_loop-intro-vp9.webm"
                type='video/webm; codecs="vp9"'
              />
              <source
                media="(max-width: 767px)"
                src="/two_helmets_mobile_loop-intro-h264.mp4"
                type='video/mp4; codecs="avc1.42E01E"'
              />
              <source
                src="/two_helmets_loop-intro-hvc1.mp4"
                type='video/mp4; codecs="hvc1"'
              />
              <source
                src="/two_helmets_loop-intro-vp9.webm"
                type='video/webm; codecs="vp9"'
              />
              <source
                src="/two_helmets_loop-intro-h264.mp4"
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
