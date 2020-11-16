import axiosInstance from '../../../plugins/axios';
import { TResponseAllCategories, TResponseListCategories, TResponseShowCategory } from './types';

export interface IListParams {
  search?: string | null;
  sort_by?: string | null;
  sort_desc?: boolean | null;
  page?: number | null;
  limit?: number | null;
}

export interface IShowParams {
  id: number;
}

const api = {
  all() {
    return axiosInstance.get<TResponseAllCategories>('/categories/all').then((response) => response.data);
  },
  list(params?: IListParams) {
    return axiosInstance
      .get<TResponseListCategories>('/categories', {
        params,
      })
      .then((response) => response.data);
  },
  show(params: IShowParams) {
    return axiosInstance.get<TResponseShowCategory>(`/categories/${params.id}`).then((response) => response.data);
  },
};

export { api as categories };
