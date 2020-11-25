import { IUser } from '../auth/interfases';
import { ICategory } from '../categories/interfases';

export interface IProduct {
  id: number;
  category_id: number;
  user_id: number;
  user?: IUser;
  category?: ICategory;
  name: string;
  image: string | null;
  price: number;
  description_full: string | null;
  description_small: string | null;
  created_at: Date;
}
