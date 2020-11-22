import { IProduct } from '../products/interfases';

export interface ICartItem {
  product: IProduct;
  quantity: number;
}
