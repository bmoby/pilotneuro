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
    icon: "/golight.png",
    ariaLabel: "Подходит",
  },
  {
    title: "Вы хотите перейти в сферу IT",
    detail: "Вам это действительно интересно, и вам нравится работать за компьютером.",
  },
  {
    title: "Вы хотите работать на себя",
    detail: "Вы умеете общаться с клиентами, слушать и адаптироваться под их потребности",
  },
  {
    title: "Вы готовы адаптироваться",
    detail:
      "Вы готовы менять свои привычки, чтобы подстраиваться к ИИ, и хотите быть среди тех, кого ИИ не сможет заменить",
  },
  {
    title: "Вы доступны",
    detail: "Вы можете уделять работе минимум 10–14 часов в неделю на протяжении 3 месяцев",
  },
  {
    title: "Вам нравится создавать",
    detail: "Вы смешиваете идеи, сравниваете и создаёте новое с помощью ИИ",
  },
];

/* В этом списке лежат пункты, где участие лучше отложить. */
const fitNo: FitCardData[] = [
  {
    title: "НЕТ, ЕСЛИ",
    detail: "Нет времени или «просто посмотреть»",
    icon: "/stoplight.png",
    ariaLabel: "Не подходит",
  },
  {
    title: "У вас нет времени",
    detail:
      "Недостаточно просто приходить на занятия: обучение интенсивное и требует работы и внимательного слушания",
  },
  {
    title: "Вы хотите диплом",
    detail:
      "Вы хотите получить диплом, чтобы устроиться на работу в компанию? Здесь мы учимся конкурировать с компаниями.",
  },
  {
    title: "Вы не общительны",
    detail: "Вам не нравится общение, работа в команде, и вы не хотите это менять",
  },
  {
    title: "Вы не терпеливы",
    detail:
      "Когда мы работаем с ИИ, нам нужно итеративно улучшать результат и часто переделывать всё заново. Если вы не готовы начинать сначала, тестировать и улучшать, это не для вас",
  },
];

export default function FitSection() {
  return (
    <section className={styles.section} id="pourvous" aria-labelledby="fit-title">
      <div className={styles.wrap}>
        <div className={styles.lead}>
          <h2 className={styles.title} id="fit-title">Это для вас?</h2>
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

          <div className={styles.voiceArea}>
            <VoiceMessage src="/avis/Aslan.m4a" title="Message vocal — Aslan" />
          </div>
        </div>
      </div>
    </section>
  );
}
