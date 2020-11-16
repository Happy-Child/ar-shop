import { IProduct, IProductList } from '../../../lib/store/products/interfases';
import { IMetaPagination } from '../../../interfases/metaPagination';

export type TResponseListProducts = {
  status: number;
  data: {
    products: {
      meta: IMetaPagination;
      data: Array<IProductList> | [];
    };
    prices: { min: number; max: number };
  };
};

export type TResponseShowProduct = {
  status: number;
  data: IProduct;
};
