/* Этот файл задает общую оболочку приложения.
   Он подключает глобальные стили и общий фон для всех экранов.
   Он помещает любую страницу внутрь единой HTML-структуры. */

import type { Metadata } from "next";
import type { ReactNode } from "react";
import { GoogleAnalytics } from "@next/third-parties/google";
import "./globals.css";

/* В этом объекте лежит название сайта и краткое описание для вкладки. */
export const metadata: Metadata = {
  title: "PilotNeuro – Станьте Архитектором ИИ-решений",
  description: "Переход от разработчика к Архитектору ИИ. Управляйте интеллектом, создавайте сложные системы в одиночку и станьте «супер-специалистом» будущего.",
  keywords: ["Архитектор ИИ-решений", "PilotNeuro", "Искусственный интеллект", "Обучение ИИ", "Разработка ПО", "Автоматизация"],
  icons: {
    icon: [
      { url: '/favicon/favicon.ico' },
      { url: '/favicon/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/favicon/apple-touch-icon.png' },
    ],
    other: [
      {
        rel: 'manifest',
        url: '/favicon/site.webmanifest',
      },
    ],
  },
  openGraph: {
    title: "Станьте Архитектором ИИ-решений: Реальность профессии будущего",
    description: "Обучение новой эры: не зубрить код, а управлять ИИ. Замените целую команду, создавая веб-сайты, приложения и агентов в одиночку. Станьте технологически независимым.",
    url: 'https://pilotneuro.com',
    siteName: 'PilotNeuro',
    images: [
      {
        url: '/favicon/android-chrome-512x512.png',
        width: 512,
        height: 512,
        alt: 'PilotNeuro Logo',
      },
    ],
    locale: 'ru_RU',
    type: 'website',
  },
};

/* Этот компонент строит HTML-каркас и вставляет в тело содержимое страниц. */
export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="ru">
      {/* Этот тег помечает язык документа и служит корнем разметки. */}
      <body suppressHydrationWarning={true}>
        {/* Этот блок выводит всё содержимое текущей страницы. */}
        {children}
        <GoogleAnalytics gaId="G-YN4X0FC6JJ" />
      </body>
    </html>
  );
}
