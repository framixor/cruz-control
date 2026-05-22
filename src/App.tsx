import { TenantProvider } from "./app/providers";
import { BeforeAfterGallery } from "./features/before-after-gallery";
import { cruzControlTenant } from "./tenants";

function App() {
  return (
    <TenantProvider tenant={cruzControlTenant}>
      <BeforeAfterGallery />
    </TenantProvider>
  );
}

export default App;
