/* Этот файл создаёт блок голосового сообщения.
   Он умеет запускать звук, ставить его на паузу и показывать состояние загрузки.
   Он рисует живые полоски, чтобы человек захотел нажать и послушать. */

"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import styles from "./VoiceMessage.module.css";

type VoiceMessageProps = {
  src: string;
  title?: string;
};

/* Этот помощник создаёт воспроизводимый поток псевдослучайных чисел по строке. */
function createSeededRandom(seedSource: string) {
  let seed = 0;
  for (let i = 0; i < seedSource.length; i += 1) {
    seed = (seed + seedSource.charCodeAt(i) * (i + 11)) >>> 0;
  }
  return () => {
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/* В этом помощнике заранее придумываем высоту и ритм для каждой полоски. */
function buildWave(count: number, seedSource: string) {
  const rand = createSeededRandom(seedSource);
  const baseHeights = [
    12, 24, 18, 30, 10, 26, 16, 32, 14, 28, 20, 34, 12, 22, 16, 30, 18, 26, 14,
    20,
  ];
  return Array.from({ length: count }).map((_, index) => {
    const pattern = baseHeights[index % baseHeights.length];
    const jitter = (rand() - 0.5) * 6;
    const height = Math.max(8, pattern + jitter);
    const width = 3;
    const delay = (index * 0.03 + rand() * 0.12).toFixed(2);
    const duration = (1 + rand() * 0.35).toFixed(2);
    return {
      height,
      width,
      delay: Number(delay),
      duration: Number(duration),
    };
  });
}

export default function VoiceMessage({
  src,
  title = "Message vocal",
}: VoiceMessageProps) {
  /* В этой константе храним количество полосок для аудио-визуализации. */
  const barCount = 26;
  /* В этом объекте лежит аудио-элемент, чтобы управлять им напрямую. */
  const audioRef = useRef<HTMLAudioElement | null>(null);

  /* Здесь храним, идёт ли сейчас загрузка. */
  const [isLoading, setIsLoading] = useState(false);
  /* Здесь храним, идёт ли сейчас воспроизведение. */
  const [isPlaying, setIsPlaying] = useState(false);
  /* Этот флаг показывает, что файл уже готов к запуску. */
  const [isReady, setIsReady] = useState(false);
  /* Этот флаг сообщает, что воспроизведение не удалось. */
  const [hasError, setHasError] = useState(false);

  /* В этом массиве лежат случайные параметры полосок, чтобы они не повторялись. */
  const bars = useMemo(() => buildWave(barCount, src), [barCount, src]);
  /* В этом массиве храним «живые» уровни громкости для каждой полоски. */
  const [levels, setLevels] = useState<number[]>(() =>
    Array.from({ length: barCount }).map(() => 0)
  );

  /* Здесь лежат четыре мягких тона синего, чтобы цвет выглядел светлее. */
  const palette = useMemo(
    () => ["#5a8af3ff", "#477ed5ff", "#60a5fa", "#93c5fd"],
    []
  );

  /* Эти ссылки держат аудио-контекст и анализатор, чтобы извлекать громкость. */
  const audioCtxRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const freqDataRef = useRef<Uint8Array<ArrayBuffer> | null>(null);
  const rafRef = useRef<number | null>(null);
  const smoothLevelsRef = useRef<number[] | null>(
    Array.from({ length: barCount }).map(() => 0)
  );

  /* Этот эффект нужен только для очистки ресурсов при уходе со страницы. */
  useEffect(() => {
    return () => {
      const audio = audioRef.current;
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
        audioRef.current = null;
      }
      if (audioCtxRef.current) {
        audioCtxRef.current.close().catch(() => {});
        audioCtxRef.current = null;
      }
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  /* Эта функция запускает извлечение громкости и обновляет полоски в ритме аудио. */
  const startAnalyser = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (!audioCtxRef.current) {
      // Создаем контекст только по требованию
      const AudioContextClass =
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContextClass) return;

      const ctx = new AudioContextClass();
      const source = ctx.createMediaElementSource(audio);
      const analyser = ctx.createAnalyser();
      analyser.fftSize = 128;
      analyser.smoothingTimeConstant = 0.4;
      source.connect(analyser);
      analyser.connect(ctx.destination);
      audioCtxRef.current = ctx;
      analyserRef.current = analyser;
      freqDataRef.current = new Uint8Array(
        analyser.frequencyBinCount
      ) as Uint8Array<ArrayBuffer>;
    }

    const ctx = audioCtxRef.current;
    if (ctx?.state === "suspended") {
      ctx.resume().catch(() => {});
    }

    const analyser = analyserRef.current;
    const freqData = freqDataRef.current;
    if (!analyser || !freqData || freqData.length === 0) return;

    const tick = () => {
      analyser.getByteFrequencyData(freqData);
      const slice = freqData;
      const count = barCount;
      const smoothed = smoothLevelsRef.current;
      const next: number[] = [];
      if (!smoothed || smoothed.length !== count) {
        smoothLevelsRef.current = Array.from({ length: count }).map(() => 0);
      }
      const currentSmooth = smoothLevelsRef.current as number[];
      for (let i = 0; i < count; i += 1) {
        const start = Math.floor((i / count) * slice.length);
        const end = Math.floor(((i + 1) / count) * slice.length);
        let sum = 0;
        let n = 0;
        for (let j = start; j < end; j += 1) {
          sum += slice[j];
          n += 1;
        }
        const avg = n ? sum / n : 0;
        const level = Math.min(1, avg / 255);
        const prev = currentSmooth[i] ?? 0;
        const eased = prev + (level - prev) * 0.42;
        currentSmooth[i] = eased;
        next.push(eased);
      }
      setLevels(next);
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
  };

  /* Этот эффект включает или выключает обновление волн при старте/остановке звука. */
  useEffect(() => {
    if (isPlaying) {
      startAnalyser();
      return () => {
        if (rafRef.current) cancelAnimationFrame(rafRef.current);
      };
    }
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    return undefined;
  }, [isPlaying, bars.length]);

  /* Инициализация аудио и обработчиков событий */
  const initializeAudio = () => {
    if (audioRef.current) return audioRef.current;

    const audio = new Audio(src);
    audio.preload = "auto";
    audioRef.current = audio;

    const handleLoadStart = () => {
      setIsLoading(true);
      // Removed setIsPlaying(false) here to prevent overwriting playing state during race condition
      setIsReady(false);
      setHasError(false);
      setLevels((prev) => prev.map(() => 0));
    };
    const handleCanPlay = () => {
      setIsReady(true);
      setIsLoading(false);
    };
    const handlePlay = () => {
      setIsPlaying(true);
      setIsLoading(false);
    };
    const handlePause = () => {
      setIsPlaying(false);
      setLevels((prev) => prev.map(() => 0));
    };
    const handleEnded = () => {
      setIsPlaying(false);
      setLevels((prev) => prev.map(() => 0));
    };
    const handleWaiting = () => setIsLoading(true);
    const handleError = () => {
      setHasError(true);
      setIsLoading(false);
      setIsPlaying(false);
      setLevels((prev) => prev.map(() => 0));
    };

    audio.addEventListener("loadstart", handleLoadStart);
    audio.addEventListener("canplaythrough", handleCanPlay);
    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);
    audio.addEventListener("ended", handleEnded);
    audio.addEventListener("waiting", handleWaiting);
    audio.addEventListener("error", handleError);

    return audio;
  };

  /* Эта функция запускает звук или ставит его на паузу. */
  const handleToggle = async () => {
    if (hasError) return;

    // Сначала получаем (или создаём) аудио
    let audio = audioRef.current;
    if (!audio) {
      // Ставим Loading сразу, чтобы показать реакцию на клик
      setIsLoading(true);
      audio = initializeAudio();
    }

    if (isPlaying) {
      audio.pause();
      return;
    }

    // Если аудио уже есть, оно может быть не готово
    if (audio.readyState < 2) {
      setIsLoading(true);
    }

    try {
      await audio.play();
    } catch {
      setHasError(true);
      setIsLoading(false);
      setIsPlaying(false);
    }
  };

  return (
    <div className={styles.shell} role="group" aria-label={title}>
      <div className={styles.header}>
        <div className={styles.label}>
          <span className={styles.title}>{title}</span>
        </div>
        {isLoading && !hasError ? (
          <div className={styles.loading} aria-live="polite">
            <span className={styles.dot} aria-hidden="true" />
          </div>
        ) : null}
        {hasError ? (
          <div className={styles.note}>Lecture impossible</div>
        ) : null}
      </div>

      <div className={styles.player}>
        <button
          type="button"
          className={styles.control}
          onClick={handleToggle}
          disabled={hasError}
          aria-pressed={isPlaying}
          aria-label={isPlaying ? "Mettre sur pause" : "Lire le message vocal"}
        >
          <span aria-hidden="true" className={styles.icon}>
            {isPlaying ? "⏸" : "▶"}
          </span>
        </button>

        <div className={styles.wave} aria-hidden="true">
          {bars.map((bar, index) => {
            const level = levels[index] ?? 0;
            const hasLiveLevel = level > 0.01 && isPlaying;
            const dynamic = Math.min(1, level * 1.35 + 0.08);
            const scale = hasLiveLevel ? 0.6 + dynamic * 1.4 : 1;
            const tone = palette[index % palette.length];
            const bgColor = isPlaying ? tone : undefined;
            return (
              <span
                key={index}
                className={`${styles.bar} ${
                  isPlaying && !hasLiveLevel ? styles.barActive : ""
                }`}
                style={{
                  height: `${bar.height}px`,
                  width: `${bar.width}px`,
                  transform: `scaleY(${scale.toFixed(3)})`,
                  background: bgColor,
                  ["--dur" as string]: `${bar.duration}s`,
                  transition: hasLiveLevel
                    ? "transform 140ms ease"
                    : "transform 240ms ease",
                }}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
