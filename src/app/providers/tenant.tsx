import { createContext, useContext, type ReactNode } from "react";
import type { Tenant } from "../../tenants";

const TenantContext = createContext<Tenant | null>(null);

export type TenantProviderProps = {
  tenant: Tenant;
  children: ReactNode;
};

export function TenantProvider({ tenant, children }: TenantProviderProps) {
  return (
    <TenantContext.Provider value={tenant}>{children}</TenantContext.Provider>
  );
}

/**
 * Returns the active tenant. Throws if used outside a <TenantProvider>.
 * Use this when the caller cannot operate without a tenant.
 */
// eslint-disable-next-line react-refresh/only-export-components
export function useTenant(): Tenant {
  const tenant = useContext(TenantContext);
  if (tenant === null) {
    throw new Error(
      "useTenant() must be used inside a <TenantProvider>. " +
        "Wrap your component tree with <TenantProvider tenant={...}>.",
    );
  }
  return tenant;
}

/**
 * Returns the active tenant or null. Use when the caller has a fallback path
 * (e.g., test override) and must not crash outside a provider.
 */
// eslint-disable-next-line react-refresh/only-export-components
export function useOptionalTenant(): Tenant | null {
  return useContext(TenantContext);
}
