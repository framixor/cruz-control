// @vitest-environment jsdom
import "@testing-library/jest-dom/vitest";
import "../../testing/cleanup";
import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import {
  BeforeAfterGallery,
  type BeforeAfterGalleryProps,
} from "./BeforeAfterGallery";
import { TenantProvider } from "../../app/providers";
import { emptyTenant } from "../../testing";

describe("BeforeAfterGallery public contract", () => {
  it("renders without props when wrapped in a TenantProvider", () => {
    const props: BeforeAfterGalleryProps = {};
    render(
      <TenantProvider tenant={emptyTenant}>
        <BeforeAfterGallery {...props} />
      </TenantProvider>,
    );
    expect(screen.getByTestId("before-after-gallery")).toBeInTheDocument();
  });

  it("accepts itemsOverride and emptyState as optional props (no provider needed)", () => {
    const props: BeforeAfterGalleryProps = {
      itemsOverride: [],
      emptyState: <p>Custom empty</p>,
    };
    render(<BeforeAfterGallery {...props} />);
    expect(screen.getByTestId("before-after-gallery")).toBeInTheDocument();
  });

  it("exposes a region role with the documented accessible name", () => {
    render(<BeforeAfterGallery itemsOverride={[]} />);
    const region = screen.getByRole("region", {
      name: /before and after gallery/i,
    });
    expect(region).toBeInTheDocument();
  });
});
