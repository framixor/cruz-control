import { describe, expect, it } from "vitest";
import type { Tenant } from "./types";
import { cruzControlTenant } from "./cruz-control";
import { emptyTenant, singleTenant } from "../testing/fixtures";

const FIXTURES: { name: string; tenant: Tenant }[] = [
  { name: "cruz-control", tenant: cruzControlTenant },
  { name: "empty", tenant: emptyTenant },
  { name: "single", tenant: singleTenant },
];

const KEBAB_CASE = /^[a-z][a-z0-9]*(-[a-z0-9]+)*$/;

describe("tenant fixtures conform to v1 contract", () => {
  it.each(FIXTURES)("$name has non-empty kebab-case id", ({ tenant }) => {
    expect(tenant.id.length).toBeGreaterThan(0);
    expect(tenant.id).toMatch(KEBAB_CASE);
  });

  it.each(FIXTURES)("$name beforeAfterItems is an array", ({ tenant }) => {
    expect(Array.isArray(tenant.beforeAfterItems)).toBe(true);
  });

  it.each(FIXTURES)(
    "$name items satisfy the BeforeAfterItem field rules",
    ({ tenant }) => {
      for (const item of tenant.beforeAfterItems) {
        expect(typeof item.title).toBe("string");
        expect(item.title.length).toBeGreaterThan(0);

        expect(typeof item.description).toBe("string");
        expect(item.description.length).toBeGreaterThan(0);

        expect(typeof item.category).toBe("string");
        expect(item.category.length).toBeGreaterThan(0);

        expect(item.beforeImage).toBeTruthy();
        expect(typeof item.beforeImage.src).toBe("string");
        expect(item.beforeImage.src.length).toBeGreaterThan(0);
        expect(typeof item.beforeImage.alt).toBe("string");
        expect(item.beforeImage.alt.length).toBeGreaterThan(0);

        expect(item.afterImage).toBeTruthy();
        expect(typeof item.afterImage.src).toBe("string");
        expect(item.afterImage.src.length).toBeGreaterThan(0);
        expect(typeof item.afterImage.alt).toBe("string");
        expect(item.afterImage.alt.length).toBeGreaterThan(0);
      }
    },
  );

  it("cruz-control covers >=2 distinct categories", () => {
    const categories = new Set(
      cruzControlTenant.beforeAfterItems.map((item) => item.category),
    );
    expect(categories.size).toBeGreaterThanOrEqual(2);
  });
});
