// @vitest-environment jsdom
import "@testing-library/jest-dom/vitest";
import "../../testing/cleanup";
import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { BeforeAfterGallery } from "./BeforeAfterGallery";
import { TenantProvider } from "../../app/providers";
import { emptyTenant } from "../../testing";
import type { BeforeAfterItem, Tenant } from "../../tenants";

const makeItem = (label: string): BeforeAfterItem => ({
  title: `Title ${label}`,
  description: `Description ${label}`,
  category: `cat-${label}`,
  beforeImage: { src: "data:,", alt: `before-${label}` },
  afterImage: { src: "data:,", alt: `after-${label}` },
});

describe("BeforeAfterGallery rendering — cardinality 0/1/N", () => {
  describe("0 items", () => {
    it("renders the empty state from itemsOverride=[] without crashing", () => {
      render(<BeforeAfterGallery itemsOverride={[]} />);
      expect(
        screen.getByTestId("before-after-gallery-empty"),
      ).toBeInTheDocument();
      expect(
        screen.queryByTestId("before-after-card"),
      ).not.toBeInTheDocument();
    });

    it("renders the empty state from a tenant with no items", () => {
      render(
        <TenantProvider tenant={emptyTenant}>
          <BeforeAfterGallery />
        </TenantProvider>,
      );
      expect(
        screen.getByTestId("before-after-gallery-empty"),
      ).toBeInTheDocument();
    });

    it("renders the custom emptyState when provided", () => {
      render(
        <BeforeAfterGallery
          itemsOverride={[]}
          emptyState={<p>Custom empty message</p>}
        />,
      );
      expect(screen.getByText("Custom empty message")).toBeInTheDocument();
    });
  });

  describe("1 item", () => {
    it("renders exactly one card with the item's content", () => {
      const items = [makeItem("solo")];
      render(<BeforeAfterGallery itemsOverride={items} />);
      expect(screen.getAllByTestId("before-after-card")).toHaveLength(1);
      expect(screen.getByText("Title solo")).toBeInTheDocument();
    });

    it("reads items from tenant context when no override is provided", () => {
      const tenant: Tenant = {
        id: "context-source",
        beforeAfterItems: [makeItem("ctx")],
      };
      render(
        <TenantProvider tenant={tenant}>
          <BeforeAfterGallery />
        </TenantProvider>,
      );
      expect(screen.getAllByTestId("before-after-card")).toHaveLength(1);
      expect(screen.getByText("Title ctx")).toBeInTheDocument();
    });
  });

  describe("N items", () => {
    it("renders one card per item in source order", () => {
      const items = [makeItem("a"), makeItem("b"), makeItem("c")];
      render(<BeforeAfterGallery itemsOverride={items} />);
      const cards = screen.getAllByTestId("before-after-card");
      expect(cards).toHaveLength(3);
      const renderedTitles = cards.map(
        (card) => card.querySelector("h3")?.textContent ?? "",
      );
      expect(renderedTitles).toEqual([
        "Title a",
        "Title b",
        "Title c",
      ]);
    });
  });
});
