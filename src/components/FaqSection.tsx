/* Этот файл содержит раздел "Мини-FAQ".
   Он отвечает на частые вопросы пользователей в формате аккордеона.
   Использует нативные элементы <details> и <summary> для доступности и простоты.
   Внизу есть кнопка для связи, если вопроса нет в списке.
*/

import styles from "./FaqSection.module.css";

export default function FaqSection() {
    return (
        <section className={styles.section} id="faq">
            <div className={styles.wrap}>
                {/* Заголовок секции */}
                <div className={styles.header}>
                    <h2 className={styles.title}>Мини-FAQ</h2>
                    <p className={styles.subtitle}>У вас есть вопросы?</p>
                </div>

                {/* Список вопросов и ответов */}
                <div className={styles.faqList}>
                    <details className={styles.details} name="faq">
                        <summary className={styles.summary}>
                            1) Я полный новичок. Это точно для меня?
                        </summary>
                        <div className={styles.content}>
                            <p>
                                Да — если вы мотивированы и регулярны. Мы идём с нуля по важному
                                и учим пользоваться ИИ, чтобы двигаться быстро без потери
                                понимания. Требование: пройти{" "}
                                <a href="https://portal-umber-theta.vercel.app/" target="_blank" rel="noopener noreferrer">
                                    PORTAL
                                </a>{" "}
                                + тест, чтобы вы не пришли «без базы» и не страдали на курсе.
                            </p>
                        </div>
                    </details>

                    <details className={styles.details} name="faq">
                        <summary className={styles.summary}>
                            2) Сколько времени мне реально нужно?
                        </summary>
                        <div className={styles.content}>
                            <p>
                                Это интенсив. Уроки — 2×2 часа в неделю. Но настоящая работа —
                                практика между занятиями (иначе копите отставание и не учитесь).
                                Если заранее знаете, что не сможете быть регулярны 3 месяца,
                                сейчас не время.
                            </p>
                        </div>
                    </details>

                    <details className={styles.details} name="faq">
                        <summary className={styles.summary}>
                            3) Есть ли ограничения по возрасту?
                        </summary>
                        <div className={styles.content}>
                            <p>
                                Нет, никаких ограничений. Если вы узнаёте себя в описаниях выше.
                            </p>
                        </div>
                    </details>

                    <details className={styles.details} name="faq">
                        <summary className={styles.summary}>
                            4) Я живу в России, могу ли я участвовать?
                        </summary>
                        <div className={styles.content}>
                            <p>
                                Да, но такие инструменты, как Discord, ChatGPT и способы оплаты,
                                в России недоступны. Они для нас обязательны для работы. Вы
                                можете участвовать, если самостоятельно найдёте способ, чтобы
                                эти инструменты работали там, где вы живёте.
                            </p>
                        </div>
                    </details>

                    <details className={styles.details} name="faq">
                        <summary className={styles.summary}>
                            5) Оплата: есть ли возврат?
                        </summary>
                        <div className={styles.content}>
                            <p>
                                Нет. Ни возвратов, ни отмен. Это осознанно: защищает моё время и
                                ваше. Если вы не решительны, рискуете потерять вложение —
                                поэтому подумайте хорошо перед оплатой. (Возможна оплата в 2
                                этапа.)
                            </p>
                        </div>
                    </details>
                </div>

                {/* Кнопка связи */}
                <div className={styles.cta}>
                    <a className={styles.btnGhost} href="#contact">
                        Связаться, если есть вопросы
                    </a>
                </div>
            </div>
        </section>
    );
}
