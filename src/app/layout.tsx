/* Этот файл задает общую оболочку приложения.
   Он подключает глобальные стили и общий фон для всех экранов.
   Он помещает любую страницу внутрь единой HTML-структуры. */

import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

/* В этом объекте лежит название сайта и краткое описание для вкладки. */
export const metadata: Metadata = {
  title: "PilotNeuro",
  description: "Interface PilotNeuro construite avec Next.js",
};

/* Этот компонент строит HTML-каркас и вставляет в тело содержимое страниц. */
export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="fr">
      {/* Этот тег помечает язык документа и служит корнем разметки. */}
      <body suppressHydrationWarning={true}>
        {/* Этот блок выводит всё содержимое текущей страницы. */}
        {children}
      </body>
    </html>
  );
}
