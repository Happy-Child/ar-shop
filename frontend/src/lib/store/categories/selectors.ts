import { AppState } from '../types';
import { ICategoryAll } from './interfases';

const categoriesState = (state: AppState) => state.categories;

export const selectorAllCategories = (state: AppState): ICategoryAll[] => categoriesState(state).allCategories;
export const selectorCategoriesLoading = (state: AppState): boolean => categoriesState(state).loading;
