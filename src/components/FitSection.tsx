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
  },
  {
    title: "Хотите в IT",
    detail: "Вам интересно, и вы любите компьютер",
  },
  {
    title: "Хотите работать на себя",
    detail: "Общаетесь, слушаете, адаптируетесь к клиентам",
  },
  {
    title: "Готовы адаптироваться",
    detail:
      "Постоянно учитесь и меняете привычки",
  },
  {
    title: "Вы доступны",
    detail: "10–14 часов в неделю, 3 месяца",
  },
  {
    title: "Нравится создавать",
    detail: "Смешиваете идеи, создаёте с ИИ",
  },
];

/* В этом списке лежат пункты, где участие лучше отложить. */
const fitNo: FitCardData[] = [
  {
    title: "НЕТ, ЕСЛИ",
    detail: "Нет времени или «просто посмотреть»",
  },
  {
    title: "Нет времени",
    detail:
      "Обучение интенсивное, требует работы",
  },
  {
    title: "Хотите диплом",
    detail:
      "Это не для работы в компании",
  },
  {
    title: "Не общительны",
    detail: "Не любите команду и общение",
  },
  {
    title: "Не терпеливы",
    detail:
      "Не готовы тестировать и переделывать",
  },
];

export default function FitSection() {
  return (
    <section className={styles.section} id="pourvous" aria-labelledby="fit-title">
      <div className={styles.wrap}>
        <div className={styles.lead}>
          <h2 className={styles.title} id="fit-title">Это для вас?</h2>
          <div className={styles.voiceArea}>
            <VoiceMessage src="/vocals/02.m4a" title="Message vocal — Aslan" />
          </div>
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
              {fitYes.map((card) => (
                <FitCard key={card.title} {...card} />
              ))}
            </div>
          </div>

          <div className={`${styles.fitBlock} ${styles.fitNo}`}>
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
