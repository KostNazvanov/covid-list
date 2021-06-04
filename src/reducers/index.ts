import {
  IAction,
  IState,
} from './interfaces';

export const initialState: IState = {
  countries: [],
  cases: [],
};

const reducer = (state = initialState, action: IAction) => {
  switch (action.type) {
    case 'GET_COUNTRIES_SUCCESS':
      return {
        ...state,
        countries: action.countries,
      }
    default:
      return state;
  }
};

export default reducer;
