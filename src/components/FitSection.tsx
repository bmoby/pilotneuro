/* Этот файл строит секцию «Это для вас?».
   Он показывает статичный заголовок и две ленты карточек с условиями участия.
   Он даёт человеку быстро понять, подходит ему курс или нет, и послушать голосовое. */



import VoiceMessage from "./VoiceMessage";
import FitCard, { FitCardData } from "./FitCard";
import styles from "./FitSection.module.css";

/* В этом списке лежат пункты, где участие точно «да». */
const fitYes: FitCardData[] = [
  {
    title: "ДА, ЕСЛИ",
    detail: "Готовы включиться всерьёз.",
    imageSrc: "/lines/first/01.png",
    bottomOffset: -40,
  },
  {
    title: "Хотите в IT",
    detail: "Вам интересно, и вы любите компьютер",
    imageSrc: "/lines/first/02.png",
    bottomOffset: -40,
  },
  {
    title: "Хотите работать на себя",
    detail: "Общаетесь, слушаете, адаптируетесь к клиентам",
    imageSrc: "/lines/first/03.png",
    bottomOffset: -10,
  },
  {
    title: "Готовы адаптироваться",
    detail:
      "Постоянно учитесь и меняете привычки",
    imageSrc: "/lines/first/04.png",
    bottomOffset: -10,
  },
  {
    title: "Вы доступны",
    detail: "10–14 часов в неделю, 3 месяца",
    imageSrc: "/lines/first/05.png",
    bottomOffset: -20,
  },
  {
    title: "Нравится создавать",
    detail: "Смешиваете идеи, создаёте с ИИ",
    imageSrc: "/lines/first/06.png",
    bottomOffset: -10,
  },
];

/* В этом списке лежат пункты, где участие лучше отложить. */
const fitNo: FitCardData[] = [
  {
    title: "НЕТ, ЕСЛИ",
    detail: "Нет времени или «просто посмотреть»",
    imageSrc: "/lines/second/01.png",
    bottomOffset: -30,
  },
  {
    title: "Нет времени",
    detail:
      "Обучение интенсивное, требует работы",
    imageSrc: "/lines/second/02.png",
    bottomOffset: 0,
  },
  {
    title: "Хотите диплом",
    detail:
      "Это не для работы в компании",
    imageSrc: "/lines/second/03.png",
    bottomOffset: -35,
  },
  {
    title: "Не общительны",
    detail: "Не любите команду и общение",
    imageSrc: "/lines/second/04.png",
    bottomOffset: 0,
  },
  {
    title: "Не терпеливы",
    detail:
      "Не готовы тестировать и переделывать",
    imageSrc: "/lines/second/05.png",
    bottomOffset: 0,
  },
];

export default function FitSection() {
  return (
    <section className={styles.section} id="pourvous" aria-labelledby="fit-title">
      <div className={styles.wrap}>
        <div className={styles.lead}>
          <h2 className={styles.title} id="fit-title">Это для вас?</h2>
          <div className={styles.voiceArea}>
            <VoiceMessage src="/vocals/02.m4a" title="Голосовое сообщение — Tsarag" />
          </div>
        </div>

        {/* Здесь две ленты карточек и ниже голосовое сообщение. */}
        <div className={styles.stack}>
          <div className={`${styles.fitBlock} ${styles.fitYes}`}>
            <p className={styles.rowTitle}>
              Для обучения нужно соответствовать всем пунктам.
            </p>
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
            <p className={styles.rowTitle}>
              Читайте внимательно: иначе потеряете время и деньги.
            </p>
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


        </div>
      </div>
    </section>
  );
}
