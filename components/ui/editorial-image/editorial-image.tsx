import Image from "next/image";
import styles from "./editorial.module.css";

export interface EditorialProfileCardProps {
  name: string;
  nickname?: string;
  role: string;
  image: string;
  priority?: boolean;
  className?: string;
}

/**
 * Editorial magazine-style portrait card.
 * The photograph IS the card — no card body, no border, no drop shadow.
 * Readability comes entirely from the four-layer gradient system in
 * EditorialProfileCard.module.css, tuned to hold AA contrast for the
 * caption regardless of how bright the source photograph is.
 *
 * Renders an <h3> for the name by default — if this card is used
 * somewhere the surrounding heading hierarchy needs a different level,
 * wrap or fork accordingly; there's no headingLevel prop by design,
 * to keep this a pure presentational component.
 */
export function EditorialProfileCard({
  name,
  nickname,
  role,
  image,
  priority = false,
  className = "",
}: EditorialProfileCardProps) {
  return (
    <article
      className={`${styles.card} ${className}`.trim()}
      tabIndex={0}
    >
      <div className={styles.imageWrap}>
        <Image
          src={image}
          alt={name}
          fill
          priority={priority}
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 40vw, 90vw"
          className={styles.image}
        />
      </div>

      {/* Layer 1 — brand tint */}
      <div className={styles.tint} aria-hidden="true" />
      {/* Layer 2 — radial spotlight behind the caption */}
      <div className={styles.spotlight} aria-hidden="true" />
      {/* Layer 3 — bottom readability gradient */}
      <div className={styles.bottomFade} aria-hidden="true" />
      {/* Layer 4 — edge vignette */}
      <div className={styles.vignette} aria-hidden="true" />

      <div className={styles.caption}>
        <h3 className={styles.name}>{name}</h3>
        {nickname ? <p className={styles.nickname}>{nickname}</p> : null}
        <p className={styles.role}>{role}</p>
      </div>
    </article>
  );
}