/* Этот файл создаёт карточку для секции «Это для вас?».
   Он показывает заголовок, пояснение и при необходимости иконку.
   Человек читает один пункт и понимает, подходит ли ему курс. */

import Image from "next/image";
import styles from "./FitCard.module.css";

export type FitCardData = {
  title: string;
  detail?: string;
  icon?: string;
  ariaLabel?: string;
  id?: string; // Utile pour identifier la carte spécifique dans le parent
};

type FitCardProps = FitCardData;

/* Эта карточка показывает один пункт — подходит он или нет. */
export default function FitCard({
  title,
  detail,
  icon,
  ariaLabel,
}: FitCardProps) {
  return (
    <article className={styles.card} role="listitem" aria-label={ariaLabel}>
      {icon ? (
        <div className={styles.iconBox}>
          <Image src={icon} alt="" width={150} height={150} priority={false} />
        </div>
      ) : null}
      <div className={styles.cardText}>
        <p className={styles.cardTitle}>{title}</p>
        {detail ? <p className={styles.cardDetail}>{detail}</p> : null}
      </div>
    </article>
  );
}
