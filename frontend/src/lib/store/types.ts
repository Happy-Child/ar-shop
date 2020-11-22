import { Store as ReduxStore, Dispatch as ReduxDispatch } from 'redux';
import { CartActions } from './cart/actions';
import { CategoriesActions } from './categories/actions';
import { rootReducer } from './root-reducer';

export type ReduxInitAction = { type: '@@INIT' };

export type AppState = ReturnType<typeof rootReducer>;

export type Actions = ReduxInitAction | CartActions | CategoriesActions;

export type AppStore = ReduxStore<AppState, Actions>;

export type Dispatch = ReduxDispatch<Actions>;
