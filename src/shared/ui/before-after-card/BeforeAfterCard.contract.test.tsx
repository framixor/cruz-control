// @vitest-environment jsdom
import "@testing-library/jest-dom/vitest";
import "../../../testing/cleanup";
import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import {
  BeforeAfterCard,
  type BeforeAfterCardProps,
} from "./BeforeAfterCard";
import type { BeforeAfterItem } from "../../../tenants";

const sampleItem: BeforeAfterItem = {
  title: "Sample",
  description: "Sample description",
  category: "test",
  beforeImage: { src: "data:,", alt: "before-alt" },
  afterImage: { src: "data:,", alt: "after-alt" },
};

describe("BeforeAfterCard public contract", () => {
  it("accepts only `item` as a required prop and renders the testid root", () => {
    const minimal: BeforeAfterCardProps = { item: sampleItem };
    render(<BeforeAfterCard {...minimal} />);
    expect(screen.getByTestId("before-after-card")).toBeInTheDocument();
  });

  it("accepts initialView and onViewChange as optional props", () => {
    const full: BeforeAfterCardProps = {
      item: sampleItem,
      initialView: "after",
      onViewChange: () => undefined,
    };
    render(<BeforeAfterCard {...full} />);
    expect(screen.getByTestId("before-after-card")).toBeInTheDocument();
  });

  it("uses a native <button> with type=button so platform Space/Enter activates the click handler", () => {
    render(<BeforeAfterCard item={sampleItem} />);
    const toggle = screen.getByRole("button");
    expect(toggle.tagName).toBe("BUTTON");
    expect(toggle.getAttribute("type")).toBe("button");
  });

  it("exposes aria-pressed and an accessible name", () => {
    render(<BeforeAfterCard item={sampleItem} />);
    const toggle = screen.getByRole("button");
    expect(toggle).toHaveAttribute("aria-pressed");
    expect(toggle).toHaveAccessibleName();
  });
});
