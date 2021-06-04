import { all } from 'redux-saga/effects';

import actions from '../reducers/actions';

import countries from './countries';

export default function* watchAll() {
  try {
    yield all([
      countries(),
    ]);
  } catch(error) {
    console.error(error);
    actions.setError({ error });
  }
}
