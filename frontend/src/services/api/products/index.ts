import axiosInstance from '../../../plugins/axios';
import { TResponseListProducts, TResponseShowProduct } from './types';

export interface IListProductsParams {
  search?: string | null;
  category_id?: number | null;
  price_min?: number | null;
  price_max?: number | null;
  sort_by?: string | null;
  sort_desc?: boolean | null;
  page?: number | null;
  limit?: number | null;
}

export interface IShowProductParams {
  id: number;
}

const api = {
  list(params?: IListProductsParams) {
    return axiosInstance
      .get<TResponseListProducts>('/products', {
        params,
      })
      .then((response) => response.data)
      .catch((e) => e.response.data);
  },
  show(params: IShowProductParams) {
    return axiosInstance
      .get<TResponseShowProduct>(`/products/${params.id}`)
      .then((response) => response.data)
      .catch((e) => e.response.data);
  },
};

export { api as products };
