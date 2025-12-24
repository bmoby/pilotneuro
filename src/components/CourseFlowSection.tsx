/* Этот файл выводит секцию «Как это проходит».
   Он показывает три карты про ритм курса, формат и записи/материалы.
   Он даёт понять, как устроены занятия, сколько они длятся и как работает поддержка. */

import Image from "next/image";
import styles from "./CourseFlowSection.module.css";

type FlowItem = {
  title: string;
  main: string;
  body: string;
  icon: string;
};

/* В этом списке описываем ритм и формат курса. */
const flowItems: FlowItem[] = [
  {
    title: "Длительность",
    main: "3 месяца, 12 недель",
    body:
      "Важно убедиться, что вы сможете присутствовать на занятиях, а также выполнять задания и упражнения между сессиями.",
    icon: "/icons/periode.svg",
  },
  {
    title: "Ритм",
    main: "Два занятия, 4 часа в неделю",
    body:
      "Точные дни и часы занятий в течение недели определяются коллективным голосованием после старта обучения.",
    icon: "/icons/rythm.svg",
  },
  {
    title: "Формат",
    main: "Live в Discord",
    body:
      "Убедитесь, что Discord работает в вашей стране или что вы сможете его настроить. Это незаменимый инструмент для обучения.",
    icon: "/icons/visio.svg",
  },
  {
    title: "Записи",
    main: "Каждое занятие в записи",
    body:
      "Вы сможете пересматривать записи занятий через Google Drive. Это вариант для тех, кто хочет закрепить материал, а не пропускать уроки.",
    icon: "/icons/replay.svg",
  },
  {
    title: "Материалы",
    main: "PDF, упражнения, бонусы",
    body:
      "Дополнительные материалы и видео будут доступны вам через Google Drive; их нужно будет просматривать между занятиями.",
    icon: "/icons/resources.svg",
  },
  {
    title: "Комьюнити",
    main: "Приватный Discord‑сервер",
    body:
      "Ученики помогают друг другу в отдельных каналах: для занятий, для девушек, для курса и по интересам.",
    icon: "/icons/communaute.svg",
  },
];

export default function CourseFlowSection() {
  return (
    /* Этот блок выводит секцию с ритмом и форматом обучения. */
    <section className={styles.section} id="deroule" aria-labelledby="flow-title">
      <div className={styles.wrap}>
        <div className={styles.lead}>
          <h2 className={styles.title} id="flow-title">
            Как это проходит
          </h2>
          <p className={styles.muted}>
            Живой курс с понятным ритмом: занятия, практика и поддержка в Discord.
          </p>
        </div>

        {/* Этот блок содержит карточки с ответами на ключевые вопросы формата, прокручиваемые по горизонтали. */}
        <div className={styles.rail} role="list" aria-label="Формат курса">
          {flowItems.map((item) => (
            <article className={styles.card} role="listitem" key={item.title}>
              <div className={styles.icon}>
                <Image
                  src={item.icon}
                  alt=""
                  width={50}
                  height={50}
                  loading="lazy"
                />
              </div>
              <h3 className={styles.cardTitle}>{item.title}</h3>
              <p className={styles.cardMain}>{item.main}</p>
              <p className={styles.cardBody}>{item.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
