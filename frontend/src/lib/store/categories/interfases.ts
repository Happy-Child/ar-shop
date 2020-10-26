export interface ICategoryAll {
  id: number;
  name: string;
  image_small: string | null;
}

export interface ICategoryList {
  id: number;
  name: string;
  image_small: string | null;
  products_count: number;
  created_at: Date;
}

export interface ICategory {
  id: number;
  name: string;
  user_id: number;
  image: string | null;
  products_count: number;
  created_at: Date;
}
