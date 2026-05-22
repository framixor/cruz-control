// @vitest-environment jsdom
import "@testing-library/jest-dom/vitest";
import "../../../testing/cleanup";
import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { BeforeAfterCard } from "./BeforeAfterCard";
import type { BeforeAfterItem } from "../../../tenants";

const item: BeforeAfterItem = {
  title: "Test Project",
  description: "Test description",
  category: "test",
  beforeImage: { src: "data:,", alt: "before-alt" },
  afterImage: { src: "data:,", alt: "after-alt" },
};

describe("BeforeAfterCard behavior", () => {
  it("renders the before image by default with aria-pressed=false", () => {
    render(<BeforeAfterCard item={item} />);
    expect(screen.getByAltText("before-alt")).toBeInTheDocument();
    expect(screen.queryByAltText("after-alt")).not.toBeInTheDocument();
    expect(screen.getByRole("button")).toHaveAttribute("aria-pressed", "false");
  });

  it("toggles to the after image on click and flips aria-pressed", () => {
    render(<BeforeAfterCard item={item} />);
    const toggle = screen.getByRole("button");
    fireEvent.click(toggle);
    expect(screen.getByAltText("after-alt")).toBeInTheDocument();
    expect(screen.queryByAltText("before-alt")).not.toBeInTheDocument();
    expect(toggle).toHaveAttribute("aria-pressed", "true");
  });

  it("toggles back on a second click", () => {
    render(<BeforeAfterCard item={item} />);
    const toggle = screen.getByRole("button");
    fireEvent.click(toggle);
    fireEvent.click(toggle);
    expect(screen.getByAltText("before-alt")).toBeInTheDocument();
    expect(toggle).toHaveAttribute("aria-pressed", "false");
  });

  it("respects initialView=after", () => {
    render(<BeforeAfterCard item={item} initialView="after" />);
    expect(screen.getByAltText("after-alt")).toBeInTheDocument();
    expect(screen.getByRole("button")).toHaveAttribute("aria-pressed", "true");
  });

  it("calls onViewChange with the new view on each toggle", () => {
    const onViewChange = vi.fn();
    render(<BeforeAfterCard item={item} onViewChange={onViewChange} />);
    const toggle = screen.getByRole("button");
    fireEvent.click(toggle);
    expect(onViewChange).toHaveBeenLastCalledWith("after");
    fireEvent.click(toggle);
    expect(onViewChange).toHaveBeenLastCalledWith("before");
    expect(onViewChange).toHaveBeenCalledTimes(2);
  });

  it("updates the visible accessible label as the view flips", () => {
    render(<BeforeAfterCard item={item} />);
    const toggle = screen.getByRole("button");
    expect(toggle).toHaveAccessibleName(/show after view/i);
    fireEvent.click(toggle);
    expect(toggle).toHaveAccessibleName(/show before view/i);
  });
});
