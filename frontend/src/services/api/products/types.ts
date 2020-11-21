import { IProduct } from '../../../lib/store/products/interfases';
import { IMetaPagination } from '../../../interfases/metaPagination';

export type TResponseListProducts = {
  status: number;
  data: {
    products: {
      meta: IMetaPagination;
      data: Array<IProduct> | [];
    };
    prices: { min: number; max: number };
  };
};

export type TResponseShowProduct = {
  status: number;
  data: IProduct;
};
