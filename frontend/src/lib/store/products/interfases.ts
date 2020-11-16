export interface IProductList {
  id: number;
  name: string;
  image: string | null;
  price: number;
  description_small: string | null;
  created_at: Date;
}

export interface IProduct {
  id: number;
  category_id: number;
  user_id: number;
  name: string;
  image: string | null;
  price: number;
  description_full: string | null;
  description_small: string | null;
  created_at: Date;
}
