import { describe, expect, it } from "vitest";
import { tokens } from "./index";
import type { SpacingKey, RadiusKey, SurfaceKey, TypographyKey } from "./index";

const SPACING_KEYS: readonly SpacingKey[] = [
  "none",
  "xs",
  "sm",
  "md",
  "lg",
  "xl",
];

const RADIUS_KEYS: readonly RadiusKey[] = ["none", "sm", "md", "lg", "full"];

const SURFACE_KEYS: readonly SurfaceKey[] = [
  "default",
  "raised",
  "sunken",
  "text.primary",
  "text.secondary",
  "text.inverse",
  "border.default",
  "border.strong",
  "accent",
  "accent.contrast",
];

const TYPOGRAPHY_KEYS: readonly TypographyKey[] = [
  "display.size",
  "display.weight",
  "display.lineHeight",
  "display.letterSpacing",
  "heading.size",
  "heading.weight",
  "heading.lineHeight",
  "heading.letterSpacing",
  "subheading.size",
  "subheading.weight",
  "subheading.lineHeight",
  "subheading.letterSpacing",
  "body.size",
  "body.weight",
  "body.lineHeight",
  "body.letterSpacing",
  "caption.size",
  "caption.weight",
  "caption.lineHeight",
  "caption.letterSpacing",
  "fontFamily.sans",
  "fontFamily.mono",
];

describe("visual tokens v1 surface", () => {
  describe("spacing.*", () => {
    it.each(SPACING_KEYS)("has key %s with non-empty string value", (key) => {
      const value = tokens.spacing[key];
      expect(typeof value).toBe("string");
      expect(value.length).toBeGreaterThan(0);
    });
    it("exposes exactly the v1 keys", () => {
      expect(Object.keys(tokens.spacing).sort()).toEqual(
        [...SPACING_KEYS].sort(),
      );
    });
  });

  describe("radius.*", () => {
    it.each(RADIUS_KEYS)("has key %s with non-empty string value", (key) => {
      const value = tokens.radius[key];
      expect(typeof value).toBe("string");
      expect(value.length).toBeGreaterThan(0);
    });
    it("exposes exactly the v1 keys", () => {
      expect(Object.keys(tokens.radius).sort()).toEqual(
        [...RADIUS_KEYS].sort(),
      );
    });
  });

  describe("typography.*", () => {
    it.each(TYPOGRAPHY_KEYS)(
      "has key %s with non-empty string value",
      (key) => {
        const value = tokens.typography[key];
        expect(typeof value).toBe("string");
        expect(value.length).toBeGreaterThan(0);
      },
    );
    it("exposes exactly the v1 keys", () => {
      expect(Object.keys(tokens.typography).sort()).toEqual(
        [...TYPOGRAPHY_KEYS].sort(),
      );
    });
  });

  describe("surface.*", () => {
    it.each(SURFACE_KEYS)("has key %s with non-empty string value", (key) => {
      const value = tokens.surface[key];
      expect(typeof value).toBe("string");
      expect(value.length).toBeGreaterThan(0);
    });
    it("exposes exactly the v1 keys", () => {
      expect(Object.keys(tokens.surface).sort()).toEqual(
        [...SURFACE_KEYS].sort(),
      );
    });
  });
});
