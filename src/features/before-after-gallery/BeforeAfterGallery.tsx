import type { ReactNode } from "react";
import { BeforeAfterCard } from "../../shared/ui";
import { useOptionalTenant } from "../../app/providers";
import type { BeforeAfterItem } from "../../tenants";
import styles from "./BeforeAfterGallery.module.css";

export type BeforeAfterGalleryProps = {
  itemsOverride?: BeforeAfterItem[];
  emptyState?: ReactNode;
};

export function BeforeAfterGallery({
  itemsOverride,
  emptyState,
}: BeforeAfterGalleryProps) {
  const tenant = useOptionalTenant();

  if (itemsOverride === undefined && tenant === null) {
    throw new Error(
      "<BeforeAfterGallery /> requires either an itemsOverride prop or a " +
        "<TenantProvider> ancestor.",
    );
  }

  const items = itemsOverride ?? tenant!.beforeAfterItems;

  return (
    <section
      className={styles.gallery}
      data-testid="before-after-gallery"
      aria-label="Before and after gallery"
    >
      {items.length === 0 ? (
        <div
          role="status"
          data-testid="before-after-gallery-empty"
          className={styles.empty}
        >
          {emptyState ?? <p>No items to display.</p>}
        </div>
      ) : (
        <ul className={styles.list}>
          {items.map((item, index) => (
            <li key={`${item.category}-${item.title}-${index}`}>
              <BeforeAfterCard item={item} />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
