import { EActionsTypes, AuthActions } from './actions';
import { authInitialState, TAuthInitialState } from './state';

export const authReducer = (state = authInitialState, action: AuthActions): TAuthInitialState => {
  switch (action.type) {
    case EActionsTypes.SET_AUTH_USER:
      return {
        ...state,
        user: action.payload,
      };
    case EActionsTypes.LOADING_AUTH_USER:
      return {
        ...state,
        loading: action.payload,
      };
    default: {
      return state;
    }
  }
};
