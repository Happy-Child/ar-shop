import { categoriesAPI } from '../../../services/api';

enum EActionsTypes {
  GET_ALL = 'categories/GET_ALL',
  CREATE = 'categories/CREATE',
}

// during
export function actionFetchAllCategories() {
  return (dispatch: any) => {
    categoriesAPI.all().then((categories) => {
      dispatch({
        type: EActionsTypes.GET_ALL,
        payload: categories.data,
      });
    });
  };
}

export { EActionsTypes };
