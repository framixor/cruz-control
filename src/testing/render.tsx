import {
  render,
  type RenderOptions,
  type RenderResult,
} from "@testing-library/react";
import type { ReactElement, ReactNode } from "react";
import { TenantProvider } from "../app/providers";
import type { Tenant } from "../tenants";

type WrapperOptions = Omit<RenderOptions, "wrapper"> & { tenant?: Tenant };

export function renderWithProviders(
  ui: ReactElement,
  options: WrapperOptions = {},
): RenderResult {
  const { tenant, ...rest } = options;

  function Wrapper({ children }: { children: ReactNode }) {
    if (tenant) {
      return <TenantProvider tenant={tenant}>{children}</TenantProvider>;
    }
    return <>{children}</>;
  }

  return render(ui, { wrapper: Wrapper, ...rest });
}
