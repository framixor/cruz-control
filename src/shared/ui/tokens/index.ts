export type SpacingKey = "none" | "xs" | "sm" | "md" | "lg" | "xl";

export type RadiusKey = "none" | "sm" | "md" | "lg" | "full";

export type TypographyRole =
  | "display"
  | "heading"
  | "subheading"
  | "body"
  | "caption";

export type TypographySubKey =
  | "size"
  | "weight"
  | "lineHeight"
  | "letterSpacing";

export type TypographyKey =
  | `${TypographyRole}.${TypographySubKey}`
  | "fontFamily.sans"
  | "fontFamily.mono";

export type SurfaceKey =
  | "default"
  | "raised"
  | "sunken"
  | "text.primary"
  | "text.secondary"
  | "text.inverse"
  | "border.default"
  | "border.strong"
  | "accent"
  | "accent.contrast";

export type Tokens = {
  spacing: Record<SpacingKey, string>;
  radius: Record<RadiusKey, string>;
  typography: Record<TypographyKey, string>;
  surface: Record<SurfaceKey, string>;
};

export const tokens: Tokens = {
  spacing: {
    none: "var(--spacing-none)",
    xs: "var(--spacing-xs)",
    sm: "var(--spacing-sm)",
    md: "var(--spacing-md)",
    lg: "var(--spacing-lg)",
    xl: "var(--spacing-xl)",
  },
  radius: {
    none: "var(--radius-none)",
    sm: "var(--radius-sm)",
    md: "var(--radius-md)",
    lg: "var(--radius-lg)",
    full: "var(--radius-full)",
  },
  typography: {
    "display.size": "var(--typography-display-size)",
    "display.weight": "var(--typography-display-weight)",
    "display.lineHeight": "var(--typography-display-lineHeight)",
    "display.letterSpacing": "var(--typography-display-letterSpacing)",
    "heading.size": "var(--typography-heading-size)",
    "heading.weight": "var(--typography-heading-weight)",
    "heading.lineHeight": "var(--typography-heading-lineHeight)",
    "heading.letterSpacing": "var(--typography-heading-letterSpacing)",
    "subheading.size": "var(--typography-subheading-size)",
    "subheading.weight": "var(--typography-subheading-weight)",
    "subheading.lineHeight": "var(--typography-subheading-lineHeight)",
    "subheading.letterSpacing": "var(--typography-subheading-letterSpacing)",
    "body.size": "var(--typography-body-size)",
    "body.weight": "var(--typography-body-weight)",
    "body.lineHeight": "var(--typography-body-lineHeight)",
    "body.letterSpacing": "var(--typography-body-letterSpacing)",
    "caption.size": "var(--typography-caption-size)",
    "caption.weight": "var(--typography-caption-weight)",
    "caption.lineHeight": "var(--typography-caption-lineHeight)",
    "caption.letterSpacing": "var(--typography-caption-letterSpacing)",
    "fontFamily.sans": "var(--typography-fontFamily-sans)",
    "fontFamily.mono": "var(--typography-fontFamily-mono)",
  },
  surface: {
    default: "var(--surface-default)",
    raised: "var(--surface-raised)",
    sunken: "var(--surface-sunken)",
    "text.primary": "var(--surface-text-primary)",
    "text.secondary": "var(--surface-text-secondary)",
    "text.inverse": "var(--surface-text-inverse)",
    "border.default": "var(--surface-border-default)",
    "border.strong": "var(--surface-border-strong)",
    accent: "var(--surface-accent)",
    "accent.contrast": "var(--surface-accent-contrast)",
  },
};
