import { useCallback, useState } from "react";
import type { BeforeAfterItem } from "../../../tenants";
import styles from "./BeforeAfterCard.module.css";

export type BeforeAfterCardView = "before" | "after";

export type BeforeAfterCardProps = {
  item: BeforeAfterItem;
  initialView?: BeforeAfterCardView;
  onViewChange?: (view: BeforeAfterCardView) => void;
};

export function BeforeAfterCard({
  item,
  initialView = "before",
  onViewChange,
}: BeforeAfterCardProps) {
  const [view, setView] = useState<BeforeAfterCardView>(initialView);

  const toggle = useCallback(() => {
    setView((prev) => {
      const next: BeforeAfterCardView = prev === "before" ? "after" : "before";
      onViewChange?.(next);
      return next;
    });
  }, [onViewChange]);

  const image = view === "before" ? item.beforeImage : item.afterImage;
  const accessibleLabel =
    view === "before"
      ? `Show after view for ${item.title}`
      : `Show before view for ${item.title}`;

  return (
    <article className={styles.card} data-testid="before-after-card">
      <header className={styles.header}>
        <span className={styles.category}>{item.category}</span>
        <h3 className={styles.title}>{item.title}</h3>
        <p className={styles.description}>{item.description}</p>
      </header>
      <button
        type="button"
        className={styles.toggle}
        onClick={toggle}
        aria-pressed={view === "after"}
        aria-label={accessibleLabel}
      >
        <figure className={styles.figure}>
          <img
            src={image.src}
            alt={image.alt}
            width={image.width}
            height={image.height}
            className={styles.image}
          />
          <figcaption className={styles.caption}>
            {view === "before" ? "Before" : "After"} — tap to toggle
          </figcaption>
        </figure>
      </button>
    </article>
  );
}
