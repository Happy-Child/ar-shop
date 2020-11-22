import { ICategoryAll } from './interfases';

export type TCategoriesInitialState = {
  allCategories: Array<ICategoryAll>;
  loading: boolean;
};

export const categoriesInitialState: TCategoriesInitialState = {
  allCategories: [],
  loading: false,
};
