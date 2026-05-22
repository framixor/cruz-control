// @vitest-environment jsdom
import "@testing-library/jest-dom/vitest";
import "../../testing/cleanup";
import { describe, expect, it } from "vitest";
import { fireEvent, render, screen, within } from "@testing-library/react";
import { BeforeAfterGallery } from "./BeforeAfterGallery";
import type { BeforeAfterItem } from "../../tenants";

const makeItem = (label: string): BeforeAfterItem => ({
  title: `Item ${label}`,
  description: `Description ${label}`,
  category: `cat-${label}`,
  beforeImage: { src: "data:,", alt: `before-${label}` },
  afterImage: { src: "data:,", alt: `after-${label}` },
});

describe("BeforeAfterGallery behavior", () => {
  it("toggling one card does not affect another card (independence)", () => {
    const items = [makeItem("a"), makeItem("b")];
    render(<BeforeAfterGallery itemsOverride={items} />);

    const cards = screen.getAllByTestId("before-after-card");
    expect(cards).toHaveLength(2);

    const firstToggle = within(cards[0]).getByRole("button");
    const secondToggle = within(cards[1]).getByRole("button");

    fireEvent.click(firstToggle);

    expect(firstToggle).toHaveAttribute("aria-pressed", "true");
    expect(secondToggle).toHaveAttribute("aria-pressed", "false");
    expect(within(cards[0]).getByAltText("after-a")).toBeInTheDocument();
    expect(within(cards[1]).getByAltText("before-b")).toBeInTheDocument();
  });
});
