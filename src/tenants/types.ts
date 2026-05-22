export type TenantId = string;

export type ImageRef = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
};

export type BeforeAfterItem = {
  title: string;
  description: string;
  category: string;
  beforeImage: ImageRef;
  afterImage: ImageRef;
};

export type Tenant = {
  id: TenantId;
  beforeAfterItems: BeforeAfterItem[];
};
