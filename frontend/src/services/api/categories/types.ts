import { ICategoryAll, ICategoryList, ICategory } from '../../../lib/store/categories/interfases';
import { IMetaPagination } from '../../../interfases/metaPagination';

export type TResponseAllCategories = {
  status: number;
  data: Array<ICategoryAll>;
};

export type TResponseListCategories = {
  status: number;
  data: {
    meta: IMetaPagination;
    data: Array<ICategoryList> | [];
  };
};

export type TResponseShowCategory = {
  status: number;
  data: ICategory;
};
