import store from '../helpers/store';
import { camelize } from '../helpers/utils';

const dispatch = store.dispatch;

// TODO Make this interface as generic. So we can't enter ANY data
export interface IPayload {
  [key: string]: any;
}

interface IActions {
  [key: string]: (payload: IPayload) => void;
}

// TODO Creating actions dynamically doesn't let IDE show us hints. Fix it
const createAction =
  (type: string) =>
    (payload?: IPayload) =>
      dispatch({ type, ...payload });

const createAsyncAction = (type: string) => {
  const typeName = camelize(type);

  return {
    [typeName]: createAction(type),
    [`${typeName}Success`]: createAction(`${type}_SUCCESS`),
    // TODO errors are not handled by anything
    [`${typeName}Fail`]: createAction(`${type}_FAIL`),
  }
};

const actions: IActions = {
  ...createAsyncAction('GET_COUNTRIES'),
  ...createAsyncAction('GET_CASES_BY_COUNTRY'),
};

export default actions;
