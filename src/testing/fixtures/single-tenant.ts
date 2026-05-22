import type { Tenant } from "../../tenants";

const onePixel =
  "data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==";

export const singleTenant: Tenant = {
  id: "single",
  beforeAfterItems: [
    {
      title: "Single Item",
      description: "The only item in the single-tenant test fixture.",
      category: "test",
      beforeImage: { src: onePixel, alt: "single fixture before placeholder" },
      afterImage: { src: onePixel, alt: "single fixture after placeholder" },
    },
  ],
};
