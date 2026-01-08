export type ActivityGroup = {
  id: string;
  slug: string;
  priceId: string;
  name: string;
  mobileName?: string;
  description: string;
  price: number;
  items: { id: string; item: string }[];
  order?: number;
};
