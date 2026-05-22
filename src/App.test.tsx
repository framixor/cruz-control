// @vitest-environment jsdom
import "@testing-library/jest-dom/vitest";
import "./testing/cleanup";
import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import App from "./App";

describe("App shell", () => {
  it("mounts BeforeAfterGallery within a TenantProvider", () => {
    render(<App />);
    expect(screen.getByTestId("before-after-gallery")).toBeInTheDocument();
  });

  it("renders the cruz-control tenant items (>=1 card)", () => {
    render(<App />);
    expect(
      screen.getAllByTestId("before-after-card").length,
    ).toBeGreaterThanOrEqual(1);
  });
});
