/* Этот файл создаёт карточку для секции «Это для вас?».
   Он показывает заголовок, пояснение и при необходимости иконку.
   Человек читает один пункт и понимает, подходит ли ему курс. */

import Image from "next/image";
import styles from "./FitCard.module.css";

export type FitCardData = {
  title: string;
  detail?: string;
  icon?: string;
  imageSrc?: string; // Image décorative en bas
  bottomOffset?: number; // Décalage manuel en pixels
  ariaLabel?: string;
  id?: string;
};

type FitCardProps = FitCardData;

/* Эта карточка показывает один пункт — подходит он или нет. */
export default function FitCard({
  title,
  detail,
  icon,
  imageSrc,
  bottomOffset = 0,
  ariaLabel,
}: FitCardProps) {
  return (
    <article className={styles.card} role="listitem" aria-label={ariaLabel}>
      {/* Контент карточки (текст + иконка если есть) */}
      <div className={styles.contentWrapper}>
        {icon ? (
          <div className={styles.iconBox}>
            <Image src={icon} alt="" width={150} height={150} priority={false} />
          </div>
        ) : null}
        <div className={styles.cardText}>
          <p className={styles.cardTitle}>{title}</p>
          {detail ? <p className={styles.cardDetail}>{detail}</p> : null}
        </div>
      </div>

      {/* Декоративное изображение внизу */}
      {imageSrc && (
        <div
          className={styles.imageContainer}
          style={{ bottom: `${bottomOffset}px` } as React.CSSProperties}
        >
          <Image
            src={imageSrc}
            alt=""
            width={0}
            height={0}
            sizes="100vw"
            className={styles.cardImage}
          />
        </div>
      )}
    </article>
  );
}
